
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import nodeHttp from '@/lib/nodeHttp';

export interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await nodeHttp.post("/api/v1/login",
            { email, password }, 
            { headers: {"Content-Type": "application/json"} }
          );
          const data = await response.data;
          if (!data.success) throw new Error(data.message || 'Login failed');
          
          set({ 
            user: data.user, 
            token: data.token,
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed', 
            isLoading: false,
            isAuthenticated: false,
            user: null
          });
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await nodeHttp.post("/api/v1/register", 
            { name, email, password }, 
            { headers: { "Content-Type": "application/json" }}
          );
          const data = response.data;
          if (!data.success) throw new Error(data.message || 'Registration failed');
          
          set({ 
            user: data.user,
            token: data.token ,
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          console.error(error);
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed', 
            isLoading: false,
            user: null,
            isAuthenticated: false
          });
        }
      },

      logout: async () => {
        await nodeHttp.get("/api/v1/logout").catch()
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
        localStorage.removeItem('noticify-auth')
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'noticify-auth'
    }
  )
);
