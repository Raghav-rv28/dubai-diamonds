import About from "@/components/landing/about";
import Blogs from "@/components/landing/blogs";
import CanvasHeroSection from "@/components/landing/canvas-hero-section";
import { Carousel } from "@/components/landing/carousel";
import DiamondCuts from "@/components/landing/diamond-cuts";
import Gender from "@/components/landing/gender";
import PopularCategories from "@/components/landing/popular-categories";

export const metadata = {
  title: "Dubai Diamonds | Fine Jewelry in Toronto",
  description:
    "Discover exquisite fine jewelry at Dubai Diamonds, your premier destination in Toronto for gold necklaces, engagement rings, and luxury diamond pieces.",
  openGraph: {
    title: "Dubai Diamonds | Fine Jewelry in Toronto",
    description:
      "Shop premium diamond and gold jewelry at Dubai Diamonds. Based in Toronto, we offer timeless elegance and craftsmanship in every piece.",
    url: "https://dubaidiamonds.ca", 
    type: "website",
    locale: "en_CA",
    siteName: "Dubai Diamonds",
    images: [
      {
        url: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/D_Diamond_Logo_White_Full.png?v=1747429316", 
        width: 1200,
        height: 630,
        alt: "Dubai Diamonds - Elegant Gold and Diamond Jewelry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Diamonds | Fine Jewelry in Toronto",
    description:
      "Luxury jewelry shop in Toronto. Explore handcrafted diamond rings, gold chains, and custom pieces at Dubai Diamonds.",
    images: ["https://cdn.shopify.com/s/files/1/0633/2714/2125/files/D_Diamond_Logo_White_Full.png?v=1747429316"], 
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
        <Blogs first={4} />
        <Gender />
        <About />
      </main>
    </>
  );
}
