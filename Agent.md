# Project Context & Rules: The Helia Renewal (Dynamic Healing & High-End)

## 1. Role & Goal
* **Role:** Senior Frontend Developer & UI/UX Designer
* **Goal:** 'The Helia' 산후조리원 웹사이트 리뉴얼. 기존의 정적인 럭셔리를 넘어, 사용자 감성을 터치하고 모바일 경험을 극대화하는 웹사이트 구축.
* **Concept:** "Warmth & Breath" (온기와 숨결) - 고요하고 유기적이며 몰입감 있는 힐링 공간.

## 2. Design System (Strict Compliance)

### A. Color Palette
* **Base (Background):**
    * Warm White (`#F9F8F4`) - 눈이 편안한 웜톤 배경
    * Cream Beige (`#F0EBE0`) - 부드러운 섹션 구분
* **Primary (Brand):**
    * Muted Sage Green (`#8A9A8A`) - 힐링, 자연, 차분함
* **Accent:**
    * Soft Terracotta (`#CFA898`) - 따뜻한 혈색, 포인트 강조
* **Typography Color:**
    * Deep Charcoal (`#2C2C2C`) - 완전한 블랙 지양, 부드러운 가독성

### B. Typography
* **Headlines (Titles):** `Source Han Serif` (본명조) or `MaruBuri`. Light Weight 권장. 우아하고 섬세한 느낌.
* **Body (Content):** `Pretendard`. 가독성 및 모바일 최적화 필수.
* **English Points:** `Playfair Display` (Italic 활용). 감성적인 섹션 타이틀에 사용.

### C. Layout Strategy
* **Responsive:** Mobile First 설계 (Thumb zone 고려).
* **Grid System:** Bento Grid (벤토 그리드) 레이아웃 적극 활용 (정보의 도시락 통 구조).
* **Spacing:** 여백(White Space)을 충분히 활용하여 Magazine(잡지) 스타일 구현.

## 3. Key Features & UX Interactions

### A. Header & Hero
* **Background:** Full-screen Cinematic Video (Slow motion, 4K mood).
* **Copy:** Center aligned, Micro-copy with Fade-out interaction on scroll.
* **CTA:** Glassmorphism (유리 질감)이 적용된 Sticky Floating Button ('상담 예약하기').

### B. Interactions (Tech Specs)
* **Scroll Effect:** `Lenis Scroll` 등을 활용한 부드러운 관성 스크롤 필수.
* **Visual Effects:**
    * Parallax Scrolling (시차 스크롤)
    * Image Zoom-in on scroll
    * Micro-interactions on Hover (특히 벤토 그리드 카드)
* **Loading:** Skeleton UI 적용하여 체감 속도 향상.

## 4. Tech Stack Recommendations
* **Framework:** Next.js or React
* **Styling:** Tailwind CSS (설정된 컬러 팔레트 config에 추가 필수)
* **Motion:** Framer Motion or GSAP
* **Optimization:** Next/Image (고해상도 이미지 최적화)

## 5. Implementation Guidelines
코드를 작성할 때 다음 원칙을 따르세요:
1.  **감성 중심:** 기능 구현보다 '느낌'과 '분위기' 전달을 우선시할 것.
2.  **모바일 우선:** 모든 UI 컴포넌트는 모바일 뷰포트에서 완벽하게 작동해야 함.
3.  **접근성:** 아름다움뿐만 아니라 시멘틱 마크업을 준수할 것.