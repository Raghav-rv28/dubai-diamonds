import { getCollections } from "@/lib/shopify";
import AnimatedGrid from "../grid/animated-grid";
import MobileCardStack from "../grid/mobile-card-stack";

const allowedCategories = ['bracelets','chains','bands','engagement','earrings','extravagant', 'trendy', 'bangles'];
export default async function PopularCategories() {
  const collections = await getCollections("");
  const filteredCategories = collections.filter(
    (cat) => cat.image !== null && cat.image !== undefined && allowedCategories.some((allowedCategory) => cat.title.toLowerCase().includes(allowedCategory.toLowerCase()))
  );
  
  const items = filteredCategories.map((cat) => ({
    id: cat.handle,
    title: cat.title,
    imageUrl: cat.image?.url!,
  }));

  return (
    <section className="w-full px-4 xl:px-20">
      <h2 className="text-6xl font-semibold mb-4 w-full text-center">
        Our Collection
      </h2>
      <div className="block md:hidden">
        <MobileCardStack items={items} />
      </div>
      <div className="hidden md:block">
        <AnimatedGrid items={items} />
      </div>
    </section>
  );
}
