import { Award, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  {
    icon: Award,
    label: "Since 2001",
    sub: "Two decades of craft",
  },
  {
    icon: Sparkles,
    label: "GIA Certified",
    sub: "Ethically sourced",
  },
  {
    icon: MapPin,
    label: "Toronto Atelier",
    sub: "By appointment",
  },
];

export default function About() {
  return (
    <section className="w-full px-4 md:px-8 py-16 md:py-28">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        {/* Text column */}
        <div className="md:col-span-7 flex flex-col gap-8">
          <span className="eyebrow">Our Story</span>

          <h2 className="display-lg text-foreground">
            We built our business on{" "}
            <em className="italic" style={{ color: "var(--champagne)" }}>
              great customer service
            </em>
            .
          </h2>

          <p className="text-base md:text-lg text-muted-foreground leading-[1.8] max-w-2xl [&::first-letter]:font-display [&::first-letter]:text-5xl md:[&::first-letter]:text-6xl [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:leading-none [&::first-letter]:text-foreground">
            Since 2001, Dubai Jewellers has been a symbol of luxury, elegance, and
            craftsmanship. Our story began in the heart of Toronto&apos;s Gerrard
            Street with a vision to redefine what it means to feel confident,
            intelligent, and radiant through jewellery. From the very beginning,
            our commitment has been to offer more than just jewellery — we offer
            a legacy of design, authenticity, and enduring quality.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 border-y border-champagne/20 py-6 md:py-8">
            {STATS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col gap-2">
                <Icon
                  className="h-4 w-4 md:h-5 md:w-5"
                  style={{ color: "var(--champagne)" }}
                  strokeWidth={1.5}
                />
                <span className="font-display text-lg md:text-xl leading-tight text-foreground">
                  {label}
                </span>
                <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {sub}
                </span>
              </div>
            ))}
          </div>

          <div>
            <Link
              href="/pages/about-us"
              className="group inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-foreground hover:text-champagne transition-colors duration-300"
            >
              <span className="relative">
                Read our story
                <span className="absolute -bottom-1 left-0 h-px w-full bg-champagne origin-left scale-x-100 group-hover:scale-x-100 transition-transform duration-500" />
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

        {/* Framed image */}
        <div className="md:col-span-5 relative">
          <div className="relative aspect-[3/4] w-full">
            {/* Offset champagne frame */}
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 border border-champagne/50"
              aria-hidden
            />
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/intro_poster_2.1.jpg?v=1746114226"
                alt="Dubai Diamonds heritage"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
