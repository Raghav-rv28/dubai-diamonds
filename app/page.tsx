import About from "@/components/landing/about";
import Gender from "@/components/landing/gender";
import HeroSection from "@/components/landing/hero-section";
import PopularCategories from "@/components/landing/popular-categories";
import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer-two";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
      <main className="flex flex-col gap-8 md:gap-12">
        <HeroSection />
        <PopularCategories />
        <Gender />
        <About />
      </main>
      <Footer />
    </>
  );
}
