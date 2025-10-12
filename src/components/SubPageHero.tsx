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
      <div className="relative min-h-[500px] overflow-hidden bg-black/10 md:h-[48vh]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          quality={100}
          fill
          priority
          
          className=" object-cover"
          
        />
        <div className={clsx("absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center bg-black/20 text-white ", {
          "hidden": secondPath === "the-helia"
        })}>
          <span className={"text-2xl tracking-wider md:text-5xl "}>
            {title}
          </span>
          
        </div>
      </div>
    </section>
  );
}
