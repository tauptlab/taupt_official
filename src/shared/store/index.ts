import { create } from 'zustand'
import type { Lang } from '@shared/lib/i18n'

interface AppState {
  isMenuOpen: boolean
  isDarkMode: boolean
  lang: Lang
  toggleMenu: () => void
  toggleDarkMode: () => void
  toggleLang: () => void
}

export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  isDarkMode: false,
  lang: 'ko',
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleLang: () => set((state) => ({ lang: state.lang === 'ko' ? 'en' : 'ko' })),
}))
