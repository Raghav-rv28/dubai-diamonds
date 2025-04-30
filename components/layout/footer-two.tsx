import FooterMenu from 'components/layout/footer-menu';
import { getMenu } from 'lib/shopify';
import { FacebookIcon, InstagramIcon, Link2, LocateIcon, MailIcon, PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Footer() {
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('footer');

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-5 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <Image
                src={
                  'https://cdn.shopify.com/s/files/1/0736/0882/3069/files/footer-logo.png?v=1681830146'
                }
                className="mb-5 ml-[-20px]"
                alt="Dubai Jewellers logo"
                width={150}
                height={53}
              />
              <p className="text-md mb-4 text-gray-600">
                At Dubai Jewellers, we are here to help you find the best jewelry and deals for you!
                We are here to create golden memories
              </p>
              <p className="mb-2 text-xl font-semibold uppercase text-gray-600">Follow Us</p>
              <div className="flex space-x-2">
                <Link href={'https://www.facebook.com/jewellersdubai'} target="_blank">
                  <FacebookIcon className="h-6 w-6 text-orange-300" />
                </Link>
                <Link href={'https://www.instagram.com/dubai.jewellers/'} target="_blank">
                  <InstagramIcon className="h-6 w-6 text-pink-500" />
                </Link>
                <Link href={'https://g.co/kgs/9YN3jQH'} target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 17.1875 10.9375 C 9.421875 10.9375 3.125 17.234375 3.125 25 C 3.125 32.765625 9.421875 39.0625 17.1875 39.0625 C 24.953125 39.0625 31.25 32.765625 31.25 25 C 31.25 24.035156 31.144531 23.09375 30.960938 22.1875 L 30.882813 21.875 L 17.1875 21.875 L 17.1875 26.5625 L 26.5625 26.5625 C 25.816406 30.996094 21.832031 34.375 17.1875 34.375 C 12.007813 34.375 7.8125 30.179688 7.8125 25 C 7.8125 19.820313 12.007813 15.625 17.1875 15.625 C 19.53125 15.625 21.667969 16.492188 23.3125 17.914063 L 26.671875 14.625 C 24.171875 12.335938 20.84375 10.9375 17.1875 10.9375 Z M 39.0625 17.1875 L 39.0625 21.875 L 34.375 21.875 L 34.375 25 L 39.0625 25 L 39.0625 29.6875 L 42.1875 29.6875 L 42.1875 25 L 46.875 25 L 46.875 21.875 L 42.1875 21.875 L 42.1875 17.1875 Z"></path>
                  </svg>
                </Link>
                <Link href={'https://www.yelp.ca/biz/dubai-jewellers-brampton'} target="_blank">
                  <Link2 className="h-6 w-6" />
                </Link>
              </div>
            </div>
            <div>
              <p className="mb-4 text-xl font-semibold uppercase text-gray-600">Contact Us</p>
              <div className="mb-2 text-sm text-gray-600">
                <LocateIcon className="mr-1 inline h-4 w-4" />
                2700 N Park Dr, Brampton, ON L6S 0E9
              </div>
              <div className="mb-2 text-sm text-gray-600">
                <MailIcon className="mr-1 inline h-4 w-4" />
                dubai_jewellers@yahoo.com
              </div>
              <div className="text-sm text-gray-600">
                <PhoneIcon className="mr-1 inline h-4 w-4" />
                +14164651200
              </div>
            </div>
            <div>
              <p className="mb-4 text-xl font-semibold uppercase text-gray-600">Information</p>
              <Suspense
                fallback={
                  <div className="flex h-[188px] w-[200px] flex-col gap-2">
                    <div className={skeleton} />
                    <div className={skeleton} />
                    <div className={skeleton} />
                    <div className={skeleton} />
                    <div className={skeleton} />
                    <div className={skeleton} />
                  </div>
                }
              >
                <FooterMenu menu={menu} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
