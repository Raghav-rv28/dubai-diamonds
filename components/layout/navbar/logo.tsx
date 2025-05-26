'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Option 1: Render nothing until theme is known
    return (
      <div style={{ width: 180, height: 50 }} className="pt-2 pl-2" />
    );

    // Option 2 (alternative): Render default logo
    // return (
    //   <Image
    //     src="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/D_Diamond_Logo_Full.png?v=1747429316"
    //     alt="logo"
    //     width={180}
    //     height={50}
    //     className="pt-2 pl-2"
    //   />
    // );
  }

  const logoUrl =
    theme === 'dark'
      ? 'https://cdn.shopify.com/s/files/1/0633/2714/2125/files/D_Diamond_Logo_White_Full.png?v=1747429316'
      : 'https://cdn.shopify.com/s/files/1/0633/2714/2125/files/D_Diamond_Logo_Full.png?v=1748277831';

  return (
    <Image
      src={logoUrl}
      alt="logo"
      width={180}
      height={50}
      className="pt-2 pl-2"
    />
  );
}
