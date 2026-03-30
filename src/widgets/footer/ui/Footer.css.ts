import { style } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

export const footer = style({
  padding: `${themeContract.space.md} ${themeContract.space.lg}`,
  borderTop: `1px solid ${themeContract.color.foreground}`,
  textAlign: 'center',
  fontSize: '0.875rem',
})
