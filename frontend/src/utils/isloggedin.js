import { create } from 'zustand';

export const useAuthStore = create((set) => ({
<<<<<<< HEAD
  isAuthenticated: true,
  checkAuth: async () => {
    try {
      const response = await fetch('/isloggedin', { credentials: 'include' });
      const data = await response.json();
      set({ isAuthenticated: data.isAuthenticated });
=======
  isAuthenticated: false,
  checkAuth: async () => {
    try {
      const response = await fetch('/api/isloggedin', { credentials: 'include' });
      const data = await response.json();
      set({ isAuthenticated: data.isLoggedIn });
>>>>>>> b707e38 (initial commit)
    } catch (error) {
      console.error('Error checking authentication:', error);
      set({ isAuthenticated: false });
    }
  }
}));


