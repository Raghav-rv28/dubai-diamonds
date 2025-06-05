import ProductGridItems from "@/components/layout/product-grid-items";
import { getCollection, getCollectionProducts } from "@/lib/shopify";
import Grid from "components/grid";
import { Geist } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}) {
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
const Giestfont = Geist({
  weight: ["500"],
  subsets: ["latin"]
})
export default async function CollectionPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const collection = await getCollection(params.handle);
  const products = await getCollectionProducts({ collection: params.handle });
  if (!collection) return notFound();

  return (
    <div className="w-full my-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 mb-12 max-w-6xl mx-auto">
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
      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 m-5">
        <ProductGridItems products={products} />
      </Grid>
    </div>
  );
}
