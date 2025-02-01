import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  checkAuth: async () => {
    try {
      const response = await fetch('/isloggedin', { credentials: 'include' });
      const data = await response.json();
      set({ isAuthenticated: data.isAuthenticated });
    } catch (error) {
      console.error('Error checking authentication:', error);
      set({ isAuthenticated: false });
    }
  }
}));


