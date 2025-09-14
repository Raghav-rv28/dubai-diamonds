"use client";

export function ProductTags({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <div key={tag} className="bg-gray-50 rounded-full p-3 dark:bg-gray-800">
        {tag}
      </div>
    ))}
  </div>;
}