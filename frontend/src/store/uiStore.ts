
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  isNoticeModalOpen: boolean;
  toast: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible: boolean;
  };
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleNoticeModal: (isOpen?: boolean) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'system',
      isNoticeModalOpen: false,
      toast: {
        message: '',
        type: 'info',
        isVisible: false,
      },
      
      setTheme: (theme) => set({ theme }),
      
      toggleNoticeModal: (isOpen) => set(state => ({ 
        isNoticeModalOpen: isOpen !== undefined ? isOpen : !state.isNoticeModalOpen 
      })),
      
      showToast: (message, type) => set({ 
        toast: { message, type, isVisible: true } 
      }),
      
      hideToast: () => set(state => ({ 
        toast: { ...state.toast, isVisible: false } 
      }))
    }),
    {
      name: 'noticify-ui'
    }
  )
);
