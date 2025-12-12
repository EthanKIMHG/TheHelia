# Agent Action Plan: The Helia Refactoring (Integrated)
**Project:** Existing Site Refactoring & Design Modernization (The Helia)
**Target Trend:** 2025-2026 Hybrid (Bento Structure + Organic Soul)
**Core Theme:** "Organic Serenity" & "Smart Comfort"
**Role:** Lead AI Design Agent

---

## 🚩 0. Executive Summary (Design Philosophy)
본 프로젝트는 단순한 정보 제공 사이트가 아닌, **'디지털 힐링 공간'**을 지향한다.
기존 시스템의 **기술적 자산(로직)을 유지**하면서, 2025년의 명확한 정보 구조(Bento)와 2026년의 따뜻하고 지능적인 감성(Organic & AI)을 결합하여 리팩토링한다.
산모와 가족에게 **"이곳에서는 완벽히 안심할 수 있다"**는 메시지를 시각적/경험적으로 전달한다.

---

## ⚠️ 1. Refactoring Protocol (Rules of Engagement)
**이 프로젝트는 신규 구축이 아닌 '리팩토링'이다. AI Agent는 다음 원칙을 최우선으로 준수한다.**

1.  **Skin-First Approach:**
    * 기존 비즈니스 로직(예약 데이터 흐름, 상담 신청 기능 등)은 **절대 훼손하지 않는다.**
    * `global.css`, `tailwind.config` 등 스타일 변수 교체부터 시작하여 점진적으로 변경한다.
2.  **Component Injection:**
    * 페이지 전체 코드를 한 번에 갈아엎지 않는다.
    * `Button` → `Card` → `HeroSection` 순서로 **컴포넌트 단위로 격리하여 디자인을 교체**한다.
3.  **Safety Check:**
    * 반응형(Mobile) 레이아웃이 깨지지 않는지 매 컴포넌트 수정 시 확인한다.

---

## 🛠 2. Layout & Structure Strategy
### **[Strategy: Soft Bento Hybrid]**
> *"정보는 도시락처럼 깔끔하게, 감성은 곡선처럼 부드럽게"*

* **Anti-Grid Intro (감성 영역 - Hero Section):**
    * **접근:** 메인 히어로 섹션은 정형화된 그리드를 탈피(Anti-Grid). 산모와 아기의 유대감을 상징하는 **유기적인 곡선(Fluid Shapes)** 마스크와 영상이 배경에 흐르도록 설계.
    * **효과:** 딱딱한 병원 느낌을 지우고, '자연 속의 휴식'이라는 첫인상 부여.
* **Bento Grid Details (정보 영역 - Facilities):**
    * **접근:** 시설 안내(룸, 스파, 신생아실, 식사)는 **'벤토 그리드(Bento Grid)'** 레이아웃 적용.
    * **디테일:** 각 카드의 모서리 라운딩 값(Radius)을 `rounded-2xl` 이상 크게 주어 부드러움을 유지하고, 카드 호버 시 경계선이 은은하게 빛나는 **'글래스모피즘(Glassmorphism)'** 효과 적용.
    * **모바일 최적화:** 벤토 그리드는 모바일에서 수직 스택으로 자연스럽게 변환되어 정보 습득 효율 극대화.

---

## ✨ 3. Interaction & Motion Strategy
### **[Strategy: Alive & Soothing Interactions]**
> *"놀라게 하지 않고, 물 흐르듯 스며드는 움직임"*

* **Healing Scrollytelling (스토리가 있는 스크롤):**
    * **구현:** '입실부터 퇴실까지의 2주간의 여정'을 **스크롤리텔링**으로 구현. 스크롤을 내림에 따라 아침의 햇살, 오후의 스파, 저녁의 정찬 이미지가 부드럽게 디졸브(Dissolve) 되며 전환.
    * **속도감:** 2025 트렌드인 빠른 전환보다는, 산모의 안정을 고려한 **Slow-Motion Parallax** 적용 (요소가 아래에서 위로 천천히 떠오르는 Fade-in Up).
* **Micro-Interactions (살아있는 디테일):**
    * **커서(Cursor):** (데스크탑 한정) 마우스 커서 주변에 은은한 오라(Aura)가 따라다니게 하여 몽환적인 느낌 조성.
    * **버튼:** '상담 예약' 버튼 등 주요 CTA는 정지해 있지 않고 마치 **숨을 쉬는 듯한(Breathing)** 미세한 크기/그림자 변화 애니메이션 적용.

---

## 🎨 4. Visual & Typography Strategy
### **[Strategy: Kinetic Elegance]**
> *"압도적인 우아함과 읽기 쉬운 명확성"*

* **Typography (서체):**
    * **Headline:** 신뢰와 럭셔리함을 주는 **Modern Serif** (예: Playfair Display, Cinzel 등) 폰트 사용.
    * **Oversized:** 2026 트렌드인 **초대형 타이포그래피**를 활용하여 "Recovery", "Love", "Beginning" 등 핵심 키워드를 화면 가득 채움.
    * **Kinetic Text:** 텍스트가 단순히 나타나는 것이 아니라, 물결처럼 서서히 떠오르거나(Reveal), 한 글자씩 우아하게 제자리를 찾아가는 키네틱 효과 적용.
* **Color & Texture (색상 및 질감):**
    * **Palette:** 눈의 피로를 줄이는 **Warm Neutral** (베이지, 웜그레이) 베이스에, 포인트 컬러로 **Deep Calm Blue**나 **Sage Green** 사용.
    * **Texture:** 차가운 디지털 화면 대신, **한지나 린넨 같은 종이 질감(Grain)**을 노이즈 필터로 얇게 입혀 따뜻한 아날로그 감성 전달.

---

## 🤖 5. AI & Tech Integration (Future-Proofing)
* **AI Care Concierge Slot:**
    * 우측 하단에 'AI 산후조리 매니저' 챗봇이 들어갈 플로팅 UI 공간(FAB)을 미리 확보한다.
    * 단순 상담을 넘어 투어 예약 확정까지 가능한 Agentic Workflow 고려.
* **Dynamic Theme:**
    * 접속 시간대(낮/밤)에 따라 테마 변수(CSS Variables)가 부드럽게 변할 수 있도록 구조화한다.

---

## ✅ 6. Execution Checklist (Step-by-Step Refactoring)
- [ ] **Step 1 (Global Style):** `tailwind.config.js`에 Serif 폰트, Neutral/Sage 컬러 팔레트, Radius 변수 정의.
- [ ] **Step 2 (Components):** 버튼 및 카드 컴포넌트에 Hover Effect (Breathing, Glassmorphism) 적용.
- [ ] **Step 3 (Structure):** `FacilitySection`을 Bento Grid 레이아웃으로 CSS Grid 재작성 (데이터 유지).
- [ ] **Step 4 (Hero):** `HeroSection`을 Anti-Grid 및 영상 배경 디자인으로 전면 교체.
- [ ] **Step 5 (Motion):** 전체 페이지에 Scrollytelling (Fade-in Up) 모션 라이브러리 연동.

---