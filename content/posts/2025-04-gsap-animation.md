---
title: "GSAP으로 웹사이트에 생명 불어넣기 — ScrollTrigger 실전 가이드"
description: "GSAP ScrollTrigger를 활용하여 스크롤 기반 인터랙티브 애니메이션을 구현하는 방법을 상세히 설명합니다."
date: "2025-04-05"
category: "Frontend"
author: "Animation Team"
thumbnail: "https://www.kacelab.com/img/main/ms2_KSPM.jpg"
tags: ["GSAP", "Animation", "ScrollTrigger", "CSS"]
---

# GSAP ScrollTrigger 실전 가이드

정적인 웹사이트는 이제 충분하지 않습니다. 사용자가 스크롤할 때 살아 움직이는 경험을 만들기 위해 GSAP ScrollTrigger를 활용하는 방법을 공유합니다.

## 기본 설정

```typescript
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
```

## 핵심 패턴

### 1. 스크롤 reveal 애니메이션

요소가 뷰포트에 들어올 때 페이드인 효과를 주는 가장 기본적인 패턴입니다.

```typescript
gsap.from('.card', {
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.cards-container',
    start: 'top 80%',
  }
})
```

### 2. 핀(Pin) + 스크럽(Scrub)

섹션을 화면에 고정시키면서 스크롤에 따라 애니메이션을 진행시킵니다.

```typescript
gsap.to('.hero-image', {
  width: '100%',
  borderRadius: '10px',
  ease: 'power2.inOut',
  scrollTrigger: {
    trigger: '.hero',
    pin: true,
    start: 'top top',
    end: `+=${window.innerHeight * 2}`,
    scrub: 0.3,
  }
})
```

### 3. 수평 스크롤

세로 스크롤을 가로 스크롤로 변환합니다.

```typescript
ScrollTrigger.create({
  trigger: section,
  pin: stickyEl,
  start: 'top top',
  end: () => `+=${track.scrollWidth - window.innerWidth}`,
  scrub: 0.6,
  onUpdate: (self) => {
    gsap.set(track, {
      x: -(track.scrollWidth - window.innerWidth) * self.progress
    })
  }
})
```

## 주의사항

- React에서는 반드시 `gsap.context()`를 사용하여 클린업을 관리하세요
- `anticipatePin: 1` 옵션으로 핀 전환을 부드럽게 만드세요
- 반응형: 모바일에서는 복잡한 ScrollTrigger를 비활성화하는 것이 좋습니다

## 마치며

GSAP은 강력하지만, 과도한 애니메이션은 사용자 경험을 해칩니다. 목적 있는 애니메이션만 사용하세요.
