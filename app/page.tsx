import About from "@/components/landing/about";
import Blogs from "@/components/landing/blogs";
import CanvasHeroSection from "@/components/landing/canvas-hero-section";
import { Carousel } from "@/components/landing/carousel";
import DiamondCuts from "@/components/landing/diamond-cuts";
import Gender from "@/components/landing/gender";
import PopularCategories from "@/components/landing/popular-categories";
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
      <main className="flex flex-col gap-8 md:gap-12">
        <CanvasHeroSection />
        <PopularCategories />
        <DiamondCuts />
        {/** Carousel is a collection shower, show new-arrivals or trending stuff */}
        <Carousel />
        <Blogs />
        <Gender />
        <About />
      </main>
      <Footer />
    </>
  );
}
