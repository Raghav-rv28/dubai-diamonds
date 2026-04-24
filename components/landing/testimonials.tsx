"use client";

import { SectionHeader } from "@/components/ui/divider";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They didn't just sell me a ring — they helped me design the story behind it. Every visit feels like walking into a private atelier.",
    name: "Ayesha R.",
    location: "Toronto, ON",
  },
  {
    quote:
      "The craftsmanship is breathtaking. My wife hasn't taken her bangles off in two years, and they still catch light like the day we bought them.",
    name: "Marcus T.",
    location: "Mississauga, ON",
  },
  {
    quote:
      "Patient, honest, and incredibly knowledgeable. I came in nervous about choosing a diamond — I left feeling like I'd made the best decision of my life.",
    name: "Priya S.",
    location: "Brampton, ON",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full px-4 md:px-8 py-16 md:py-28 relative overflow-hidden">
      {/* soft backdrop accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklch, var(--champagne) 8%, transparent) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="In Their Words"
          title="Stories from"
          titleItalic="our clients."
          className="mb-14 md:mb-20"
        />

        <motion.ul
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex flex-col gap-6 px-2 md:px-4"
            >
              <span
                className="font-display text-6xl md:text-7xl leading-none -mb-4 select-none"
                style={{ color: "var(--champagne)" }}
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="font-display italic text-xl md:text-2xl leading-[1.4] text-foreground">
                {t.quote}
              </p>

              <div
                className="mt-2 h-px w-10"
                style={{ backgroundColor: "var(--champagne)" }}
              />

              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium tracking-[0.1em] text-foreground uppercase">
                  {t.name}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                  {t.location}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
