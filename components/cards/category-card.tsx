"use client";

import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export type CategoryCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  index: number;
  /** Tailwind classes for grid span / aspect, controlled by the parent layout. */
  className?: string;
  /** Optional kicker shown above the title (e.g. "Category"). */
  kicker?: string;
  /** Compact tiles get smaller typography so titles don't overflow narrow columns. */
  compact?: boolean;
};

export default function CategoryCard({
  id,
  title,
  imageUrl,
  index,
  className,
  kicker = "Collection",
  compact = false,
}: CategoryCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={index}
      transition={{ delay: Math.min(index, 6) * 0.07 }}
      className={cn("group relative overflow-hidden", className)}
    >
      <Link href={`/collections/${id}`} className="block h-full w-full">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            priority={index < 3}
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Warm ink gradient — always visible, deepens on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-500 group-hover:from-black/95" />

          {/* Thin champagne frame that fades in on hover (desktop) */}
          <div className="pointer-events-none absolute inset-3 border border-champagne/0 transition-[border-color,inset] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:border-champagne/40 md:group-hover:inset-4" />

          {/* Content */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0",
              compact ? "p-4 md:p-5" : "p-5 md:p-7",
            )}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "eyebrow",
                  compact ? "text-[0.55rem]" : "text-[0.6rem] md:text-[0.65rem]",
                )}
                style={{ color: "color-mix(in oklch, var(--champagne) 90%, white)" }}
              >
                {kicker}
              </span>
              <h3
                className={cn(
                  "font-display leading-tight text-white",
                  compact
                    ? "text-lg md:text-xl"
                    : "text-2xl md:text-3xl",
                )}
              >
                {title}
              </h3>
              {!compact && (
                <span className="mt-2 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-white/70 transition-all duration-500 md:opacity-0 md:translate-x-[-6px] md:group-hover:opacity-100 md:group-hover:translate-x-0">
                  <span
                    className="block h-px w-5 bg-champagne transition-[width] duration-500 md:group-hover:w-8"
                    aria-hidden
                  />
                  Shop
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
