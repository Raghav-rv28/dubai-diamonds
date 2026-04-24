"use client";

import { SectionHeader } from "@/components/ui/divider";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Cut = {
  key: string;
  name: string;
  image: string;
  description: string;
};

const CUTS: Cut[] = [
  {
    key: "oval",
    name: "Oval",
    image: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/oval.png?v=1749062157",
    description:
      "Elongated brilliance that flatters the hand — a contemporary classic with timeless fire.",
  },
  {
    key: "heart",
    name: "Heart",
    image: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/heart.png?v=1749062156",
    description:
      "The most romantic of all cuts — a sentimental silhouette sculpted for moments that matter.",
  },
  {
    key: "marquise",
    name: "Marquise",
    image: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/marquise.png?v=1749062156",
    description:
      "A regal, elongated shape that maximises carat presence. Named for royalty — worn like it.",
  },
  {
    key: "emerald",
    name: "Emerald",
    image: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/emerald.png?v=1749062157",
    description:
      "Step-cut clarity with architectural calm. An understated statement of refined taste.",
  },
  {
    key: "princess",
    name: "Princess",
    image: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/Princess.png?v=1749062156",
    description:
      "Sharp, modern, and ablaze with light — the princess is brilliance squared.",
  },
  {
    key: "Pear",
    name: "Pear",
    image: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/Pear_2.png?v=1749062157",
    description:
      "A teardrop silhouette blending the elegance of the oval with the drama of the marquise.",
  },
  {
    key: "Radiant",
    name: "Radiant",
    image: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/radiant.png?v=1749062157",
    description:
      "Cropped corners, brilliant facets — a cut that lives up to its name in every light.",
  },
  {
    key: "Cushion",
    name: "Cushion",
    image: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/cushion.png?v=1749062156",
    description:
      "Soft corners, pillow profile, vintage soul. A romantic cut with modern sparkle.",
  },
];

export default function DiamondCuts() {
  const [active, setActive] = useState<Cut>(CUTS[0]!);

  return (
    <section className="w-full px-4 md:px-8 py-16 md:py-28 relative overflow-hidden">
      <SectionHeader
        eyebrow="The Cut"
        title="Every diamond tells"
        titleItalic="a story."
        description="Each cut catches light differently. Find the one that reflects you."
        className="mb-12 md:mb-16"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16 items-center">
        {/* Stage: active diamond with soft champagne halo */}
        <div className="relative flex items-center justify-center h-[320px] md:h-[440px]">
          {/* Halo */}
          <div
            className="pointer-events-none absolute inset-10 rounded-full blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--champagne) 35%, transparent) 0%, transparent 65%)",
            }}
          />
          {/* Orbital ring */}
          <div className="pointer-events-none absolute inset-4 rounded-full border border-champagne/10" />
          <div className="pointer-events-none absolute inset-16 rounded-full border border-champagne/10" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative animate-float"
            >
              <Image
                src={active.image}
                alt={active.name}
                width={220}
                height={220}
                className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] md:w-[260px] md:h-[260px] object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Info + selector */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-3">
            <span className="eyebrow">Selected</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <h3 className="display-md text-foreground">{active.name}</h3>
                <p className="mt-3 max-w-md text-base md:text-lg text-muted-foreground leading-relaxed">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <Link
            href={`/collections/${active.key}`}
            className="group inline-flex items-center gap-3 self-start text-xs tracking-[0.25em] uppercase text-foreground hover:text-champagne transition-colors duration-300"
          >
            <span className="relative">
              Explore {active.name} Rings
              <span className="absolute -bottom-1 left-0 h-px w-full bg-champagne origin-left scale-x-100 group-hover:scale-x-100 transition-transform duration-500" />
            </span>
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Selector rail */}
          <div className="mt-2 flex flex-wrap gap-2 md:gap-3">
            {CUTS.map((cut) => {
              const selected = cut.key === active.key;
              return (
                <button
                  key={cut.key}
                  type="button"
                  onMouseEnter={() => setActive(cut)}
                  onFocus={() => setActive(cut)}
                  onClick={() => setActive(cut)}
                  aria-pressed={selected}
                  className={`group relative flex flex-col items-center gap-2 p-2 rounded-sm transition-colors duration-300 ${
                    selected ? "bg-champagne/5" : "hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`relative h-14 w-14 md:h-16 md:w-16 flex items-center justify-center transition-transform duration-500 ${
                      selected ? "scale-110" : "group-hover:scale-105"
                    }`}
                  >
                    <Image
                      src={cut.image}
                      alt={cut.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <span
                    className={`text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] transition-colors ${
                      selected ? "text-champagne" : "text-muted-foreground"
                    }`}
                  >
                    {cut.name}
                  </span>
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-px bg-champagne transition-[width,transform] duration-500 -translate-x-1/2 ${
                      selected ? "w-8" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
