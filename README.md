# The Helia

더헬리아 산후조리원 공식 웹사이트 프론트엔드입니다.

객실, 서비스, 예약/가격, 위치, FAQ, 고객 후기 정보를 제공하는 정보형 웹사이트입니다. Next.js App Router 기반으로 한국어/영어 페이지를 구성하고, 별도 DB나 로그인 없이 정적 콘텐츠와 이미지 자산을 중심으로 운영됩니다.

## Pages

- Home
- The Helia 소개 / 위치
- Room & Suites: VIP, VVIP, Prestige
- Service: Helia Spa, Baby Spa, Infant Room, Mom's Class
- Reservation / Price
- Stories: FAQ, Guest Reviews

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion, GSAP, Lenis
- Vercel Analytics / Speed Insights

## Project Structure

- `src/app`: App Router pages, layouts, metadata, sitemap, robots
- `src/components`: page sections, shared layout, header/footer, common UI
- `src/context`: theme and locale client state
- `src/lib`: site constants, SEO helpers, utility functions
- `public`: images, fonts, favicon assets

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Link

- Live: [https://thehelia.co.kr](https://thehelia.co.kr)
