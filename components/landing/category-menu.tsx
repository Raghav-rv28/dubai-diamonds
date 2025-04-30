'use client';

import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { clsx } from 'clsx';
import { Collection } from 'lib/shopify/types';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '../ui/navigation-menu';

export function CategoryMenu({
  diamondCategories
}: {
  diamondCategories: Collection[];
}) {
  return (
    <NavigationMenu className='my-2'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Diamond</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-3 p-4 md:w-[800px] md:grid-cols-2 lg:w-[900px] ">
              {diamondCategories.map((component) => {
                if (component.title === 'All') return;
                return (
                  <ListItem
                    key={component.title}
                    className=""
                    title={component.title}
                    href={component.path}
                  >
                    {component.description}
                  </ListItem>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/search/new-arrivals" legacyBehavior passHref>
            <NavigationMenuLink className={clsx(navigationMenuTriggerStyle(), 'bg-transparent')}>
              New Arrivals
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            title={title}
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
