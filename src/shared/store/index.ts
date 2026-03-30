import { create } from 'zustand'

interface AppState {
  isMenuOpen: boolean
  isDarkMode: boolean
  toggleMenu: () => void
  toggleDarkMode: () => void
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  isDarkMode: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}))
