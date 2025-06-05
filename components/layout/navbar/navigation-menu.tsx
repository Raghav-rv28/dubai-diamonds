"use client"

import Link from "next/link"
import type * as React from "react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { MenuItem as MenuItemShopify, ShopifyMenu } from "@/lib/shopify/types"
import { cn } from "@/lib/utils"

interface ShopifyMenuBarProps {
  menu: ShopifyMenu
  className?: string
}

interface MenuItemProps {
  item: MenuItemShopify
  level: number
}
const approvedCuts = ['round', 'princess', 'pear', 'emerald', 'marqiuse', 'oval', 'radiant', 'cushion'];

const MenuItem: React.FC<MenuItemProps> = ({ item, level }) => {
  const hasChildren = item.items && item.items.length > 0
  const isMaxLevel = level >= 3

  // If no children or max level reached, render as simple link
  if (!hasChildren || isMaxLevel) {
    return (
      <NavigationMenuItem>
        <Link
          href={item.url}
          className={cn(
            "text-sm font-medium transition-colors hover:text-foreground/80",
            level === 1 ? "px-4 py-2 flex items-center" : "px-3 py-2 block w-full",
            level > 1 && "hover:bg-accent hover:text-accent-foreground rounded-md",
          )}
          target={item.target}
        >
          {/* {approvedCuts.includes(item.title.toLowerCase()) && (
            <Image src={`/svg-cuts/${item.title.toLowerCase()}.svg`} alt={item.title} width={20} height={20} />
          )} */}
          {item.title}
        </Link>
      </NavigationMenuItem>
    )
  }

  // Render with dropdown for children
  return (
    <NavigationMenuItem>
      {level === 1 ? (
        // Top level items with children - simple text with dropdown
        <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent px-4 py-2 h-auto text-sm font-medium transition-colors hover:text-foreground/80 data-[state=open]:text-foreground/80">
          {item.title}
        </NavigationMenuTrigger>
      ) : (
        // Lower level items with children
        <NavigationMenuTrigger
          className={cn(
            "h-auto w-full justify-start rounded-md px-3 py-2 text-left",
            "hover:bg-accent hover:text-accent-foreground",
          )}
        >
          <span className="flex items-center gap-1">
            {item.title}
          </span>
        </NavigationMenuTrigger>
      )}
      <NavigationMenuContent className="dark:bg-popover dark:border-border">
        <div
          className={cn(
            "grid gap-3 p-4",
            level === 1 && "w-[400px] grid-cols-2",
            level === 2 && "w-[300px] grid-cols-1",
            level === 3 && "w-[250px] grid-cols-1",
          )}
        >
          {item.items.map((childItem) => (
            <SubMenuItem key={childItem.id} item={childItem} level={level + 1} />
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const SubMenuItem: React.FC<MenuItemProps> = ({ item, level }) => {
  const hasChildren = item.items && item.items.length > 0 && level < 3

  if (!hasChildren) {
    return (
      <Link
        href={item.url}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          "dark:hover:bg-accent dark:hover:text-accent-foreground dark:focus:bg-accent dark:focus:text-accent-foreground",
          level === 2 && "p-2",
        )}
        target={item.target}
      >
        {/* {approvedCuts.includes(item.title.toLowerCase()) && (
          <Image src={`/svg-cuts/${item.title.toLowerCase()}.svg`} alt={item.title} width={20} height={20} />
        )} */}
        <div className="text-sm font-medium leading-none">{item.title}</div>
      </Link>
    )
  }

  return (
    <div className="space-y-2">
      <Link
        href={item.url}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground dark:focus:bg-accent dark:focus:text-accent-foreground"
        target={item.target}
      >
        <div className="text-sm font-medium leading-none">{item.title}</div>
      </Link>
      <div className="ml-4 space-y-1 border-l border-border pl-4 dark:border-border">
        {item.items.map((grandChild) => (
          <Link
            key={grandChild.id}
            href={grandChild.url}
            className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground dark:focus:bg-accent dark:focus:text-accent-foreground"
            target={grandChild.target}
          >
            {grandChild.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export const ShopifyMenuBar: React.FC<ShopifyMenuBarProps> = ({ menu, className }) => {
  return (
    <NavigationMenu className={cn("mx-0", className)}>
      <NavigationMenuList className="space-x-2">
        {menu.items.map((item) => (
          <MenuItem key={item.id} item={item} level={1} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
