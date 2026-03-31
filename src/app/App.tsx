import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lightTheme, darkTheme } from './styles/theme.css'
import { HomePage } from '@pages/home'
import { BlogPage } from '@pages/blog'
import { PostPage } from '@pages/post'
import { useAppStore } from '@shared/store'

export function App() {
  const isDarkMode = useAppStore((s) => s.isDarkMode)
  return (
    <div className={isDarkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
