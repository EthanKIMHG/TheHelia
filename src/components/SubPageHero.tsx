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

  return (
    <section className="mx-auto flex w-full flex-col gap-12">
      <div className="relative min-h-[420px] overflow-hidden bg-accent/60 md:min-h-[500px] md:h-[48vh]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          quality={85}
          fill
          priority
          sizes="100vw"
          className=" object-cover"
        />
        <div className={clsx("absolute inset-0 flex flex-col items-center justify-end gap-3 bg-black/20 px-6 pb-12 text-center text-white md:justify-center md:pb-0", {
          "hidden": secondPath === "the-helia"
        })}>
          <ScrollReveal>
            <span className={"mx-auto block max-w-[14ch] break-keep font-display-serif text-2xl font-normal leading-[1.4] tracking-[0.2em] drop-shadow-md md:max-w-none md:text-4xl"}>
              {title}
            </span>
          </ScrollReveal>
          
        </div>
      </div>
    </section>
  );
}
