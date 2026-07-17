'use client'

import { ScrollReveal } from "@/components/common/ScrollReveal";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";

type SubPageHeroProps = {
  title: string;

  imageSrc: string;
  imageAlt: string;

  variant?: "default" | "cinematic";
  eyebrow?: string;
  copy?: string;
};

export function SubPageHero({
  title,
  imageSrc,
  imageAlt,
  variant = "default",
  eyebrow,
  copy,
}: SubPageHeroProps) {
  const secondPath = usePathname().split("/")[2];

  if (variant === "cinematic") {
    return (
      <section className="relative h-[62vh] min-h-[440px] w-full overflow-hidden bg-accent/60 md:h-[70vh]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          quality={90}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/85 via-[#2D241E]/25 to-[#2D241E]/10" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-4 pb-10 md:pb-16">
            <ScrollReveal>
              {eyebrow ? (
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="mt-4 break-keep font-display-serif text-4xl font-normal uppercase tracking-[0.12em] text-white md:text-6xl">
                {title}
              </h1>
              {copy ? (
                <p className="mt-5 max-w-[46ch] break-keep text-sm leading-[1.9] text-white/85 md:text-base">
                  {copy}
                </p>
              ) : null}
            </ScrollReveal>
          </div>
        </div>
      </section>
    );
  }

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
