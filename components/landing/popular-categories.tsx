import { getCollections } from "@/lib/shopify";

// Popular categories section with clickable cards
const categories = [
  { name: "Earrings", image: "/categories/earrings.jpg" },
  { name: "Necklaces", image: "/categories/necklaces.jpg" },
  { name: "Rings", image: "/categories/rings.jpg" },
];

export default async function PopularCategories() {
    const categories = await getCollections("");
    const filteredCategories = categories.filter((cat) => cat.image !== null && cat.image !== undefined);
    console.log("Filtered Categories: ", filteredCategories.map(cat => `${cat.title}: ${cat.image.url}`));
  return (
    <section className="w-full px-4">
      <h2 className="text-2xl font-semibold mb-4">Popular Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCategories.map((cat) => (
          <a
            key={cat.title}
            href={`/${cat.handle}`}
            className="group block rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={cat.image.url}
              alt={cat.title}
              className="w-full h-32 md:h-48 lg:h-72 xl:h-96 2xl:h-128 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-2 text-center font-medium text-lg bg-white dark:bg-neutral-900">
              {cat.title}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
