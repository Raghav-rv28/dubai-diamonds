// Hero section with large jewelry image, title, and CTA
import { Button } from "components/ui/button";

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-12 md:py-20 bg-white dark:bg-neutral-900">
      <img
        src="/hero-jewelry.jpg"
        alt="Featured Jewelry"
        className="w-40 h-40 md:w-64 md:h-64 object-cover rounded-full shadow-lg mb-6"
      />
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">Discover Timeless Elegance</h1>
      <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-6 text-center max-w-xl">
        Explore our curated collection of fine jewelry, crafted to perfection for every occasion.
      </p>
      <Button size="lg" className="px-8">Shop New Arrivals</Button>
    </section>
  );
}
