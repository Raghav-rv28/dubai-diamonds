"use client";

import { staggerContainer, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import CategoryCard from "../cards/category-card";

type AnimatedGridProps = {
  items: Array<{
    id: string;
    title: string;
    imageUrl: string;
  }>;
};

/**
 * Editorial asymmetric grid.
 * - First 2 tiles: feature (col-span-6, tall aspect)
 * - Remaining tiles: col-span-3, standard aspect
 * - Falls back to a neat 2-col layout on small screens
 */
export default function AnimatedGrid({ items }: AnimatedGridProps) {
  const feature = items.slice(0, 2);
  const rest = items.slice(2);

  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="hidden md:grid grid-cols-12 gap-3 lg:gap-4"
    >
      {feature.map((item, i) => (
        <CategoryCard
          key={item.id}
          id={item.id}
          title={item.title}
          imageUrl={item.imageUrl}
          index={i}
          kicker={i === 0 ? "Featured" : "Signature"}
          className="col-span-12 md:col-span-6 aspect-[4/5]"
        />
      ))}
      {rest.map((item, i) => {
        // 6 items → split evenly across one row on wide screens (2 cols each of 12).
        // If we have more or fewer items, fall back to 3-per-row (4 cols each).
        const isNarrow = rest.length === 6;
        const span = isNarrow ? "md:col-span-2" : "md:col-span-4";
        return (
          <CategoryCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            index={i + 2}
            compact={isNarrow}
            className={`col-span-6 ${span} aspect-[3/4]`}
          />
        );
      })}
    </motion.div>
  );
}
