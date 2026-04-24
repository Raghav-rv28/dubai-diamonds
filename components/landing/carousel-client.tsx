"use client";

import { useAnimationFrame, useMotionValue } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type CarouselProduct = {
  handle: string;
  title: string;
  amount: string;
  currencyCode: string;
  imageUrl: string;
};

export default function CarouselClient({
  products,
}: {
  products: CarouselProduct[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  // Auto-scroll loop: advance x, wrap around once we've scrolled past 1/3 of the track
  useAnimationFrame((_, delta) => {
    if (paused) return;
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.04; // pixels per ms — gentle, luxurious
    const next = x.get() - delta * speed;
    const trackWidth = track.scrollWidth;
    // We duplicated products x3, so one set width = trackWidth / 3
    const loopWidth = trackWidth / 3;
    if (Math.abs(next) >= loopWidth) {
      x.set(next + loopWidth);
    } else {
      x.set(next);
    }
  });

  const currencyFormatter = (amount: string, currency: string) => {
    try {
      return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(Number(amount));
    } catch {
      return `${currency} ${amount}`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full edge-fade-x overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <motion.ul
        ref={trackRef}
        style={{ x }}
        className="flex gap-4 md:gap-6 cursor-grab active:cursor-grabbing select-none"
        drag="x"
        dragMomentum={false}
        onDragStart={() => setPaused(true)}
        onDragEnd={() => setPaused(false)}
      >
        {products.map((product, i) => (
          <li
            key={`${product.handle}-${i}`}
            className="flex-none w-[68vw] sm:w-[40vw] md:w-[28vw] lg:w-[22vw] xl:w-[18vw]"
          >
            <Link
              href={`/products/${product.handle}`}
              className="group block"
              draggable={false}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-soft">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  draggable={false}
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.05] pointer-events-none"
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 22vw"
                />
                <div className="pointer-events-none absolute inset-3 border border-champagne/0 transition-colors duration-700 group-hover:border-champagne/40" />
              </div>

              <div className="mt-4 flex flex-col gap-1.5">
                <h3 className="font-display text-base md:text-lg leading-tight line-clamp-1 group-hover:text-champagne transition-colors duration-300">
                  <span className="relative">
                    {product.title}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full bg-champagne origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]" />
                  </span>
                </h3>
                <span className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {currencyFormatter(product.amount, product.currencyCode)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
