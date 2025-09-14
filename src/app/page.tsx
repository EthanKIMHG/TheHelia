'use client'

import Image from "next/image";

export default function Home () {
	return (
		<div className="font-sans items-center justify-items-center min-h-screen px-2">
			<main className="flex flex-col row-start-2 items-center p-2">
        
				<Image
					src="/img/main/homepage_1.jpg"
					width={1280}
					height={680}
					alt="더헬리아 메인"
          style={{
            borderRadius: '1%',
          }}
           />
			</main>
		</div>
	)
}

