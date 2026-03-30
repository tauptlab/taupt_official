import { globalStyle } from '@vanilla-extract/css'

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
})

globalStyle(':root', {
  fontFamily: 'system-ui, sans-serif',
  lineHeight: '1.5',
  fontSynthesis: 'none',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
})

globalStyle('body', {
  minHeight: '100vh',
})
