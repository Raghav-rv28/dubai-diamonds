import { getCollectionProducts } from "lib/shopify";
import Link from "next/link";
import { GridTileImage } from "../grid/tile";

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({
    collection: "trendy-modern",
  });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <>
      <h2 className="text-6xl font-semibold text-center w-full">
        New Arrivals
      </h2>
      <div className="w-full overflow-x-auto pb-6 pt-1">
        <ul className="flex animate-carousel gap-4">
          {carouselProducts.filter(p => p.featuredImage !== null).map((product, i) => (
            <li
              key={`${product.handle}${i}`}
              className="mx-2 aspect-square w-full max-w-[300px] flex-none"
            >
              <Link
                href={`/products/${product.handle}`}
                className="relative h-full w-full"
              >
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode:
                      product.priceRange.maxVariantPrice.currencyCode,
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
