import nodeHttp from '@/lib/nodeHttp';
import { create } from 'zustand';
import { useAuthStore } from './authStore';

export interface Organization {
  _id: string;
  name: string;
  description: string;
  logoUrl?: string;
  isSubscribed: boolean;
}

interface OrganizationState {
  organizations: Organization[];
  isLoading: boolean;
  error: string | null;
  fetchOrganizations: () => Promise<void>;
  subscribeToOrg: (orgId: string) => Promise<void>;
  unsubscribeFromOrg: (orgId: string) => Promise<void>;
  createOrganization: (name: string, description: string) => Promise<void>;
}

export const useOrganizationStore = create<OrganizationState>((set, get) => ({
  organizations: [],
  isLoading: false,
  error: null,

  fetchOrganizations: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, replace with actual API call
      const response = await nodeHttp.get('/api/v1/organizations');
      const data = response.data;
      if (!data.success) throw new Error(data.message || 'Failed to fetch organizations');
      const { organizations } = data
      
      set({ organizations, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch organizations', 
        isLoading: false 
      });
      throw error
    }
  },

  subscribeToOrg: async (orgId) => {
    try {
      // In a real app, replace with actual API call
      const userId = useAuthStore.getState().user?._id;
      await  nodeHttp.post(`/api/v1/memberships/${orgId}`);
      
      set(state => ({
        organizations: state.organizations.map(org => 
          org._id === orgId ? { ...org, isSubscribed: true } : org
        )
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to subscribe' });
      throw error
    }
  },

  unsubscribeFromOrg: async (orgId) => {
    try {
      // In a real app, replace with actual API call
      await nodeHttp.delete(`/api/v1/memberships/${orgId}`);
    
      set(state => ({
        organizations: state.organizations.map(org => 
          org._id === orgId ? { ...org, isSubscribed: false } : org
        )
      }));
    } catch (error) {
      console.info(error)
      set({ error: error.message || 'Failed to unsubscribe' });
      throw error
    }
  },

  createOrganization: async (name: string, description: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await nodeHttp.post('/api/v1/organizations', {
        name,
        description
      });
      const data = response.data;
      if (!data.success) throw new Error(data.message || 'Failed to create organization');
      
      // Add the new organization to the list
      set(state => ({
        organizations: [...state.organizations, data.organization],
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create organization', 
        isLoading: false 
      });
      throw error;
    }
  }
}));
