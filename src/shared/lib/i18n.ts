export type Lang = 'ko' | 'en'

const translations = {
  ko: {
    // ── Header ──
    nav: {
      whoWeAre: 'Who we are',
      work: 'Work',
      contact: 'Contact',
      blog: 'Blog',
    },
    // ── Hero ──
    hero: {
      label: '차등 프라이버시 전문 기업',
      words: ['보호합니다.', '분석합니다.', '보장합니다.', '증명합니다.'],
      headline: '데이터는 활용하되,\n개인정보를\n',
      desc: 'TaupT는 차등 프라이버시(Differential Privacy) 기술로\n데이터 활용과 개인정보 보호를 동시에 실현합니다.',
      scroll: 'Scroll',
    },
    // ── About ──
    about: {
      keywords: [
        'Privacy', '차등 프라이버시', 'Federated Learning', 'Data Safety',
        '연합학습', 'AI Security', '합성 데이터', 'Compliance',
        '프라이버시 감사', 'DP Engine',
      ],
      theme: 'Theme',
      teamLabel: 'Team',
      teamTitle: 'Our Team',
      memberCount: '9 Members',
      workNumber: '50+',
      workTitle: 'Work',
      cultureNumber: '8+',
      cultureTitle: 'Our Culture',
      stackCards: [
        { title: 'Career', desc: '함께 성장할 인재를 찾습니다' },
        { title: 'Contact', desc: '프로젝트를 시작해보세요' },
        { title: 'Service', desc: '다양한 서비스를 제공합니다' },
        { title: 'About Us', desc: 'TaupT를 소개합니다' },
      ],
    },
    // ── Work ──
    work: {
      label: 'Our Work',
      title: 'Selected Projects',
    },
    // ── Contact ──
    contact: {
      label: 'Contact',
      title: '함께 만들어\n볼까요?',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      addressLabel: 'Address',
      nameField: '이름',
      namePlaceholder: '홍길동',
      phoneField: '연락처',
      phonePlaceholder: '010-0000-0000',
      emailField: '이메일',
      emailPlaceholder: 'hello@example.com',
      typeField: '문의 유형',
      typePlaceholder: '통계 분석 / 연합학습 / API 연동 / 기타',
      messageField: '메시지',
      messagePlaceholder: '프로젝트에 대해 자세히 알려주세요.',
      submit: '보내기 →',
    },
    // ── Blog ──
    blog: {
      label: 'Blog',
      title: 'Insights &\nStories',
      desc: 'TaupT 팀이 차등 프라이버시, 연합학습, 통계, 데이터 보안에 대해 이야기합니다.',
      allCategory: '전체',
      empty: '해당 카테고리에 포스트가 없습니다.',
      back: '← 블로그로 돌아가기',
      related: '관련 포스트',
      infoLabel: '포스트 정보',
      authorLabel: '작성자',
      dateLabel: '날짜',
      categoryLabel: '카테고리',
      tagsLabel: '태그',
    },
    // ── Footer ──
    footer: {
      rights: 'All rights reserved.',
      desc: '차등 프라이버시(DP) 기술로 데이터 활용과 개인정보 보호를 동시에 실현합니다.',
      links: [
        { label: 'Who we are', href: '#about' },
        { label: 'Work', href: '#work' },
        { label: 'Contact', href: '#contact' },
        { label: 'Blog', href: '/blog' },
      ],
    },
  },

  en: {
    // ── Header ──
    nav: {
      whoWeAre: 'Who we are',
      work: 'Work',
      contact: 'Contact',
      blog: 'Blog',
    },
    // ── Hero ──
    hero: {
      label: 'Differential Privacy Company',
      words: ['Protected.', 'Analyzed.', 'Guaranteed.', 'Proven.'],
      headline: 'Use your data,\nkeep privacy \n',
      desc: 'TaupT applies Differential Privacy to achieve\nboth data utility and personal data protection.',
      scroll: 'Scroll',
    },
    // ── About ──
    about: {
      keywords: [
        'Privacy', 'Differential Privacy', 'Federated Learning', 'Data Safety',
        'AI Security', 'Synthetic Data', 'Compliance', 'DP Audit',
        'Zero Trust', 'DP Engine',
      ],
      theme: 'Theme',
      teamLabel: 'Team',
      teamTitle: 'Our Team',
      memberCount: '9 Members',
      workNumber: '50+',
      workTitle: 'Work',
      cultureNumber: '8+',
      cultureTitle: 'Our Culture',
      stackCards: [
        { title: 'Career', desc: 'Join our growing team' },
        { title: 'Contact', desc: 'Start your project with us' },
        { title: 'Service', desc: 'Explore our services' },
        { title: 'About Us', desc: 'Meet TaupT' },
      ],
    },
    // ── Work ──
    work: {
      label: 'Our Work',
      title: 'Selected Projects',
    },
    // ── Contact ──
    contact: {
      label: 'Contact',
      title: "Let's build\ntogether.",
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      addressLabel: 'Address',
      nameField: 'Name',
      namePlaceholder: 'Jane Doe',
      phoneField: 'Phone',
      phonePlaceholder: '+82 10-0000-0000',
      emailField: 'Email',
      emailPlaceholder: 'hello@example.com',
      typeField: 'Inquiry Type',
      typePlaceholder: 'Stats Analysis / Federated Learning / API / Other',
      messageField: 'Message',
      messagePlaceholder: 'Tell us about your project.',
      submit: 'Send →',
    },
    // ── Blog ──
    blog: {
      label: 'Blog',
      title: 'Insights &\nStories',
      desc: 'The TaupT team writes about Differential Privacy, Federated Learning, and data security.',
      allCategory: 'All',
      empty: 'No posts in this category.',
      back: '← Back to Blog',
      related: 'Related Posts',
      infoLabel: 'Post Info',
      authorLabel: 'Author',
      dateLabel: 'Date',
      categoryLabel: 'Category',
      tagsLabel: 'Tags',
    },
    // ── Footer ──
    footer: {
      rights: 'All rights reserved.',
      desc: 'Mathematically proven data privacy through Differential Privacy technology.',
      links: [
        { label: 'Who we are', href: '#about' },
        { label: 'Work', href: '#work' },
        { label: 'Contact', href: '#contact' },
        { label: 'Blog', href: '/blog' },
      ],
    },
  },
} as const

// Use a mapped type so both ko and en satisfy the same interface
export type Translations = {
  nav: { whoWeAre: string; work: string; contact: string; blog: string }
  hero: { label: string; words: readonly string[]; headline: string; desc: string; scroll: string }
  about: {
    keywords: readonly string[]
    theme: string
    teamLabel: string
    teamTitle: string
    memberCount: string
    workNumber: string
    workTitle: string
    cultureNumber: string
    cultureTitle: string
    stackCards: readonly { title: string; desc: string }[]
  }
  work: { label: string; title: string }
  contact: {
    label: string; title: string
    emailLabel: string; phoneLabel: string; addressLabel: string
    nameField: string; namePlaceholder: string
    phoneField: string; phonePlaceholder: string
    emailField: string; emailPlaceholder: string
    typeField: string; typePlaceholder: string
    messageField: string; messagePlaceholder: string
    submit: string
  }
  blog: {
    label: string; title: string; desc: string
    allCategory: string; empty: string; back: string; related: string
    infoLabel: string; authorLabel: string; dateLabel: string
    categoryLabel: string; tagsLabel: string
  }
  footer: {
    rights: string
    desc: string
    links: readonly { label: string; href: string }[]
  }
}

export function getT(lang: Lang): Translations {
  return translations[lang] as Translations
}
