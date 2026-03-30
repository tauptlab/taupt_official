import * as styles from './Footer.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Taupt. All rights reserved.</p>
    </footer>
  )
}
