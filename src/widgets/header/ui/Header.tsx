import { useState, useEffect, useRef } from 'react'
import { useAppStore } from '@shared/store'
import * as styles from './Header.css'

const navLinks = [
  { label: 'Who we are', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const { isMenuOpen, isDarkMode, toggleMenu, toggleDarkMode } = useAppStore()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [closing, setClosing] = useState(false)
  const lastY = useRef(0)

  // Scroll-based header state
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (y > lastY.current && y > 200) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu with animation
  const handleCloseMenu = () => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      toggleMenu()
    }, 330)
  }

  const handleNavClick = (href: string) => {
    if (isMenuOpen) handleCloseMenu()
    // small delay so close animation plays before scroll
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, isMenuOpen ? 360 : 0)
  }

  // 다크모드일 때만 상단에서 흰색 텍스트 (Hero 배경이 어두움)
  // 라이트모드 상단은 Hero 배경이 흰색이므로 테마 텍스트색 그대로 사용
  const atTop = !scrolled && isDarkMode

  const headerClass = [
    styles.header,
    scrolled ? styles.headerScrolled : styles.headerTop,
    hidden && !isMenuOpen ? styles.headerHidden : '',
  ].join(' ')

  return (
    <>
      <header className={headerClass}>
        <a
          href="#"
          className={`${styles.logo} ${atTop ? styles.logoWhite : ''}`}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          TaupT
        </a>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${styles.navLink} ${atTop ? styles.navLinkWhite : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            className={`${styles.darkModeBtn} ${atTop ? styles.darkModeBtnWhite : ''}`}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Hamburger / X */}
          <button
            className={styles.hamburger}
            onClick={isMenuOpen ? handleCloseMenu : toggleMenu}
            aria-label="Toggle menu"
          >
            <div className={styles.hamburgerInner}>
              <span className={[
                styles.hamburgerLine,
                styles.hamburgerLine1,
                atTop && !isMenuOpen ? styles.hamburgerLineWhite : '',
                isMenuOpen ? styles.hamburgerLine1Open : '',
              ].join(' ')} />
              <span className={[
                styles.hamburgerLine,
                styles.hamburgerLine2,
                atTop && !isMenuOpen ? styles.hamburgerLineWhite : '',
                isMenuOpen ? styles.hamburgerLine2Open : '',
              ].join(' ')} />
              <span className={[
                styles.hamburgerLine,
                styles.hamburgerLine3,
                atTop && !isMenuOpen ? styles.hamburgerLineWhite : '',
                isMenuOpen ? styles.hamburgerLine3Open : '',
              ].join(' ')} />
            </div>
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {(isMenuOpen || closing) && (
        <nav className={`${styles.mobileMenu} ${closing ? styles.mobileMenuClosing : ''}`}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link, i) => (
              <li key={link.label} style={{ animationDelay: `${i * 60}ms` }}>
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileMenuBottom}>
            <span className={styles.mobileMenuBottomText}>TaupT © {new Date().getFullYear()}</span>
            <button className={styles.mobileDarkBtn} onClick={toggleDarkMode}>
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </nav>
      )}
    </>
  )
}
