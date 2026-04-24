import { SectionHeader } from "@/components/ui/divider";
import { getCollections } from "@/lib/shopify";
import AnimatedGrid from "../grid/animated-grid";
import MobileCardStack from "../grid/mobile-card-stack";

const allowedCategories = [
  "bracelets",
  "chains",
  "bands",
  "engagement",
  "earrings",
  "extravagant",
  "trendy",
  "bangles",
];

export default async function PopularCategories() {
  const collections = await getCollections("");
  const filteredCategories = collections.filter(
    (cat) =>
      cat.image !== null &&
      cat.image !== undefined &&
      allowedCategories.some((allowedCategory) =>
        cat.title.toLowerCase().includes(allowedCategory.toLowerCase()),
      ),
  );

  const items = filteredCategories.map((cat) => ({
    id: cat.handle,
    title: cat.title,
    imageUrl: cat.image?.url!,
    description: cat.description,
  }));

  return (
    <section className="w-full px-4 md:px-8 xl:px-16 py-16 md:py-24">
      <SectionHeader
        eyebrow="The Collection"
        title="Crafted for the way you"
        titleItalic="wear forever."
        description="Signature silhouettes and everyday pieces — each one built to last, designed to be loved."
        className="mb-10 md:mb-16"
      />

      <div className="block md:hidden">
        <MobileCardStack items={items} />
      </div>

      <AnimatedGrid items={items} />
    </section>
  );
}
