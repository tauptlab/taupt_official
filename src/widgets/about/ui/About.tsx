import { useRef, useEffect, useState } from 'react'
import { gsap } from '@shared/lib/gsap'
import { useAppStore } from '@shared/store'
import * as styles from './About.css'

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE = 'https://www.kacelab.com/img/main'

const KEYWORDS = [
  'Design', 'Frontend', 'UX/UI', 'Branding', 'Strategy',
  'Backend', 'Creative', 'Mobile', 'AI', 'Web3',
]

const PARTNER_LOGOS = [
  `${BASE}/ms2_part1.png`,
  `${BASE}/ms2_part2.png`,
  `${BASE}/ms2_part3.png`,
  `${BASE}/ms2_part4.png`,
]

const MEMBER_THUMBS = [
  `${BASE}/ms2_member_thum1.jpg`,
  `${BASE}/ms2_member_thum2.jpg`,
  `${BASE}/ms2_member_thum3.jpg`,
  `${BASE}/ms2_member_thum4.jpg`,
]

interface StackCardData {
  title: string
  desc: string
  bg: string
  color: string
  img: string
}

const STACK_CARDS: StackCardData[] = [
  {
    title: 'Career',
    desc: '함께 성장할 인재를 찾습니다',
    bg: '#141519',
    color: '#ffffff',
    img: `${BASE}/ms2_career.jpg`,
  },
  {
    title: 'Contact',
    desc: '프로젝트를 시작해보세요',
    bg: '#4B4C50',
    color: '#ffffff',
    img: `${BASE}/ms2_contact.jpg`,
  },
  {
    title: 'Service',
    desc: '다양한 서비스를 제공합니다',
    bg: '#BDBEC0',
    color: '#222222',
    img: `${BASE}/ms2_counseling.jpg`,
  },
  {
    title: 'About Us',
    desc: 'TaupT를 소개합니다',
    bg: 'var(--color-bgSecondary, #f5f5f3)',
    color: 'var(--color-text, #0d0d0d)',
    img: `${BASE}/ms2_KSPM.jpg`,
  },
]

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// ─── Stacked card height helper ──────────────────────────────────────────────

const getCardHeight = (idx: number, hovered: number | null): string => {
  const defaults = ['100%', '80%', '60%', '40%']
  if (hovered === null) return defaults[idx]
  const map: Record<number, string[]> = {
    0: ['100%', '8.25rem', '4.5rem', '2.25rem'],
    1: ['100%', 'calc(100% - 3.75rem)', '6rem', '2.25rem'],
    2: ['100%', 'calc(100% - 2.25rem)', 'calc(100% - 6rem)', '3.75rem'],
    3: ['100%', 'calc(100% - 2.25rem)', 'calc(100% - 4.5rem)', 'calc(100% - 8.25rem)'],
  }
  return map[hovered][idx]
}

