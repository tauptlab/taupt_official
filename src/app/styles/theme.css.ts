import { createTheme, createThemeContract } from '@vanilla-extract/css'

export const themeContract = createThemeContract({
  color: {
    background: null,
    foreground: null,
    primary: null,
    primaryForeground: null,
  },
  space: {
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
  font: {
    body: null,
  },
})

export const lightTheme = createTheme(themeContract, {
  color: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    primary: '#0070f3',
    primaryForeground: '#ffffff',
  },
  space: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '48px',
  },
  font: {
    body: 'system-ui, sans-serif',
  },
})
