import { search } from "@/lib/shopify";
import { ProductFilter } from "@/lib/shopify/types";
import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue, available, tag, ringSize } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  console.log("Ring size:", ringSize)
  const productFilters: ProductFilter[] = [];
  if (tag) {
    productFilters.push({
      tag,
    });
  }
  if (ringSize) {
    productFilters.push({
      productMetafield: {
        namespace: "shopify",
        key: "ring-size",
        value: ringSize,
      },
    });
  }
  // if (available === "true") {
  //   productFilters.push({
  //     available: true,
  //     productMetafield: {
  //       namespace: "custom",
  //       key: "diamond_cut_final_test",
  //       value: "baguette",
  //     }
  //    });
  // } else {
  //   productFilters.push({
  //     productMetafield: {
  //       namespace: "custom",
  //       key: "diamond_cut_final_test",
  //       value: "baguette",
  //     }
  //   });
  // }
  console.log(productFilters);
  const products = await search(searchValue || "", reverse, sortKey,productFilters);
  const resultsText = products.length > 1 ? "results" : "result";
  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? "There are no products that match "
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
