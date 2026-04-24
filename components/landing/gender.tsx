"use client";

import { SectionHeader } from "@/components/ui/divider";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type GenderSectionProps = {
  gender: "Women" | "Men";
  eyebrow: string;
  description: string;
  imageUrl: string;
  url: string;
};

const GenderSection = ({
  gender,
  eyebrow,
  description,
  imageUrl,
  url,
}: GenderSectionProps) => {
  return (
    <motion.div variants={fadeUp} className="relative w-full">
      <Link href={url}>
        <div className="group relative overflow-hidden cursor-pointer">
          <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden">
            <Image
              loading="lazy"
              fill
              src={imageUrl || "/placeholder.svg"}
              alt={`${gender} fine jewellery`}
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.8,.2,1)] md:group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Editorial ink gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Champagne frame on hover */}
            <div className="pointer-events-none absolute inset-4 border border-champagne/0 transition-[border-color,inset] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] md:group-hover:border-champagne/40 md:group-hover:inset-6" />

            {/* Bottom-left editorial block */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div className="flex flex-col gap-3 max-w-sm">
                <span
                  className="eyebrow"
                  style={{
                    color: "color-mix(in oklch, var(--champagne) 90%, white)",
                  }}
                >
                  {eyebrow}
                </span>
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95]">
                  {gender}
                </h3>
                <p className="text-sm md:text-base text-white/70 max-w-[22rem] leading-relaxed">
                  {description}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-white/90 md:opacity-80 md:group-hover:opacity-100 transition-opacity">
                  <span className="block h-px w-6 bg-champagne transition-[width] duration-500 md:group-hover:w-10" />
                  Shop collection
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function GenderSelection() {
  return (
    <section className="w-full px-4 md:px-8 py-16 md:py-24">
      <SectionHeader
        eyebrow="Made for You"
        title="Shop by"
        titleItalic="gender."
        description="Two worlds, one craft. Explore pieces shaped for every personality."
        className="mb-10 md:mb-14"
      />

      <motion.div
        variants={staggerContainer(0.18)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="w-full lg:w-[88vw] xl:max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6"
      >
        <GenderSection
          gender="Women"
          eyebrow="The Feminine"
          description="Timeless silhouettes and statement pieces for every chapter of her story."
          imageUrl="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/DSC03052.jpg?v=1753459437"
          url="/collections/women-jewelry"
        />
        <GenderSection
          gender="Men"
          eyebrow="The Modern Man"
          description="Bold bands, refined chains, and heirloom watches made to be worn every day."
          imageUrl="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/dd_pool_table_shoot_photos-12.jpg?v=1753482614"
          url="/collections/men-jewelry"
        />
      </motion.div>
    </section>
  );
}
