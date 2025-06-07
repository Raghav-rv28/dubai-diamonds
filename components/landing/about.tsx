import Image from 'next/image';
import Link from 'next/link';
export default function About() {
  return (
    <div className="flex w-full xl:px-20">
      <div className="flex flex-col justify-center text-black dark:text-white md:hidden">
        <div className="mx-auto max-w-7xl rounded-xl px-4 py-12 opacity-95 sm:px-6 md:w-1/2 lg:px-8">
          <div className="mt-12 text-center">
            <h2 className="text-5xl font-bold leading-tight">
              We built our business on great customer service
            </h2>
            <p className="text-md mb-8 mt-4 font-semibold">
            Our brand story: Since 2001, Dubai Jewellers has been a symbol of luxury, elegance, and craftsmanship.
            Our story began in the heart of Toronto&apos;s Gerrard Street with a vision to redefine what it means to feel confident, intelligent, and radiant through jewellery.
            From the very beginning, our commitment has been to offer more than just jewellery — we offer a legacy of design, authenticity, and enduring quality.
            </p>
            <Link
              href="/pages/about-us"
              className="rounded border border-secondary bg-transparent px-4 py-2 font-semibold text-primary hover:border-transparent hover:bg-accent hover:text-white"
            >
              Read More →
            </Link>
          </div>
        </div>
        <div className="flex w-full items-center justify-center bg-cover bg-center md:hidden">
          <Image
            src={"https://cdn.shopify.com/s/files/1/0633/2714/2125/files/intro_poster_2.1.jpg?v=1746114226"}
            alt={'banner'}
            width={1500}
            height={1000}
          />
        </div>
      </div>
      <div className="hidden w-full flex-col justify-center p-5 text-black dark:text-white md:flex md:w-1/2 md:p-20">
        <h2 className="text-2xl font-bold md:text-4xl lg:text-6xl">
          We built our business on great customer service
        </h2>
        <p className="mt-6 text-xl">
          Our brand story: Since 2001, Dubai Jewellers has been a symbol of luxury, elegance, and craftsmanship.
          Our story began in the heart of Toronto&apos;s Gerrard Street with a vision to redefine what it means to feel confident,
           intelligent, and radiant through jewellery. From the very beginning, our commitment has been to offer more than just jewellery
            — we offer a legacy of design, authenticity, and enduring quality.
        </p>
        <div className="mt-8">
          <Link
            href="/pages/about-us"
            className="mt-8 rounded border border-secondary bg-transparent px-4 py-2 font-semibold text-primary hover:border-transparent hover:bg-accent hover:text-white"
          >
            Read More →
          </Link>
        </div>
      </div>
      <div className="hidden w-1/2 justify-center md:flex">
        <Image
          src={"https://cdn.shopify.com/s/files/1/0633/2714/2125/files/intro_poster_2.1.jpg?v=1746114226"}
          alt={'banner'}
          width={736}
          height={1100}
        />
      </div>
    </div>
  );
}