// ─── Component ────────────────────────────────────────────────────────────────

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const { isDarkMode, toggleDarkMode } = useAppStore()
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [time, setTime] = useState('')
  const [day, setDay] = useState('')

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const hh = String(now.getHours()).padStart(2, '0')
      const mm = String(now.getMinutes()).padStart(2, '0')
      setTime(`${hh}:${mm}`)
      setDay(DAYS[now.getDay()])
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // GSAP scroll reveal
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from([leftRef.current, rightRef.current], {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      if (bottomRef.current) {
        gsap.from(Array.from(bottomRef.current.children), {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bottomRef.current,
            start: 'top 80%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Duplicate logos for seamless marquee
  const allLogos = [...PARTNER_LOGOS, ...PARTNER_LOGOS]

  return (
    <section id="about" ref={sectionRef} className={styles.section}>
      <div className={styles.layout}>

        {/* ── LEFT COLUMN ── */}
        <div className={styles.leftCol} ref={leftRef}>

          {/* left1: floating keyword tags */}
          <div className={styles.left1}>
            {KEYWORDS.map((kw, i) => (
              <span
                key={kw}
                className={styles.keyword}
                style={{
                  animationDuration: `${2.5 + (i % 4) * 0.5}s`,
                  animationDelay: `${(i * 0.3) % 2}s`,
                }}
              >
                {kw}
              </span>
            ))}
          </div>

          {/* left2: dark mode toggle card */}
          <div className={styles.left2} onClick={toggleDarkMode}>
            <div className={styles.left2BgImg} />
            <span className={styles.left2Label}>Theme</span>
            <div className={styles.left2Text}>Dark Mode / Light Mode</div>
            <div className={styles.toggleSwitch}>
              <div
                className={`${styles.toggleThumb}${isDarkMode ? ` ${styles.toggleThumbActive}` : ''}`}
              />
            </div>
          </div>

          {/* left3: member card before/after flip */}
          <div className={styles.left3}>
            {/* before state */}
            <div className={styles.left3Before}>
              <div className={styles.left3BeforeOverlay} />
              <div className={styles.left3BeforeContent}>
                <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>
                  Team
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff' }}>
                  Our Team
                </div>
              </div>
            </div>

            {/* after state */}
            <div className={styles.left3After}>
              <div className={styles.left3ThumbGrid}>
                {MEMBER_THUMBS.map((src, i) => (
                  <div
                    key={i}
                    className={styles.left3Thumb}
                    style={{ backgroundImage: `url(${src})` }}
                  />
                ))}
              </div>
              <div className={styles.left3MemberCount}>9 Members</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className={styles.rightCol} ref={rightRef}>

          {/* ms2Top */}
          <div className={styles.ms2Top}>

            {/* topLeft */}
            <div className={styles.topLeft}>

              {/* topRow: Work card + Who We Are card */}
              <div className={styles.topRow}>

                {/* Work card */}
                <div className={`${styles.linkItem} ${styles.workCard}`}>
                  <div
                    className={styles.bgImg}
                    style={{ backgroundImage: `url(${BASE}/ms2_work.jpg)` }}
                  />
                  <div className={styles.bgImgOverlay} />
                  <div className={styles.cardContent}>
                    <span className={styles.cardLabel}>Work</span>
                    <div>
                      <div className={styles.cardNumber}>50+</div>
                      <div className={styles.cardTitle}>Work</div>
                    </div>
                  </div>
                </div>

                {/* Who We Are card */}
                <div className={styles.whoCard}>
                  <img
                    src={`${BASE}/ms2_member.jpg`}
                    alt="Who We Are"
                    className={styles.whoCardImg}
                  />
                  <span className={styles.whoCardLabel}>Who We Are</span>
                </div>
              </div>

              {/* Video card */}
              <div className={styles.videoCard}>
                <img
                  src={`${BASE}/portfolio2.jpg`}
                  alt="Portfolio"
                  className={styles.videoCardImg}
                />
                <div className={styles.videoCardOverlay} />
              </div>
            </div>

            {/* topRight */}
            <div className={styles.topRight}>

              {/* Culture card */}
              <div className={`${styles.linkItem} ${styles.cultureCard}`}>
                <div
                  className={styles.bgImg}
                  style={{ backgroundImage: `url(${BASE}/ms2_ourCulture.jpg)` }}
                />
                <div className={styles.bgImgOverlay} />
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>Culture</span>
                  <div>
                    <div className={styles.cardNumber}>8+</div>
                    <div className={styles.cardTitle}>Our Culture</div>
                  </div>
                </div>
              </div>

              {/* Stacked cards */}
              <div className={styles.stackedCards}>
                {STACK_CARDS.map((card, i) => (
                  <div
                    key={card.title}
                    className={styles.stackCard}
                    style={{
                      backgroundColor: card.bg,
                      color: card.color,
                      height: getCardHeight(i, activeCard),
                      zIndex: i + 1,
                    }}
                    onMouseEnter={() => setActiveCard(i)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div
                      className={`${styles.stackCardBgImg}${activeCard === i ? ` ${styles.stackCardBgImgActive}` : ''}`}
                      style={{ backgroundImage: `url(${card.img})` }}
                    />
                    <div className={styles.stackCardContent}>
                      <div className={styles.stackCardTitle} style={{ color: card.color }}>
                        {card.title}
                      </div>
                      <div className={styles.stackCardDesc} style={{ color: card.color }}>
                        {card.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ms2Bottom */}
          <div className={styles.ms2Bottom} ref={bottomRef}>

            {/* Clock */}
            <div className={styles.bottomTime}>
              <div className={styles.clockDay}>{day}</div>
              <div className={styles.clockTime}>{time}</div>
            </div>

            {/* Partner logos marquee */}
            <div className={styles.bottomMarquee}>
              <div className={styles.marqueeTrack}>
                {allLogos.map((src, i) => (
                  <div key={i} className={styles.marqueeItemStyle}>
                    <img src={src} alt={`Partner ${(i % 4) + 1}`} className={styles.marqueeImg} />
                  </div>
                ))}
              </div>
            </div>

            {/* Dark mode toggle bottom card */}
            <div className={styles.bottomDark} onClick={toggleDarkMode}>
              <span className={styles.bottomDarkLabel}>Theme</span>
              <span className={styles.bottomDarkIcon}>{isDarkMode ? '☀️' : '🌙'}</span>
              <span className={styles.bottomDarkTitle}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
