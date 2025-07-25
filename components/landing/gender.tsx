"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type GenderSectionProps = {
  gender: "WOMEN" | "MEN";
  imageUrl: string;
  index: number;
  url: string;
};


const GenderSection = ({ gender, imageUrl, index, url }: GenderSectionProps) => {
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
      <Link href={url}>
        <div className="group relative overflow-hidden shadow-xl cursor-pointer">
          {/* Image container with 3D hover effect on desktop only */}
          <div
            className="relative h-[80vh] sm:h-[80vh] w-full overflow-hidden 
            transition-all duration-500 ease-out
            md:group-hover:scale-[1.02] md:transform-gpu md:perspective-[1000px]"
          >
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`${gender} fashion`}
              className="object-cover transition-transform duration-700 ease-out
                md:group-hover:scale-105 md:transform-gpu"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 transition-opacity duration-500 md:group-hover:opacity-60"></div>

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 ease-out md:group-hover:translate-y-[-8px]">
              <h2 className="text-6xl font-bold text-white text-center uppercase tracking-wider">
                {gender}
              </h2>
              <div className="absolute left-1/2 translate-x-[-50%] bottom-0 h-1 w-24 bg-white 
                origin-center scale-x-0 transition-transform duration-500 ease-out 
                md:group-hover:scale-x-100 mb-2">
              </div>
              {/* <div className="h-1 w-0 bg-white mt-2 transition-all duration-500 ease-out md:group-hover:w-24"></div> */}
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
          gender="WOMEN"
          imageUrl="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/DSC03052.jpg?v=1753459437"
          index={0}
          url={'/collections/women-jewelry'}
        />
        <GenderSection
          gender="MEN"
          imageUrl="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/dd_pool_table_shoot_photos-06.jpg?v=1753459582"
          index={1}
          url={'/collections/men-jewelry'}
        />
      </div>
    </div>
  );
}
