"use client";

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
  }>;
};

// Single-color theme for the whole stack
const CARD_BG = "#0b1522"; // deep slate blue
const CARD_TEXT = "#ffffff";
const CARD_SHADOW = "rgba(0,0,0,0.35)";

export default function MobileCardStack({ items }: MobileCardStackProps) {
  console.log("MobileCardStack received items:", items);
  console.log("MobileCardStack items length:", items?.length);

  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  // Transform items into CardData format
  useEffect(() => {
    if (!items || items.length === 0) {
      setLoading(false);
      return;
    }

    const transformedCards: CardData[] = items.map((item, index) => ({
      id: item.id,
      title: item.title.toUpperCase(),
      subtitle: "Premium Property",
      description: "Experience luxury living with world-class amenities and stunning views.",
      imageUrl: item.imageUrl,
      icon: (["bed", "users", "dollar", "arrowUpRight"] as const)[index % 4],
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
    setCards((prevCards) => {
      const newCards = prevCards.filter((card) => card.id !== id);
      const removedCard = prevCards.find((card) => card.id === id);
      
      if (removedCard && newCards.length > 0) {
        // Add the removed card to the end with updated properties
        const maxId = Math.max(...prevCards.map((card) => parseInt(card.id) || 0));
        const newCard: CardData = {
          ...removedCard,
          id: (maxId + 1).toString(),
          title: `NEW PROPERTY ${maxId + 1}`,
          description: "A newly discovered property with unique features and amenities.",
          icon: (["bed", "users", "dollar", "arrowUpRight"] as const)[Math.floor(Math.random() * 4)],
        };
        return [...newCards, newCard];
      }
      
      return newCards;
    });
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

  const visible = cards.slice(0, Math.min(3, cards.length));
  console.log("Visible cards:", visible);
  console.log("Visible cards length:", visible.length);

  return (
    <div className="relative w-full px-4">
      <div className="relative h-[600px] w-full">
        <div className="text-white bg-blue-500 p-2 mb-4">
          <p>Debug: {visible.length} cards to render</p>
        </div>

        <AnimatePresence mode="popLayout">
          {visible.map((card, index) => (
            <Card
              key={card.id}
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
      dragConstraints={{ left: -200, right: 200 }}
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
        {/* Card Header */}
        <div className="flex items-center justify-between p-4">
          <div className="rounded-full bg-white/20 p-2">
            {getIconComponent(card.icon)}
          </div>
          <Link href={`/collections/${card.id}`} className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors">
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Card Title */}
        <div className="px-4 py-2">
          <h2 className="text-3xl font-bold">{card.title}</h2>
          <h3 className="text-xl font-medium" style={{ color: `${card.colors.text}99` }}>
            {card.subtitle}
          </h3>
        </div>

        {/* Card Image */}
        <div className="mt-2 overflow-hidden px-4">
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={card.imageUrl || "/placeholder.svg"}
              alt={card.title}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-auto p-4">
          <div
            className="rounded-full px-3 py-1 text-sm"
            style={{
              backgroundColor: `${card.colors.text}20`,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <DollarSign className="h-4 w-4" />
            {card.subtitle}
          </div>
          <p className="mt-3 text-sm opacity-80">{card.description}</p>
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