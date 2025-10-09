import Image from "next/image";

type SubPageHeroProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export function SubPageHero({ title, description, imageSrc, imageAlt }: SubPageHeroProps) {
  return (
    <section className="mx-auto flex w-full flex-col gap-12">
      <div className="relative min-h-[500px] overflow-hidden bg-black/10 md:h-[48vh]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          quality={100}
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 100vw"
          className=" object-fill"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/20 px-6 text-center text-foreground space-y-4">
          <span className="text-2xl tracking-wider md:text-5xl">
            {title}
          </span>
          <span className="text-lg md:text-xl">{description}</span>
        </div>
      </div>
    </section>
  );
}
