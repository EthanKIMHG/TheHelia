# The Helia

## Overview

The Helia는 프리미엄 산후조리원 정보를 전달하는 반응형 웹사이트입니다.
산모와 신생아 케어, 객실, 스파, 예약/가격 정보를 한 흐름으로 탐색할 수 있게 구성했습니다.
브랜드 무드인 Organic Serenity와 Smart Comfort를 반영해 따뜻한 비주얼과 명확한 정보 구조에 집중했습니다.
DB, 로그인, 회원가입 없이 정적 콘텐츠와 서버 라우팅 중심으로 운영되는 정보형 사이트입니다.

## Problem

방문자가 객실 등급, 서비스, 가격, 예약 흐름을 빠르게 비교하고 이해할 수 있는 정보 구조가 필요했습니다. 특히 모바일에서는 가격표, 환불 정책, 서비스 차이처럼 상담 전환에 중요한 정보가 한눈에 들어오도록 정리하는 것이 핵심 과제였습니다.

## My Role

프론트엔드 구현 및 리팩터링을 담당했습니다. Next.js App Router 기반 라우팅, KO/EN locale 페이지 구조, 반응형 UI, 브랜드 톤 적용, 예약 CTA와 가격/서비스 페이지 UX 개선, SEO 메타데이터와 배포 환경 구성을 다뤘습니다.

## Key Features

- 한국어/영어 locale 기반 페이지 구성과 전역 헤더/푸터 내비게이션
- 객실 등급(VIP/VVIP/PRESTIGE), 서비스(헬리아 스파/베이비 스파/신생아실/교육 프로그램) 상세 페이지
- 예약 및 가격 페이지의 모바일 우선 비교 UI와 환불 정책/요금 정보 가독성 개선
- 시네마틱 홈 히어로, 섹션 전환, 스크롤 리빌, 부드러운 스크롤 등 브랜드 경험용 인터랙션
- 라이트/다크 테마와 locale 상태를 관리하는 클라이언트 컨텍스트
- SEO 메타데이터, sitemap/robots, Vercel Analytics/Speed Insights 적용

## Tech Stack

- Framework: Next.js 15.2.8 App Router
- Language: TypeScript 5, React 19.1.0
- Styling: Tailwind CSS 4, clsx, tailwind-merge
- Motion: Framer Motion, GSAP, Lenis
- Icons/Analytics: lucide-react, Vercel Analytics, Vercel Speed Insights
- Package/Deploy: pnpm, Vercel

## Architecture

- 라우팅: `src/app` App Router를 사용하며 루트 `/`는 `/ko`로 리다이렉트합니다. 주요 페이지는 `/[locale]/...` 구조로 제공하고, locale은 `ko`, `en`을 지원합니다.
- 데이터 흐름: 별도 CMS나 DB 없이 `src/components/header/nav-data.ts`, 페이지 컴포넌트, `public/img` 정적 자산을 기반으로 콘텐츠를 렌더링합니다. 이용약관은 `/api/terms-policy` API route에서 locale별 텍스트 파일을 읽어 반환합니다.
- 상태 관리: 서버 컴포넌트를 기본으로 사용하고, 테마/언어 전환, 페이지 전환, 스크롤 인터랙션처럼 브라우저 상태가 필요한 부분만 클라이언트 컴포넌트로 분리했습니다.
- 인증: 정보형 웹사이트라 로그인, 회원가입, 사용자 권한, DB 인증 흐름은 없습니다.
- 배포: `SITE_URL`은 `https://thehelia.co.kr` 기준이며, Vercel 배포와 Analytics/Speed Insights를 전제로 구성되어 있습니다. middleware에서 legacy Vercel 호스트를 canonical 도메인으로 308 리다이렉트합니다.


## Links

- Live Demo: [https://thehelia.co.kr](https://thehelia.co.kr)
- GitHub: 비공개 저장소
- Screenshots: [`public/img/main/homepage_1.jpg`](public/img/main/homepage_1.jpg), [`public/img/subhero/reservation.jpg`](public/img/subhero/reservation.jpg)
