"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type GenderSectionProps = {
  gender: "women" | "men";
  imageUrl: string;
  index: number;
};

const GenderSection = ({ gender, imageUrl, index }: GenderSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // Delay based on index for staggered animation
          setTimeout(() => {
            setIsVisible(true);
          }, index * 200);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [index]);

  return (
    <div
      ref={sectionRef}
      className={`relative w-full transition-all duration-700 ease-out transform 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
    >
      <Link href={`/products/${gender}`}>
        <div className="group relative overflow-hidden shadow-xl cursor-pointer">
          {/* Image container with 3D hover effect on desktop only */}
          <div
            className="relative h-[70vh] sm:h-[80vh] w-full overflow-hidden 
            transition-all duration-500 ease-out
            md:group-hover:scale-[1.02] md:transform-gpu md:perspective-[1000px]"
          >
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={`${gender} fashion`}
              fill
              className="object-cover transition-transform duration-700 ease-out
                md:group-hover:scale-105 md:transform-gpu"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 transition-opacity duration-500 md:group-hover:opacity-60"></div>

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 ease-out md:group-hover:translate-y-[-8px]">
              <h2 className="text-3xl sm:text-4xl font-bold text-white capitalize tracking-wider">
                {gender}
              </h2>
              <div className="h-1 w-0 bg-white mt-2 transition-all duration-500 ease-out md:group-hover:w-24"></div>
            </div>
          </div>

          {/* 3D effect elements - desktop only */}
          <div
            className="hidden md:block absolute inset-0 transform-gpu transition-all duration-700 ease-out 
            opacity-0 group-hover:opacity-100 pointer-events-none"
          >
            <div
              className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent 
              transform rotate-12 translate-y-[-20%] translate-x-[-10%] scale-150"
            ></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function GenderSelection() {
  return (
    <div>
      <h2 className="text-6xl font-semibold text-center w-full mt-4 mb-9">
        Shop by Gender
      </h2>
      <div className="w-full lg:w-[80vw] mx-auto justify-center items-center flex flex-col md:flex-row space-y-6 md:space-y-0 px-4 md:px-0">
        <GenderSection
          gender="women"
          imageUrl="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/1a46fbf59aefc3cef254ed9a7b2f0b1c.jpg?v=1746067360"
          index={0}
        />
        <GenderSection
          gender="men"
          imageUrl="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/9371211f25c5e373debd51ab43c79151.jpg?v=1746048302"
          index={1}
        />
      </div>
    </div>
  );
}
