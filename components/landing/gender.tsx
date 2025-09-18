"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type GenderSectionProps = {
  gender: "WOMEN" | "MEN";
  imageUrl: string;
  index: number;
  url: string;
};
type MobileGenderData = {
  gender: "WOMEN" | "MEN"
  imageUrl: string
  url: string
}

// Mobile-specific diagonal component
const MobileGenderSelection = ({ womenData, menData }: { womenData: MobileGenderData; menData: MobileGenderData }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<"WOMEN" | "MEN" | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, 200)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className={`relative w-full aspect-square max-w-md mx-auto transition-all duration-700 ease-out transform 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
        {/* Women section - top diagonal */}
        <Link href={womenData.url}>
          <div
            className={`absolute top-0 left-0 w-full h-full cursor-pointer transition-all duration-500 ease-out
              ${hoveredSection === "WOMEN" ? "z-20" : "z-10"}
              ${hoveredSection === "MEN" ? "opacity-0" : "opacity-100"}`}
            onMouseEnter={() => setHoveredSection("WOMEN")}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              clipPath:
                hoveredSection === "WOMEN"
                  ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                  : "polygon(0 0, 100% 0, 100% 100%, 0 0)",
            }}
          >
            <Image
              loading="lazy"
              fill
              src={womenData.imageUrl || "/placeholder.svg"}
              alt="Women fashion"
              className="object-cover transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-3xl font-bold text-white uppercase tracking-wider">{womenData.gender}</h2>
              <div className="h-0.5 w-16 bg-white mt-2 transition-all duration-500 ease-out"></div>
            </div>
          </div>
        </Link>

        {/* Men section - bottom diagonal */}
        <Link href={menData.url}>
          <div
            className={`absolute top-0 left-0 w-full h-full cursor-pointer transition-all duration-500 ease-out
              ${hoveredSection === "MEN" ? "z-20" : "z-10"}
              ${hoveredSection === "WOMEN" ? "opacity-0" : "opacity-100"}`}
            onMouseEnter={() => setHoveredSection("MEN")}
            onMouseLeave={() => setHoveredSection(null)}
            style={{
              clipPath:
                hoveredSection === "MEN"
                  ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                  : "polygon(0 0, 100% 100%, 0 100%, 0 0)",
            }}
          >
            <Image
              loading="lazy"
              fill
              src={menData.imageUrl || "/placeholder.svg"}
              alt="Men fashion"
              className="object-cover transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-3xl font-bold text-white uppercase tracking-wider">{menData.gender}</h2>
              <div className="h-0.5 w-16 bg-white mt-2 transition-all duration-500 ease-out"></div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

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
            <Image
             loading="lazy"
              fill
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
  const womenData = {
    gender: "WOMEN" as const,
    imageUrl: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/DSC03052.jpg?v=1753459437",
    url: "/collections/women-jewelry",
  }

  const menData = {
    gender: "MEN" as const,
    imageUrl: "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/dd_pool_table_shoot_photos-12.jpg?v=1753482614",
    url: "/collections/men-jewelry",
  }
  return (
    <div>
      <h2 className="text-6xl font-semibold text-center w-full mt-4 mb-9">
        Shop by Gender
      </h2>
            {/* Mobile view - diagonal layout */}
            <div className="block md:hidden px-4">
        <MobileGenderSelection womenData={womenData} menData={menData} />
      </div>
      <div className="hidden w-full lg:w-[80vw] mx-auto justify-center items-center md:flex flex-col md:flex-row space-y-6 md:space-y-0 px-4 md:px-0">
        <GenderSection
          gender="WOMEN"
          imageUrl="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/DSC03052.jpg?v=1753459437"
          index={0}
          url={'/collections/women-jewelry'}
        />
        <GenderSection
          gender="MEN"
          imageUrl="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/dd_pool_table_shoot_photos-12.jpg?v=1753482614"
          index={1}
          url={'/collections/men-jewelry'}
        />
      </div>
    </div>
  );
}
