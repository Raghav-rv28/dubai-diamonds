"use client";

import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bed, DollarSign, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  icon: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    shadow: string;
  };
}

export type MobileCardStackProps = {
  items: Array<{
    id: string;
    title: string;
    imageUrl: string;
    description: string;
  }>;
};

// Single-color theme for the whole stack
const CARD_BG = "#0b1522"; // deep slate blue
const CARD_TEXT = "#ffffff";
const CARD_SHADOW = "rgba(0,0,0,0.35)";

const ICON_OPTIONS = ["bed", "users", "dollar", "arrowUpRight"] as const;

export default function MobileCardStack({ items }: MobileCardStackProps) {
  console.log("MobileCardStack received items:", items);
  console.log("MobileCardStack items length:", items?.length);

  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Transform items into CardData format
  useEffect(() => {
    if (!items || items.length === 0) {
      setLoading(false);
      return;
    }

    const transformedCards: CardData[] = items.map((item, index) => ({
      id: item.id,
      title: item.title.toUpperCase(),
      subtitle: `Premium ${item.title}`,
      description: `${item.description.slice(0,100)}...`,
      imageUrl: item.imageUrl,
      icon: ICON_OPTIONS[index % ICON_OPTIONS.length] ?? "",
      colors: {
        primary: CARD_BG,
        secondary: "#1a2332",
        text: CARD_TEXT,
        shadow: CARD_SHADOW,
      },
    }));

    setCards(transformedCards);
    setLoading(false);
  }, [items]);

  const removeCard = (id: string) => {
    console.log("Removing card:", id);
    // Move to the next card in the circular array
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  // Get the visible cards based on current index (circular)
  const getVisibleCards = () => {
    if (cards.length === 0) return [];
    
    const visible = [];
    for (let i = 0; i < Math.min(3, cards.length); i++) {
      const index = (currentIndex + i) % cards.length;
      if(cards[index]){
        visible.push(cards[index]);
          }
      }
    return visible;
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "bed":
        return <Bed className="h-5 w-5" />;
      case "users":
        return <Users className="h-5 w-5" />;
      case "dollar":
        return <DollarSign className="h-5 w-5" />;
      case "arrowUpRight":
      default:
        return <ArrowUpRight className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="text-white">Loading cards...</div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    console.log("No items provided to MobileCardStack");
    return (
      <div className="p-4 text-center text-white bg-red-500">
        <p>No cards available</p>
        <p>Items: {JSON.stringify(items)}</p>
      </div>
    );
  }

  const visible = getVisibleCards();
  console.log("Visible cards:", visible);
  console.log("Visible cards length:", visible.length);
  console.log("Current index:", currentIndex);

  return (
    <div className="relative w-full px-4">
      <div className="relative h-[600px] w-full">
        <AnimatePresence mode="popLayout">
          {visible.map((card, index) => (
            <Card
              key={`${card.id}-${currentIndex}-${index}`}
              card={card}
              index={index}
              removeCard={removeCard}
              getIconComponent={getIconComponent}
              totalCards={Math.min(cards.length, 3)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface CardProps {
  card: CardData;
  index: number;
  removeCard: (id: string) => void;
  getIconComponent: (iconName: string) => React.ReactElement;
  totalCards: number;
}

function Card({ card, index, removeCard, getIconComponent, totalCards }: CardProps) {
  const zIndex = totalCards - index;
  const yOffset = index * 30;
  const xOffset = index * 5;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100, x: xOffset }}
      animate={{
        opacity: 1,
        y: yOffset,
        x: xOffset,
        scale: 1 - index * 0.04,
        rotateZ: index * -3,
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 50,
        mass: 1,
      }}
      style={{
        zIndex: zIndex + 10,
        boxShadow: `0 ${10 + index * 5}px ${30 + index * 10}px ${card.colors.shadow}`,
        backgroundColor: card.colors.primary,
      }}
      className="absolute left-0 top-0 h-full w-full cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing"
      drag={index === 0 ? "x" : false}
      dragConstraints={{ left: -20, right: 20 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (index === 0) {
          const threshold = 100;
          if (Math.abs(info.offset.x) > threshold) {
            removeCard(card.id);
          }
        }
      }}
      whileDrag={{
        scale: 1.05,
        boxShadow: `0 ${15 + index * 5}px ${40 + index * 10}px ${card.colors.shadow}`,
      }}
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl"
        style={{ color: card.colors.text }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={card.imageUrl || "/placeholder.svg"}
            alt={card.title}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Arrow Up Right Badge - Top Right */}
        <div className="absolute top-10 right-10 z-20">
          <Badge asChild variant="outline" className="rounded-full bg-black/40 border-white/20 hover:bg-black/60 text-xl">
            <Link href={`/collections/${card.id}`} className="p-2 text-white">
              Open <ArrowUpRight className="h-16 w-16 font-xl text-white" />
            </Link>
          </Badge>
        </div>

        {/* Footer Overlay - Bottom 15% */}
        <div className="absolute text-center bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <div >
            <h2 className="text-4xl mb-10 font-bold text-white">{card.title}</h2>
            <h3 className="text-lg font-medium text-white/80">
              {card.description}
            </h3>
          </div>
        </div>

        {/* Drag indicator for the top card */}
        {index === 0 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <motion.div
              className="h-1 w-10 rounded-full"
              style={{ backgroundColor: `${card.colors.text}40` }}
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
} 