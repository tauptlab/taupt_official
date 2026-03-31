import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from '@shared/lib/gsap'
import { getAllPosts, getAllCategories, type PostMeta } from '@shared/lib/posts'
import { Header } from '@widgets/header'
import * as styles from './BlogPage.css'
import { Footer } from '@widgets/footer'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function BlogPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const allPosts = getAllPosts()
  const categories = ['All', ...getAllCategories()]

  const filtered = activeCategory === 'All'
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory)

  const featured = filtered[0]
  const rest = filtered.slice(1)

  useEffect(() => {
    if (!gridRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(Array.from(gridRef.current!.children), {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'all',
      })
    }, gridRef)
    return () => ctx.revert()
  }, [activeCategory])

  const goPost = (slug: string) => navigate(`/blog/${slug}`)

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.hero} ref={heroRef}>
        <p className={styles.heroLabel}>Blog</p>
        <h1 className={styles.heroTitle}>Insights &<br />Stories</h1>
        <p className={styles.heroDesc}>
          TaupT 팀이 디자인, 개발, 그리고 디지털 경험에 대해 이야기합니다.
        </p>
      </div>

      <div className={styles.body}>
        {/* Category filter */}
        <div className={styles.filterBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn}${activeCategory === cat ? ` ${styles.filterBtnActive}` : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>해당 카테고리에 포스트가 없습니다.</div>
        )}

        {/* Featured post */}
        {featured && (
          <div className={styles.featured} onClick={() => goPost(featured.slug)}>
            <div className={styles.featuredImgWrap}>
              <img src={featured.thumbnail} alt={featured.title} className={styles.featuredImg} />
            </div>
            <div className={styles.featuredBody}>
              <span className={styles.featuredCategory}>{featured.category}</span>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <p className={styles.featuredDesc}>{featured.description}</p>
              <div className={styles.featuredMeta}>
                <span>{featured.author}</span>
                <span className={styles.metaDot} />
                <span>{formatDate(featured.date)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className={styles.grid} ref={gridRef}>
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} onClick={() => goPost(post.slug)} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

function PostCard({ post, onClick }: { post: PostMeta; onClick: () => void }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardImgWrap}>
        <img src={post.thumbnail} alt={post.title} className={styles.cardImg} />
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>{post.category}</span>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.cardDesc}>{post.description}</p>
        <div className={styles.cardMeta}>
          <span>{post.author}</span>
          <span className={styles.metaDot} />
          <span>{formatDate(post.date)}</span>
        </div>
      </div>
    </div>
  )
}
