import { getCollections } from "@/lib/shopify";
import AnimatedGrid from "../grid/animated-grid";

export default async function PopularCategories() {
  const collections = await getCollections("");
  const filteredCategories = collections.filter(
    (cat) => cat.image !== null && cat.image !== undefined
  );
  return (
    <section className="w-full px-4">
      <h2 className="text-4xl font-semibold mb-4 w-full text-center">
        Popular Categories
      </h2>
      <AnimatedGrid
        items={filteredCategories.map((cat) => ({
          id: cat.handle,
          title: cat.title,
          imageUrl: cat.image?.url!,
        }))}
      />
    </section>
  );
}
