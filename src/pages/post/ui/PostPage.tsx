import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { gsap } from '@shared/lib/gsap'
import { getPostBySlug, getAllPosts, type PostMeta } from '@shared/lib/posts'
import { Header } from '@widgets/header'
import * as styles from './PostPage.css'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const proseRef = useRef<HTMLDivElement>(null)

  const post = slug ? getPostBySlug(slug) : undefined
  const allPosts = getAllPosts()
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post?.category)
    .slice(0, 3)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  useEffect(() => {
    if (!proseRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(proseRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.2,
      })
    })
    return () => ctx.revert()
  }, [slug])

  if (!post) {
    return (
      <div className={styles.page}>
        <Header />
        <div style={{ paddingTop: '140px', paddingLeft: '4rem', color: 'var(--color-textMuted)' }}>
          포스트를 찾을 수 없습니다.
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.hero}>
        <button className={styles.backBtn} onClick={() => navigate('/blog')}>
          ← 블로그로 돌아가기
        </button>

        <div className={styles.heroMeta}>
          <span className={styles.categoryBadge}>{post.category}</span>
          <span className={styles.heroDate}>{formatDate(post.date)}</span>
        </div>

        <h1 className={styles.heroTitle}>{post.title}</h1>
        <p className={styles.heroDesc}>{post.description}</p>

        <div className={styles.heroAuthor}>
          <span>{post.author}</span>
          <span className={styles.authorDot} />
          <span>{formatDate(post.date)}</span>
          {post.tags.length > 0 && (
            <>
              <span className={styles.authorDot} />
              <span>{post.tags.join(', ')}</span>
            </>
          )}
        </div>
      </div>

      {post.thumbnail && (
        <img src={post.thumbnail} alt={post.title} className={styles.thumbnail} />
      )}

      <div className={styles.layout}>
        {/* Main content */}
        <div
          ref={proseRef}
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <p className={styles.sidebarTitle}>포스트 정보</p>
            <div className={styles.sidebarInfo}>
              <div className={styles.sidebarInfoRow}>
                <span className={styles.sidebarInfoLabel}>작성자</span>
                <span className={styles.sidebarInfoValue}>{post.author}</span>
              </div>
              <div className={styles.sidebarInfoRow}>
                <span className={styles.sidebarInfoLabel}>날짜</span>
                <span className={styles.sidebarInfoValue}>{formatDate(post.date)}</span>
              </div>
              <div className={styles.sidebarInfoRow}>
                <span className={styles.sidebarInfoLabel}>카테고리</span>
                <span className={styles.sidebarInfoValue}>{post.category}</span>
              </div>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className={styles.sidebarSection}>
              <p className={styles.sidebarTitle}>태그</p>
              <div className={styles.tagList}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>관련 포스트</h2>
          <div className={styles.relatedGrid}>
            {related.map((p) => (
              <RelatedCard key={p.slug} post={p} onClick={() => navigate(`/blog/${p.slug}`)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function RelatedCard({ post, onClick }: { post: PostMeta; onClick: () => void }) {
  return (
    <div className={styles.relatedCard} onClick={onClick}>
      <div className={styles.relatedCardImgWrap}>
        <img src={post.thumbnail} alt={post.title} className={styles.relatedCardImg} />
      </div>
      <div className={styles.relatedCardBody}>
        <p className={styles.relatedCardCategory}>{post.category}</p>
        <h3 className={styles.relatedCardTitle}>{post.title}</h3>
      </div>
    </div>
  )
}
