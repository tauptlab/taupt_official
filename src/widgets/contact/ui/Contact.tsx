import { useRef, useEffect } from 'react'
import { gsap } from '@shared/lib/gsap'
import * as styles from './Contact.css'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div ref={leftRef} className={styles.leftCol}>
          <div>
            <p className={styles.sectionLabel}>Contact</p>
            <h2 className={styles.sectionTitle}>함께 만들어<br />볼까요?</h2>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactItemLabel}>Email</span>
              <span className={styles.contactItemValue}>hello@taupt.com</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactItemLabel}>Phone</span>
              <span className={styles.contactItemValue}>+82 02 0000 0000</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactItemLabel}>Address</span>
              <span className={styles.contactItemValue}>서울특별시</span>
            </div>
          </div>
        </div>

        <form ref={rightRef} className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>이름</label>
              <input className={styles.input} type="text" placeholder="홍길동" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>연락처</label>
              <input className={styles.input} type="tel" placeholder="010-0000-0000" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>이메일</label>
            <input className={styles.input} type="email" placeholder="hello@example.com" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>문의 유형</label>
            <input className={styles.input} type="text" placeholder="웹 개발 / 디자인 / 기타" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>메시지</label>
            <textarea className={styles.textarea} placeholder="프로젝트에 대해 자세히 알려주세요." />
          </div>
          <button type="submit" className={styles.submitBtn}>보내기 →</button>
        </form>
      </div>
    </section>
  )
}
