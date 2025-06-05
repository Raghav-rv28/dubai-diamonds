import { getBlogs } from "@/lib/shopify";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Latest Blogs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.flatMap((blog) =>
          blog.articles.edges.map((edge) => {
            const article = edge.node;

            return (
              <Card
                key={article.id}
                className="transition-shadow hover:shadow-xl duration-300 rounded-2xl animate-fadeIn"
              >
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-4 pt-0 space-y-3">
                  {article.image?.url && (
                    <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden">
                      <Image
                        src={article.image.url}
                        alt={article.image.altText || "Blog image"}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <CardDescription className="text-muted-foreground text-sm line-clamp-3">
                    {article.content?.slice(0, 120)}...
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
