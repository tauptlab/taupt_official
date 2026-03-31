---
title: "React 성능 최적화 — 렌더링을 50% 줄인 방법"
description: "대규모 React 애플리케이션에서 성능 병목을 찾고 해결한 실전 경험을 공유합니다."
date: "2025-03-10"
category: "Frontend"
author: "Frontend Team"
thumbnail: "https://www.kacelab.com/img/main/portfolio2.jpg"
tags: ["React", "Performance", "Frontend", "Optimization"]
---

# React 성능 최적화

수천 개의 리스트 아이템을 렌더링하는 대시보드에서 심각한 성능 문제가 발생했습니다. 스크롤할 때마다 프레임이 떨어지고, 사용자들의 불만이 쌓여갔습니다.

## 문제 진단

React DevTools Profiler를 통해 원인을 분석했습니다.

### 주요 문제점

1. **불필요한 리렌더링**: 부모 컴포넌트 상태 변경 시 모든 자식 재렌더링
2. **무거운 연산**: 필터링/정렬 로직이 매 렌더마다 실행
3. **이미지 최적화 부재**: 원본 이미지를 그대로 로드

## 해결 방법

### React.memo 적용

```tsx
const ListItem = React.memo(({ item }: { item: Item }) => {
  return <div>{item.title}</div>
})
```

### useMemo로 연산 캐싱

```tsx
const filteredItems = useMemo(
  () => items.filter(item => item.active),
  [items]
)
```

### 가상화 (Virtualization)

수천 개의 아이템은 `react-virtual`을 사용하여 화면에 보이는 것만 렌더링했습니다.

```tsx
const rowVirtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 60,
})
```

## 결과

| 지표 | 개선 전 | 개선 후 |
|------|---------|---------|
| 초기 렌더 시간 | 2.3s | 0.8s |
| 스크롤 FPS | 28fps | 60fps |
| 메모리 사용량 | 180MB | 95MB |

성능 최적화는 한 번에 완성되지 않습니다. 지속적인 측정과 개선이 핵심입니다.
