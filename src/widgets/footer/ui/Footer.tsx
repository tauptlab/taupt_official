import * as styles from './Footer.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <span className={styles.footerLogo}>TaupT</span>
        <p className={styles.footerDesc}>
          Creative technology studio crafting meaningful digital experiences.
        </p>
      </div>

      <div className={styles.footerRight}>
        <div className={styles.footerLinks}>
          <a href="#about" className={styles.footerLink}>Who we are</a>
          <a href="#work" className={styles.footerLink}>Work</a>
          <a href="#contact" className={styles.footerLink}>Contact</a>
        </div>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} TaupT. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
