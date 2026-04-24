import { SectionHeader } from "@/components/ui/divider";
import { getCollectionProducts } from "lib/shopify";
import Link from "next/link";
import CarouselClient from "./carousel-client";

export async function Carousel() {
  const products = await getCollectionProducts({
    collection: "trendy-modern",
  });

  if (!products?.length) return null;

  const visible = products.filter((p) => p.featuredImage !== null);
  if (!visible.length) return null;

  // Triplicate for seamless loop.
  const items = [...visible, ...visible, ...visible].map((p) => ({
    handle: p.handle,
    title: p.title,
    amount: p.priceRange.maxVariantPrice.amount,
    currencyCode: p.priceRange.maxVariantPrice.currencyCode,
    imageUrl: p.featuredImage!.url,
  }));

  return (
    <section className="w-full py-16 md:py-24">
      <div className="px-4 md:px-8 mb-10 md:mb-14">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Just In"
            title="New"
            titleItalic="arrivals."
            align="left"
          />
          <Link
            href="/collections/trendy-modern"
            className="group hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-champagne transition-colors"
          >
            <span className="relative">
              View all
              <span className="absolute -bottom-1 left-0 h-px w-full bg-champagne origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </span>
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <CarouselClient products={items} />
    </section>
  );
}
