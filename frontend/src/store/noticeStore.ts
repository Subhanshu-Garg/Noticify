
import { create } from 'zustand';
import { useAuthStore } from './authStore';
import { useOrganizationStore } from './organizationStore';
import nodeHttp from '@/lib/nodeHttp';
import CONFIG from '@/configs/config';

export interface Notice {
  _id: string;
  title: string;
  content: string;
  orgId: string;
  orgName: string;
  createdAt: string;
  isRead: boolean;
  priority?: 'low' | 'medium' | 'high';
  attachments?: {
    id: string;
    name: string;
    url: string;
  }[];
  tags?: string[];
}

interface NoticeState {
  notices: Notice[];
  currentNoticeId: string | null;
  currentNotice: Notice | null;
  isLoadingNotices: boolean;
  isLoadingCurrentNotice: boolean;
  unreadCount: number;
  error: string | null;
  fetchNotices: () => Promise<void>;
  selectNotice: (id: string) => void;
  clearCurrentNotice: () => void;
  getNotice: (id: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  addNotice: (notice: Notice) => void;
  initWebSocket: () => void;
  disconnectWebSocket: () => void;
}

export const useNoticeStore = create<NoticeState>((set, get) => {
  let socket: WebSocket | null = null;
  let reconnectInterval

  return {
    notices: [],
    currentNoticeId: null,
    currentNotice: null,
    isLoadingNotices: false,
    isLoadingCurrentNotice: false,
    unreadCount: 0,
    error: null,

    fetchNotices: async () => {
      set({ isLoadingNotices: true, error: null });
      try {
        // In a real app, replace with actual API call
        const response = await nodeHttp.get('/api/v1/notices');
        const { data: { notices = [] } = {} } = response
        
        const unreadCount = notices.filter((notice: Notice) => !notice.isRead).length;
        
        set({ 
          notices, 
          isLoadingNotices: false,
          unreadCount 
        });
      } catch (error) {
        set({ 
          notices: [],
          unreadCount: 0,
          error: error instanceof Error ? error.message : 'Failed to fetch notices', 
          isLoadingNotices: false 
        });
      }
    },

    selectNotice: (id) => {
      set({ currentNoticeId: id });
    },

    clearCurrentNotice: () => {
      set({ currentNoticeId: null, currentNotice: null });
    },

    getNotice: async (id) => {
      set({ isLoadingCurrentNotice: true, error: null });
      try {
        const response = await nodeHttp.get(`/api/v1/notices/${id}`)
        const { data: { notice = {} } = {} } = response
        
        if (!notice) {
          throw new Error('Notice not found');
        }
        
        set({ currentNotice: notice, isLoadingCurrentNotice: false });
      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : 'Failed to fetch notice', 
          isLoadingCurrentNotice: false 
        });
      }
    },

    markAsRead: async (id) => {
      try {
        const response = await nodeHttp.patch(`/api/v1/notices/${id}`, {
          isRead: true
        });

        const { data: { success } } = response
        // if (!success) throw Error('Unable to mark as read')
        
        set(state => {
          const notices = state.notices.map(notice => 
            notice._id === id ? { ...notice, isRead: true } : notice
          );
          
          const currentNotice = state.currentNotice && state.currentNotice._id === id 
            ? { ...state.currentNotice, isRead: true } 
            : state.currentNotice;
          
          const unreadCount = notices.filter(notice => !notice.isRead).length;
          
          return { notices, currentNotice, unreadCount };
        });
      } catch (error) {
        set({ error: error instanceof Error ? error.message : 'Failed to mark as read' });
        throw error
      }
    },

    addNotice: (notice) => {
      set(state => {
        console.log('Add notice', notice)
        const notices = [notice, ...state.notices];
        const unreadCount = notices.filter(notice => !notice.isRead).length;
        
        return { notices, unreadCount };
      });
    },

    initWebSocket: () => {
      if (socket) {
        socket.close();
      }
      // In a real app, replace with actual WebSocket URL
      socket = new WebSocket(`${CONFIG.WEB_SOCKET}`);

      socket.onopen = () => {
        console.info('Socket is open!')
        clearInterval(reconnectInterval)
      }

      socket.onclose = () => {
        console.info('Socket is closed!')
        reconnectInterval = setInterval(() => {
          if (!socket || socket.readyState === WebSocket.CLOSED) {
            get().initWebSocket()
          }
        }, 3000)
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        const newNotice: Notice = data.notice
        get().addNotice(newNotice)
      }

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        set({ error: 'WebSocket connection error' });
      };
    },

    disconnectWebSocket: () => {
      if (socket) {
        socket.close();
        socket = null;
      }
    }
  };
});
