import { create } from 'zustand';
import type { User } from 'firebase/auth';
import { AuthRepository } from '@infrastructure/repositories/AuthRepository';
import { toastError } from '@infrastructure/notifications/notificationAdapter';

interface AuthState {
  user: User | null;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const user = await AuthRepository.login(email, password);
      set({ user });
    } catch (error) {
      toastError(error, 'Error al iniciar sesión');
      throw error; // para que la UI también pueda decidir cómo actuar
    } finally {
      set({ loading: false });
    }
  },

  register: async (email, password) => {
    set({ loading: true });
    try {
      const user = await AuthRepository.register(email, password);
      set({ user });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await AuthRepository.logout();
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (email) => {
    await AuthRepository.resetPassword(email);
  },

  setUser: (user) => set({ user }),
}));
