'use client';

import { ModeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuItem, ShopifyMenu } from '@/lib/shopify/types';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import Search, { SearchSkeleton } from './search';

export default function MobileMenu({ menu }: { menu: ShopifyMenu | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* Mobile menu trigger button */}
        <SheetTrigger asChild>
          <button
            onClick={openMobileMenu}
            aria-label="Open mobile menu"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
          >
            <Bars3Icon className="h-4" />
          </button>
        </SheetTrigger>

        {/* Sheet content for the mobile menu */}
        <SheetContent side="left" className="w-[250px] sm:w-[300px] bg-white dark:bg-black p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ModeToggle />
            </div>
          </div>

          {/* Search section */}
          <div className="mb-4 w-full">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>

          {/* Mobile Menu Content */}
          <MobileMenuContent menu={menu} />
        </SheetContent>
      </Sheet>
    </>
  );
}

function MobileDropdown({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-2">
        <Link href={item.url} className="text-base font-medium hover:underline">
          {item.title}
        </Link>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="ml-2"
          aria-label="Toggle submenu"
        >
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {open && item.items?.length > 0 && (
        <div className="pl-4">
          {item.items.map((subItem) =>
            subItem?.items?.length > 0 ? (
              <MobileDropdown key={`subItem.id-${subItem.id}`} item={subItem} />
            ) : (
              <Link
                key={subItem.id}
                href={subItem.url}
                className="block py-1 text-sm text-muted-foreground hover:text-foreground"
              >
                {subItem.title}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

export function MobileMenuContent({ menu }: { menu: ShopifyMenu | undefined }) {
  if (!menu) return null;

  return (
    <div className="w-full">
      <div className="space-y-2">
        {menu.items.map((item) =>
          item.items.length > 0 ? (
            <MobileDropdown key={item.id} item={item} />
          ) : (
            <Link
              key={item.id}
              href={item.url}
              className="block py-2 text-base text-foreground hover:underline"
            >
              {item.title}
            </Link>
          )
        )}
      </div>
    </div>
  );
}