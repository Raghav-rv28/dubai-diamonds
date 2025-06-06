import { ModeToggle } from "@/components/theme-toggle";
import CartModal from "components/cart/modal";
import { getMenu } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import DashingMenu from "./dashing-menu";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";


export async function Navbar() {
  const menu = await getMenu("main-menu1")
  return (
    <>
      <nav className="relative flex items-center justify-between p-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu}/>
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              prefetch={true}
             className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
            <Logo/>
            </Link>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex gap-1 items-center justify-end md:w-1/3">
            <div className="mr-2 hidden md:block">
              <ModeToggle />
            </div>
            <CartModal />
          </div>
        </div>
      </nav>
      <div className="hidden md:flex w-full items-center justify-center">
        <Suspense fallback={<SearchSkeleton />}>
          {/* {menu && <ShopifyMenuBar menu={menu} />} */}
          {menu && <DashingMenu menu={menu} />}
        </Suspense>
      </div>
      <hr />
    </>
  );
}
