"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Replace the carouselImages array with this enhanced version that includes content for each slide
const carouselSlides = [
  {
    image: {
      src: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/shoot_1_website_banner_insta_posts-01.png?v=1747421661",
      alt: "Luxury fashion collection",
    },
    content: {
      title: "Discover Our Exclusive Collection",
      description:
        "Elevate your style with our premium selection of fashion and accessories",
      buttonText: "Book a Consultation",
    },
  },
  {
    image: {
      src: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/shoot_1_website_banner_insta_posts-04.png?v=1747421661",
      alt: "Premium lifestyle products",
    },
    content: {
      title: "Elevate Your Everyday Style",
      description: "Curated pieces designed for the modern lifestyle",
      buttonText: "Book a Consultation",
    },
  },
  {
    image: {
      src: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/shoot_1_website_banner_insta_posts-03.png?v=1747421661",
      alt: "Exclusive designer items",
    },
    content: {
      title: "Luxury Redefined",
      description: "Experience the perfect blend of comfort and sophistication",
      buttonText: "Book a Consultation",
    },
  },
];

// Replace the entire HeroCarousel component with this updated version
export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [contentAnimating, setContentAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contentTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle automatic carousel rotation
  useEffect(() => {
    setIsLoaded(true);

    const nextSlide = () => {
      // First animate out the content
      setContentAnimating(true);

      contentTimeoutRef.current = setTimeout(() => {
        // Then start the image transition
        setAnimatingOut(true);

        // Wait for fade out animation to complete
        timeoutRef.current = setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
          setAnimatingOut(false);

          // Small delay before bringing in new content
          setTimeout(() => {
            setContentAnimating(false);
          }, 300);
        }, 600);
      }, 400);
    };

    const slideInterval = setInterval(nextSlide, 6000);

    return () => {
      clearInterval(slideInterval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (contentTimeoutRef.current) clearTimeout(contentTimeoutRef.current);
    };
  }, []);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;

    setContentAnimating(true);

    contentTimeoutRef.current = setTimeout(() => {
      setAnimatingOut(true);

      timeoutRef.current = setTimeout(() => {
        setCurrentSlide(index);
        setAnimatingOut(false);

        setTimeout(() => {
          setContentAnimating(false);
        }, 300);
      }, 600);
    }, 400);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {carouselSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index
                ? animatingOut
                  ? "opacity-0"
                  : "opacity-100"
                : "opacity-0"
            }`}
          >
            <Image
              src={slide.image.src || "/placeholder.svg"}
              alt={slide.image.alt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Call to Action Content */}
      <div className="relative h-full w-full flex items-center">
        <div
          className={`container mx-auto px-6 md:px-12 transition-all duration-1000 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="max-w-3xl overflow-hidden">
            <div
              className={`transition-all duration-500 transform ${
                contentAnimating
                  ? "opacity-0 -translate-y-8"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
              >
                {carouselSlides[currentSlide]?.content.title}
              </h1>
              <p
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
              >
                {carouselSlides[currentSlide]?.content.description}
              </p>
              <a
                href={"https://calendly.com/dubai-diamonds103/30min"}
                target="_blank"
                className="group bg-white max-w-[300px] text-black px-8 py-4 rounded-none font-medium text-lg flex items-center transform transition-all duration-300 hover:bg-black hover:text-white hover:translate-x-1"
              >
                {carouselSlides[currentSlide]?.content.buttonText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
