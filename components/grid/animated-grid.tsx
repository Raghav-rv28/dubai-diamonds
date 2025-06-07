"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type CardProps = {
  id: string;
  title: string;
  imageUrl: string;
  index: number;
};

const Card = ({ title, imageUrl, index, id }: CardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // Delay based on index for staggered animation
          setTimeout(() => {
            setIsVisible(true);
          }, index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <Link href={`/collections/${id}`}>
      <div
        ref={cardRef}
        className={`bg-white min-h-[300px] rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <p className="text-lg text-center font-semibold text-gray-800 line-clamp-2">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};

type AnimatedGridProps = {
  items: Array<{
    id: string;
    title: string;
    imageUrl: string;
  }>;
};

export default function AnimatedGrid({ items }: AnimatedGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 p-4">
      {items.map((item, index) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.title}
          imageUrl={item.imageUrl}
          index={index}
        />
      ))}
    </div>
  );
}
