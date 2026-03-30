import { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@shared/lib/gsap'
import * as styles from './Hero.css'

const words = ['Design.', 'Build.', 'Create.', 'Innovate.']

function useTypingEffect(wordList: string[], speed = 65) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!started) return
    const word = wordList[wordIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && display.length < word.length) {
      timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), speed)
    } else if (!deleting && display.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(display.slice(0, -1)), speed / 2)
    } else {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % wordList.length)
    }

    return () => clearTimeout(timeout)
  }, [display, deleting, wordIdx, wordList, speed, started])

  return display
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const typedText = useTypingEffect(words)

  useEffect(() => {
    const sticky = stickyRef.current
    const imgWrap = imgWrapRef.current
    if (!sticky || !imgWrap) return

    const ctx = gsap.context(() => {
      // ── 1. 입장 애니메이션 ──
      // kacelab: setTimeout(() => $(".ms1").addClass("animate"), 500)
      const tl = gsap.timeline({ delay: 0.5 })
      tl.to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        })
        .to(headlineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.4')
        .to(metaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.3')

      // 초기 opacity 설정 (GSAP from 값)
      gsap.set(labelRef.current, { opacity: 0, y: 20 })
      gsap.set(headlineRef.current, { opacity: 0, y: 30 })
      gsap.set(metaRef.current, { opacity: 0, y: 20 })

      // ── 2. 스크롤 확장 애니메이션 ──
      // kacelab: .ms1은 300vh, pin으로 200vh 스크롤 동안 확장
      // scrub: 0.3, ease: power2.inOut
      if (window.innerWidth > 768) {
        gsap.to(imgWrap, {
          // right: 4rem 기준으로 width만 늘어나 → 왼쪽으로 확장
          width: 'calc(100% - 8rem)',
          borderRadius: '10px',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sticky,
            pin: true,
            start: 'top top',
            // kacelab .ms1 = 300vh → 핀 100vh + 스크롤 200vh
            end: `+=${window.innerHeight * 2}`,
            scrub: 0.3,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={stickyRef} className={styles.sticky}>

        {/* 오른쪽에서 왼쪽으로 확장되는 이미지 카드 */}
        <div ref={imgWrapRef} className={styles.imgWrap}>
          <img
            src="https://www.kacelab.com/img/main/ms2_member.jpg"
            alt="TaupT team"
            className={styles.bgImg}
          />
        </div>

        {/* 왼쪽 하단 텍스트 (z-index: 2, 이미지 위) */}
        <div className={styles.content}>
          <span ref={labelRef} className={styles.label}>
            Creative Technology Studio
          </span>
          <h1 ref={headlineRef} className={styles.headline}>
            We{' '}
            {typedText}
            <span className={styles.typingCursor} />
          </h1>
          <div ref={metaRef} className={styles.meta}>
            <p className={styles.metaDesc}>
              TaupT는 디지털 경험을 설계하고 구축하는<br />
              크리에이티브 테크놀로지 스튜디오입니다.
            </p>
            <div className={styles.scrollIndicator}>
              <span className={styles.scrollLine} />
              <span>Scroll</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
