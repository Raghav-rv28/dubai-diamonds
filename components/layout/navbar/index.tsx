import { CategoryMenu } from "@/components/landing/category-menu";
import { ModeToggle } from "@/components/theme-toggle";
import CartModal from "components/cart/modal";
import { getCollections } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME } = process.env;

export async function Navbar() {
  const diamondCategories = await getCollections(`title:"Diamond"`);
  return (
    <>
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu />
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <Image
                src={"https://cdn.shopify.com/s/files/1/0633/2714/2125/files/D_Diamond_Logo_White_Full.png?v=1747429316"}
                alt={"logo"}
                width={180}
                height={50}
                className="pt-2 pl-2"
              />
            </Link>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex justify-end md:w-1/3">
            <div className="mr-2 hidden md:block">
              <ModeToggle />
            </div>
            <CartModal />
          </div>
        </div>
      </nav>
      <div className="flex w-full items-center justify-center">
        <Suspense fallback={<SearchSkeleton />}>
          <CategoryMenu diamondCategories={diamondCategories} />
        </Suspense>
      </div>
      <hr />
    </>
  );
}
