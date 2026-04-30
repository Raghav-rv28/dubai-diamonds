import { InStockCheckbox } from "@/components/layout/search/filter/available";
import FilterList from "@/components/layout/search/filter";
import { LabNaturalCheckbox } from "@/components/layout/search/filter/lab-nat";
import ProductGridItems from "@/components/layout/product-grid-items";
import { ProductFilter } from "@/lib/shopify/types";
import { getCollection, getCollectionProducts } from "@/lib/shopify";
import Grid from "components/grid";
import { defaultSort, sorting } from "lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type CollectionSearchParams = {
  [key: string]: string | string[] | undefined;
};

function getFirstParam(
  searchParams: CollectionSearchParams | undefined,
  key: string,
) {
  const value = searchParams?.[key];
  return Array.isArray(value) ? value[0] : value;
}

function CollectionFilterControls() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs text-neutral-500 dark:text-neutral-400">
          Filters
        </h3>
        <Suspense fallback={null}>
          <InStockCheckbox />
          <LabNaturalCheckbox />
        </Suspense>
      </div>
      <FilterList list={sorting} title="Sort by" />
    </div>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.handle);

  if (!collection) return notFound();

  return {
    title: collection.seo.title || collection.title,
    description: collection.seo.description || collection.description,
    openGraph: {
      title: collection.seo.title || collection.title,
      description: collection.seo.description || collection.description,
    },
  };
}
export default async function CollectionPage(props: {
  params: Promise<{ handle: string }>;
  searchParams?: Promise<CollectionSearchParams>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const sort = getFirstParam(searchParams, "sort");
  const tag = getFirstParam(searchParams, "tag");
  const available = getFirstParam(searchParams, "available");
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const productFilters: ProductFilter[] = [];
  if (tag) {
    productFilters.push({ tag });
  }
  if (available === "true") {
    productFilters.push({ available: true });
  }

  const [collection, products] = await Promise.all([
    getCollection(params.handle),
    getCollectionProducts({
      collection: params.handle,
      reverse,
      sortKey,
      productFilters,
    }),
  ]);
  if (!collection) return notFound();

  return (
    <div className="w-full my-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 mb-12 max-w-6xl mx-auto px-4">
        {/* Collection Image */}
        <div className="flex-shrink-0 flex justify-center items-center w-full lg:w-1/2">
          <Image
            src={collection.image?.url!}
            alt={collection.title}
            width={500}
            height={500}
            className="rounded-lg shadow max-h-[400px] object-contain w-full h-auto"
            priority
          />
        </div>
        {/* Collection Details */}
        <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="mb-4 text-4xl sm:text-5xl font-bold">
            {collection.title}
          </h1>
          {/* <Prose className={cn("mx-2 py-2",Giestfont.className)} html={collection.description} /> */}
          {/* <p className="text-sm italic mb-2">
            {`This document was last updated on ${new Intl.DateTimeFormat(
              undefined,
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            ).format(new Date(collection.updatedAt))}.`}
          </p> */}
        </div>
      </div>
      <div className="px-5">
        <details className="mb-6 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm lg:hidden dark:border-neutral-800 dark:bg-black">
          <summary className="cursor-pointer text-sm font-medium">
            Filter and sort products
          </summary>
          <div className="mt-4">
            <CollectionFilterControls />
          </div>
        </details>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="hidden w-44 flex-none lg:block">
            <CollectionFilterControls />
          </aside>
          <section className="min-w-0 flex-1">
            <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
              Showing {products.length}{" "}
              {products.length === 1 ? "product" : "products"}
            </p>
            {products.length > 0 ? (
              <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <ProductGridItems products={products} />
              </Grid>
            ) : (
              <p className="py-8 text-center text-neutral-600 dark:text-neutral-400">
                No products match these filters.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
