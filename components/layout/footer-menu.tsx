'use client';

import { MenuItem, ShopifyMenu } from '@/lib/shopify/types';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FooterMenuItem({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const [active, setActive] = useState(item.url.includes(pathname));

  useEffect(() => {
    setActive(item.url.includes(pathname));
  }, [pathname, item.url]);
  return (
    <li>
      <Link
        href={item.url}
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300',
          {
            'text-black dark:text-neutral-300': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: ShopifyMenu }) {
  if (menu.itemsCount === 0) return null;

  return (
    <nav>
      <ul>
        {menu.items.map((item: MenuItem) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
