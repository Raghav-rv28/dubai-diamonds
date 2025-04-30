import Image from 'next/image';
import Link from 'next/link';
export default function About() {
  return (
    <div className="flex w-full">
      <div className="flex flex-col justify-center text-black dark:text-white md:hidden">
        <div className="mx-auto max-w-7xl rounded-xl px-4 py-12 opacity-95 sm:px-6 md:w-1/2 lg:px-8">
          <div className="mt-12 text-center">
            <h1 className="text-5xl font-bold leading-tight">
              We built our business on great customer service
            </h1>
            <p className="text-md mb-8 mt-4 font-semibold">
              Jewellery is the pride of all women and at Dubai Jewelers we give you the opportunity
              to explore the world of jewelry. Since the times of kings and queens, jewelry was
              considered sacred and was always the center of attraction for them. With passage of
              time only the designs have changed but the importance of jewelry remained the same. To
              get the wide variety of jewelries, come to us, we have a vast collection which is
              bound to please you. Be it a gold chain, necklace, earring, wedding bangles in
              Toronto, Canada or even the birthstones, we have everything that you need. Named as
              Dubai Jewelers, we promise to bring you the raw gold exclusively available in Dubai.
              Gold from Dubai is popular worldwide and we are here to sell you the best jewellery in
              Brampton, Visit our Jewellery store in GTA Now.
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
            src={"https://cdn.shopify.com/s/files/1/0736/0882/3069/files/banner.jpg?v=1684516416')"}
            alt={'banner'}
            width={1500}
            height={1000}
          />
        </div>
      </div>
      <div className="hidden w-full flex-col justify-center p-5 text-black dark:text-white md:flex md:w-1/2 md:p-20">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-6xl">
          We built our business on great customer service
        </h1>
        <p className="mt-6 text-xl">
          Jewellery is the pride of all women and at Dubai Jewelers we give you the opportunity to
          explore the world of jewelry. Since the times of kings and queens, jewelry was considered
          sacred and was always the center of attraction for them. With passage of time only the
          designs have changed but the importance of jewelry remained the same. To get the wide
          variety of jewelries, come to us, we have a vast collection which is bound to please you.
          Be it a gold chain, necklace, earring, wedding bangles in Toronto, Canada or even the
          birthstones, we have everything that you need. Named as Dubai Jewelers, we promise to
          bring you the raw gold exclusively available in Dubai. Gold from Dubai is popular
          worldwide and we are here to sell you the best jewellery in Brampton, Visit our Jewellery
          store in GTA Now.
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
      <div className="hidden w-1/2 bg-cover bg-center md:flex">
        <Image
          src={"https://cdn.shopify.com/s/files/1/0736/0882/3069/files/banner.jpg?v=1684516416')"}
          alt={'banner'}
          width={1500}
          height={1000}
        />
      </div>
    </div>
  );
}
