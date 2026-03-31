import { marked } from 'marked'

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  author: string
  thumbnail: string
  tags: string[]
}

export interface Post extends PostMeta {
  content: string
  html: string
}

// Minimal browser-safe frontmatter parser (YAML --- blocks only)
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const yamlStr = match[1]
  const content = match[2]
  const data: Record<string, unknown> = {}

  for (const line of yamlStr.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim()
    if (!key) continue

    // Array: starts with [ and ends with ]
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      // Strip surrounding quotes
      data[key] = val.replace(/^["']|["']$/g, '')
    }
  }

  return { data, content }
}

// Vite glob import — all .md files in content/posts
const modules = import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default', eager: true })

function slugFromPath(path: string): string {
  return path.replace('/content/posts/', '').replace('.md', '')
}

let _posts: Post[] | null = null

export function getAllPosts(): Post[] {
  if (_posts) return _posts

  _posts = Object.entries(modules)
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw as string)
      const slug = slugFromPath(path)
      const html = marked(content) as string
      return {
        slug,
        title: (data.title as string) ?? '',
        description: (data.description as string) ?? '',
        date: (data.date as string) ?? '',
        category: (data.category as string) ?? '',
        author: (data.author as string) ?? '',
        thumbnail: (data.thumbnail as string) ?? '',
        tags: (data.tags as string[]) ?? [],
        content,
        html,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return _posts
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

export function getAllCategories(): string[] {
  const cats = new Set(getAllPosts().map((p) => p.category))
  return Array.from(cats)
}
