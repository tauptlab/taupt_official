import { lightTheme } from './styles/theme.css'
import { HomePage } from '@pages/home'

export function App() {
  return (
    <div className={lightTheme}>
      <HomePage />
    </div>
  )
}
