'use client'

import HomeCarousel from "@/components/HomeCarousel";

export default function Home () {
	return (
	<div className="font-sans items-center justify-items-center min-h-screen">
      <main className="flex flex-col row-start-2 items-center w-full">
        <HomeCarousel />
      </main>
    </div>
	)
}
