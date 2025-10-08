'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, PanInfo } from "framer-motion";

type CarouselImage = {
  src: string;
  alt: string;
  quality: number;
};

const IMAGE_PATH = "/img/main";

const CAROUSEL_IMAGES: CarouselImage[] = [
  { src: `${IMAGE_PATH}/homepage_1.jpg`, alt: "더헬리아 메인 이미지 1" , quality: 100},
  { src: `${IMAGE_PATH}/homepage_2.jpg`, alt: "더헬리아 메인 이미지 2", quality: 100 },
  { src: `${IMAGE_PATH}/homepage_3.jpg`, alt: "더헬리아 메인 이미지 3", quality: 100 },
  { src: `${IMAGE_PATH}/homepage_4.jpg`, alt: "더헬리아 메인 이미지 4", quality: 100 },
  { src: `${IMAGE_PATH}/homepage_5.jpg`, alt: "더헬리아 메인 이미지 5", quality: 100 },
  { src: `${IMAGE_PATH}/homepage_6.jpg`, alt: "더헬리아 메인 이미지 6", quality: 100 }
];

const TRANSITION = { duration: 0.6, ease: "easeInOut" as const };
const AUTOPLAY_DELAY = 10000;

export default function HomeCarousel() {
  const images = CAROUSEL_IMAGES;
  const [index, setIndex] = useState(0);

  const showNext = () => setIndex((prev) => (prev + 1) % images.length);
  const showPrev = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 300;
    if (info.offset.x < -threshold) {
      showNext();
    } else if (info.offset.x > threshold) {
      showPrev();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [images.length, index]);

  return (
    <div className="relative w-full overflow-hidden home-hero h-[45vh] sm:h-[50vh] md:h-[60vh] 2xl:h-screen 2xl:max-h-none 2xl:rounded-none bg-black/5 touch-pan-y">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={images[index].src}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={TRANSITION}
          className="relative h-full w-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          dragElastic={0.12}
          dragMomentum={false}
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            quality={images[index].quality}
            fill
            priority={index === 0}
            sizes="100vw"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((image, dotIndex) => {
          const isActive = dotIndex === index;
          return (
            <button
              key={image.src}
              type="button"
              aria-label={`${dotIndex + 1}번째 이미지로 이동`}
              onClick={() => setIndex(dotIndex)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                isActive ? "bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
