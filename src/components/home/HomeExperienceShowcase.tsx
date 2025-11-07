import { motion } from "framer-motion";
import Image, { type ImageProps } from "next/image";

export type HomeExperienceHighlight = {
  meta: string;
  title: string;
  description: string;
  image: ImageProps["src"];
  imageAlt: string;
  bullets?: string[];
  badge?: string;
};

type HomeShowcaseProps = {
  highlight: HomeExperienceHighlight;
  order?: "text-first" | "image-first";
  id?: string;
  sectionRef?: (node: HTMLElement | null) => void;
};

export function HomeExperienceStacked({
  highlight,
  order = "image-first",
  id,
  sectionRef,
}: HomeShowcaseProps) {
  const textFirst = order === "text-first";

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className="flex min-h-screen w-full items-center justify-center bg-background px-6 py-16 text-secondary md:py-24"
        initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="relative h-[340px] w-full overflow-hidden rounded-[32px] border border-border bg-background shadow-2xl md:h-[420px] lg:h-[520px]"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ order: textFirst ? 2 : 1 }}
        >
          <Image
            src={highlight.image}
            alt={highlight.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
          {highlight.badge ? (
            <motion.span
              className="absolute left-6 top-6 inline-flex items-center justify-center rounded-full border border-border bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {highlight.badge}
            </motion.span>
          ) : null}
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 px-6 pb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-[0.4em] text-white/70">
              {highlight.meta}
            </span>
            <h3 className="text-3xl font-semibold md:text-4xl">
              {highlight.title}
            </h3>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6 rounded-[32px] border border-border bg-background/80 px-8 py-10 backdrop-blur"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, ease: [0.16, 0.84, 0.44, 1] }}
          style={{ order: textFirst ? 1 : 2 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
            {highlight.meta}
          </span>
          <h3 className="text-3xl font-semibold text-secondary md:text-4xl">
            {highlight.title}
          </h3>
          <p className="text-base leading-relaxed text-secondary/80 md:text-lg">
            {highlight.description}
          </p>
          {highlight.bullets?.length ? (
            <ul className="grid gap-3 text-sm text-secondary/70 md:grid-cols-2">
              {highlight.bullets.map((bullet) => (
                <motion.li
                  key={bullet}
                  className="inline-flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
          ) : null}
        </motion.div>
      </div>
    </motion.section>
  );
}

export function HomeExperienceTilted({
  highlight,
  order = "image-first",
  id,
  sectionRef,
}: HomeShowcaseProps) {
  const textFirst = order === "text-first";

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className="flex min-h-screen w-full items-center justify-center bg-background px-6 py-16 text-secondary md:py-24"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: textFirst ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ order: textFirst ? 1 : 2 }}
        >
          <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {highlight.meta}
          </span>
          <motion.h3
            className="text-3xl font-semibold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {highlight.title}
          </motion.h3>
          <motion.p
            className="text-base leading-relaxed text-secondary/80 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {highlight.description}
          </motion.p>
          {highlight.bullets?.length ? (
            <div className="grid gap-4 text-sm text-secondary/70">
              {highlight.bullets.map((bullet, idx) => (
                <motion.div
                  key={bullet}
                  className="rounded-2xl border border-border bg-background/80 px-6 py-4 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                >
                  {bullet}
                </motion.div>
              ))}
            </div>
          ) : null}
        </motion.div>

        <motion.div
          className="relative mx-auto flex w-full max-w-[520px] items-center justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ order: textFirst ? 2 : 1 }}
        >
          <motion.div
            className="absolute inset-0 rounded-[36px] bg-primary/15 blur-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.div
            className="relative h-[360px] w-full rotate-[-4.5deg] overflow-hidden rounded-[36px] border border-border bg-background/80 shadow-2xl"
            initial={{ rotate: textFirst ? 8 : -8, y: 40 }}
            whileInView={{ rotate: textFirst ? -4.5 : 4.5, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 0.84, 0.44, 1] }}
          >
            <Image
              src={highlight.image}
              alt={highlight.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </motion.div>
          <motion.div
            className="absolute -bottom-9 right-6 flex w-[220px] flex-col gap-3 rounded-2xl border border-border bg-background p-4 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {highlight.badge ?? highlight.meta}
            </span>
            <p className="text-sm text-secondary/80">{highlight.description}</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export function HomeExperienceGallery({
  highlight,
  order = "image-first",
  id,
  sectionRef,
}: HomeShowcaseProps) {
  const textFirst = order === "text-first";

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-background via-background/90 to-primary/20 px-6 py-16 text-secondary md:py-28"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="absolute left-1/2 top-1/3 h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="relative z-[1] mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: textFirst ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ order: textFirst ? 1 : 2 }}
        >
          <span className="inline-flex w-fit items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {highlight.meta}
          </span>
          <motion.h3
            className="text-3xl font-semibold text-secondary md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {highlight.title}
          </motion.h3>
          <motion.p
            className="text-base leading-relaxed text-secondary/80 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {highlight.description}
          </motion.p>
          {highlight.bullets?.length ? (
            <motion.ul
              className="grid gap-3 text-sm text-secondary/70"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.5,
                  },
                },
              }}
            >
              {highlight.bullets.map((bullet) => (
                <motion.li
                  key={bullet}
                  className="flex items-center gap-3 rounded-full border border-border bg-background/80 px-5 py-3 backdrop-blur"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>
          ) : null}
        </motion.div>

        <div className="relative grid grid-cols-2 gap-6" style={{ order: textFirst ? 2 : 1 }}>
          <motion.div
            className="col-span-2 h-[260px] overflow-hidden rounded-[32px] border border-border shadow-xl md:h-[300px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src={highlight.image}
              alt={highlight.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </motion.div>

          <motion.div
            className="relative h-[200px] overflow-hidden rounded-3xl border border-border bg-background/90 shadow-lg"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
            <motion.div
              className="absolute left-5 top-5 flex flex-col gap-2 text-sm text-secondary"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
                Signature
              </span>
              <p className="max-w-[220px] text-secondary/75">
                {highlight.description}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative h-[200px] overflow-hidden rounded-3xl border border-border bg-background/90 shadow-lg"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.16, 0.84, 0.44, 1] }}
          >
            <Image
              src={highlight.image}
              alt={highlight.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 35vw, 100vw"
            />
            <motion.div
              className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-t from-black/50 via-black/20 to-transparent px-5 pb-5 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                {highlight.badge ?? highlight.meta}
              </span>
              <p className="text-sm text-white/80">{highlight.title}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
