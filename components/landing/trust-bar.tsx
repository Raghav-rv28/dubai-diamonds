import { Divider } from "@/components/ui/divider";
import { Gem, MessageCircle, ShieldCheck, Truck } from "lucide-react";

const PILLARS = [
  {
    icon: Gem,
    title: "Conflict-Free Diamonds",
    sub: "Ethically sourced, GIA-certified",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    sub: "Backed by 20+ years of craft",
  },
  {
    icon: Truck,
    title: "Free Canadian Shipping",
    sub: "Insured & tracked, every piece",
  },
  {
    icon: MessageCircle,
    title: "Personal Consultation",
    sub: "One-on-one with our atelier",
  },
];

export default function TrustBar() {
  return (
    <section className="w-full px-4 md:px-8 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <Divider width="full" withGlyph className="mb-10 md:mb-14" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {PILLARS.map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-3"
            >
              <Icon
                className="h-5 w-5 md:h-6 md:w-6"
                style={{ color: "var(--champagne)" }}
                strokeWidth={1.3}
              />
              <h3 className="font-display text-sm md:text-base leading-tight text-foreground">
                {title}
              </h3>
              <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-muted-foreground max-w-[14ch] md:max-w-[18ch]">
                {sub}
              </p>
            </div>
          ))}
        </div>

        <Divider width="full" withGlyph className="mt-10 md:mt-14" />
      </div>
    </section>
  );
}
