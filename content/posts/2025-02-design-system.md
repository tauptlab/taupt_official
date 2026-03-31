---
title: "디자인 시스템 구축기 — 일관된 사용자 경험을 위한 여정"
description: "TaupT가 내부 디자인 시스템을 구축하면서 배운 교훈과 접근 방법을 공유합니다."
date: "2025-02-20"
category: "Design"
author: "Design Team"
thumbnail: "https://www.kacelab.com/img/main/ms2_ourCulture.jpg"
tags: ["Design System", "UI", "UX", "Figma"]
---

# 디자인 시스템 구축기

모든 프로젝트마다 버튼 색상을 다시 정의하고, 타이포그래피를 새로 설정하는 반복 작업에 지쳐있었습니다. 그래서 우리는 **디자인 시스템**을 만들기로 했습니다.

## 왜 디자인 시스템인가

디자인 시스템은 단순한 컴포넌트 라이브러리가 아닙니다. 팀 전체가 동일한 언어로 소통할 수 있게 해주는 **공통의 기반**입니다.

### 문제 인식

- 디자이너와 개발자 간의 스펙 전달 오류
- 비슷하지만 다른 컴포넌트의 증식
- 일관성 없는 사용자 경험

## 구축 과정

### 1단계: 토큰 정의

먼저 색상, 타이포그래피, 간격 등의 **디자인 토큰**을 정의했습니다.

```
색상 토큰:
- Primary: #0d0d0d
- Secondary: #f5f5f3
- Accent: #2563eb
- Muted: #6b7280
```

### 2단계: 컴포넌트 개발

토큰을 기반으로 기본 컴포넌트를 개발했습니다.

- Button (Primary, Secondary, Ghost)
- Input, Textarea
- Card, Badge
- Typography (Heading, Body, Caption)

### 3단계: 문서화

Storybook을 활용하여 모든 컴포넌트를 문서화했습니다.

## 결과

디자인 시스템 도입 후 새 프로젝트 초기 설정 시간이 **60% 단축**되었습니다.
