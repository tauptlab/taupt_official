import { style } from '@vanilla-extract/css'
import { themeContract } from '@app/styles/theme.css'

export const header = style({
  display: 'flex',
  alignItems: 'center',
  padding: `${themeContract.space.md} ${themeContract.space.lg}`,
  borderBottom: `1px solid ${themeContract.color.foreground}`,
})

export const logo = style({
  fontWeight: 700,
  fontSize: '1.25rem',
  color: themeContract.color.primary,
})
