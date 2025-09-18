"use client";

import CategoryCard from "../cards/category-card";
// import MobileCardStack from "./mobile-card-stack";


type AnimatedGridProps = {
  items: Array<{
    id: string;
    title: string;
    imageUrl: string;
  }>;
};

export default function AnimatedGrid({ items }: AnimatedGridProps) {
  return (
    <>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4">
        {items.map((item, index) => (
          <CategoryCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
