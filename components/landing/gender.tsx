import Image from 'next/image';
import Link from 'next/link';
import { JSX, SVGProps } from 'react';

export default function Gender() {
  return (
    <div className=" text-black dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
          Shop By Gender
        </h2>
        <p className="mt-2 text-center text-sm text-black dark:text-white lg:text-base">
          First-class jewelry for first-class Men, Women & Children.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <div className="h-1 w-16 bg-accent" />
          <FlowerIcon className="mx-4 text-accent" />
          <div className="h-1 w-16 bg-accent" />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <div className="group relative">
            <Image
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 66vw,(max-width: 1500px) 100vw"
              alt="Men"
              className="mx-auto h-96 w-full object-cover group-hover:blur-md"
              height="384"
              src="https://cdn.shopify.com/s/files/1/0736/0882/3069/files/mens_chain.jpg?v=1685306712"
              style={{
                aspectRatio: '255/384',
                objectFit: 'cover'
              }}
              width="255"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <h3 className="mt-4 text-2xl font-medium text-black dark:text-white">Men</h3>
              <p className="mt-2">
                <Link className="text-primary hover:text-secondary" href="#">
                  Explore More
                </Link>
              </p>
            </div>
          </div>
          <div className="group relative">
            <Image
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 66vw,(max-width: 1500px) 100vw"
              alt="Kids"
              className="mx-auto h-96 w-full object-cover group-hover:blur-md"
              height="384"
              src="https://cdn.shopify.com/s/files/1/0633/2714/2125/products/1.1_5029d896-4ba8-40b5-b761-8daf266cd56d.jpg?v=1664056424"
              style={{
                aspectRatio: '255/384',
                objectFit: 'cover'
              }}
              width="255"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <h3 className="mt-4 text-2xl font-medium text-black dark:text-white">Kids</h3>
              <p className="mt-2">
                <Link className="text-primary hover:text-secondary" href="#">
                  Explore More
                </Link>
              </p>
            </div>
          </div>
          <div className="group relative">
            <Image
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 66vw,(max-width: 1500px) 100vw"
              alt="Women"
              className="mx-auto h-96 w-full object-cover group-hover:blur-md"
              height="384"
              src="https://cdn.shopify.com/s/files/1/0736/0882/3069/files/Screen_Shot_2024-01-20_at_5.09.59_PM.png?v=1705788616"
              style={{
                aspectRatio: '255/384',
                objectFit: 'cover'
              }}
              width="255"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <h3 className="mt-4 text-2xl font-medium text-black dark:text-white">Women</h3>
              <p className="mt-2">
                <Link className="text-primary hover:text-secondary" href="#">
                  Explore More
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowerIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15" />
      <circle cx="12" cy="12" r="3" />
      <path d="m8 16 1.5-1.5" />
      <path d="M14.5 9.5 16 8" />
      <path d="m8 8 1.5 1.5" />
      <path d="M14.5 14.5 16 16" />
    </svg>
  );
}
