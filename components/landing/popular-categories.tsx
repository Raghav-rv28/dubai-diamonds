import { getCollections } from "@/lib/shopify";
import AnimatedGrid from "../grid/animated-grid";

const allowedCategories = ['bracelets','chains','bands','engagement','earrings','extravagant', 'trendy', 'bangles'];
export default async function PopularCategories() {
  const collections = await getCollections("");
  const filteredCategories = collections.filter(
    (cat) => cat.image !== null && cat.image !== undefined && allowedCategories.some((allowedCategory) => cat.title.toLowerCase().includes(allowedCategory.toLowerCase()))
  );
  return (
    <section className="w-full px-4 xl:px-20">
      <h2 className="text-6xl font-semibold mb-4 w-full text-center">
        Our Collection
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
