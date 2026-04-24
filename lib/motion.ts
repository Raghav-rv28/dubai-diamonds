import type { Variants } from "framer-motion";

const EASE_LUXURY: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Elegant fade-up for cards, paragraphs, tiles.
 * Honors `prefers-reduced-motion` via `viewport={{ once: true }}` usage patterns.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_LUXURY },
  },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_LUXURY },
  },
};

/**
 * Editorial reveal with a soft blur — ideal for display headings.
 */
export const revealBlur: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

/**
 * Stagger container — use with `viewport={{ once: true, amount: 0.2 }}`.
 */
export const staggerContainer = (stagger = 0.08, delay = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_LUXURY },
  },
};

export const viewportOnce = { once: true, amount: 0.2 } as const;
