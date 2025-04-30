// Editorial/lifestyle collections grid
const collections = [
  { image: "/editorial/1.jpg", alt: "Editorial 1" },
  { image: "/editorial/2.jpg", alt: "Editorial 2" },
  { image: "/editorial/3.jpg", alt: "Editorial 3" },
];

export default function EditorialCollections() {
  return (
    <section className="w-full px-4">
      <h2 className="text-2xl font-semibold mb-4">Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collections.map((col, i) => (
          <div key={i} className="rounded-lg overflow-hidden">
            <img src={col.image} alt={col.alt} className="w-full h-56 object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
