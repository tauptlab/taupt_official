import { lightTheme, darkTheme } from './styles/theme.css'
import { HomePage } from '@pages/home'
import { useAppStore } from '@shared/store'

export function App() {
  const isDarkMode = useAppStore((s) => s.isDarkMode)
  return (
    <div className={isDarkMode ? darkTheme : lightTheme}>
      <HomePage />
    </div>
  )
}
