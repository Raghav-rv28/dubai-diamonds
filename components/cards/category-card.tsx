"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type CategoryCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  index: number;
};

export default function CategoryCard({ id, title, imageUrl, index }: CategoryCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [index]);

  return (
    <Link href={`/collections/${id}`}>
      <div
        ref={cardRef}
        className={`group bg-white min-h-[300px] overflow-hidden shadow-lg transform transition-all duration-500 rounded-xl sm:rounded-none ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative h-64 w-full overflow-hidden sm:h-72 md:h-96">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            priority={index < 4}
            className="object-cover md:transition-transform md:duration-500 md:group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/10 sm:bg-sky-400/20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 z-10">
            <div className="w-full flex justify-center">
              <span className="inline-flex flex-col items-center">
                <span className="text-white text-lg font-semibold text-center line-clamp-2">{title}</span>
                <span className="hidden md:block mt-2 h-0.5 bg-white w-full transform md:origin-center md:scale-x-0 md:group-hover:scale-x-100 md:transition-transform md:duration-300" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}