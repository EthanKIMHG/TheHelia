'use client'

import { ScrollReveal } from "@/components/common/ScrollReveal";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";

type SubPageHeroProps = {
  title: string;
  
  imageSrc: string;
  imageAlt: string;
  
};

export function SubPageHero({ title, imageSrc, imageAlt }: SubPageHeroProps) {
  const secondPath = usePathname().split("/")[2];
  const shouldBypassOptimization = imageSrc.startsWith('/')
  
  
  return (
    <section className="mx-auto flex w-full flex-col gap-12">
      <div className="relative min-h-[500px] overflow-hidden bg-black/10 md:h-[48vh]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          quality={100}
          fill
          priority
          unoptimized={shouldBypassOptimization}
          sizes="100vw"
          
          className=" object-cover"
          
        />
        <div className={clsx("absolute inset-0 flex flex-col items-start justify-end gap-3 bg-black/20 px-6 pb-10 text-left text-white md:items-center md:justify-center md:pb-0 md:text-center", {
          "hidden": secondPath === "the-helia"
        })}>
          <ScrollReveal>
            <span className={"block max-w-[14ch] break-keep text-2xl font-serif leading-tight tracking-wider md:max-w-none md:text-4xl"}>
              {title}
            </span>
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  );
}
