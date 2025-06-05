
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function DesignerInfo() {
  return (
    <section className="relative w-full">
      {/* Desktop Background Image */}
      <div className="hidden md:block">
        <Image
          src="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/dd_banner_for_design_your_dream_ring_1.png?v=1749156955"
          alt="Hero Background"
          width={2720}
          height={1000}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden">
        <Image
          src="https://cdn.shopify.com/s/files/1/0633/2714/2125/files/dd_banner_for_design_your_dream_ring_2.png?v=1749156955"
          alt="Hero Background Mobile"
          width={1000}
          height={1200}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Text Overlay for Desktop */}
      <div className="hidden md:flex absolute inset-0 items-center justify-end pr-16">
        <div className="max-w-md text-white space-y-4 bg-black/40 p-6 rounded-md">
          <h2 className="text-3xl font-semibold">Personalized consultation</h2>
          <p>
            A diamond expert will guide you through our latest collection or help you design a custom piece of fine jewelry.
          </p>
          <div className="space-y-2">
            <Link href={'https://calendly.com/dubaidiamonds103/30min'} className="border border-white px-4 py-2 w-full">Get in touch</Link>
          </div>
        </div>
      </div>

      {/* Text Below Image for Mobile */}
      <div className="md:hidden p-6 text-center space-y-4">
        <h2 className="text-2xl font-semibold">Personalized consultation</h2>
        <p>
          A diamond expert will guide you through our latest collection or help you design a custom piece of fine jewelry.
        </p>
        <div className="space-y-2">
          <Link href={'https://calendly.com/dubaidiamonds103/30min'} className="border border-black px-4 py-2 w-full">Get in touch</Link>
        </div>
      </div>
    </section>
  );
}
