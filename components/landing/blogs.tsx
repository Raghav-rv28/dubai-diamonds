import { getBlogs } from "@/lib/shopify";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default async function Blogs({first}: {first?: number}) {
  const blogs = await getBlogs();
  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Latest Blogs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.flatMap((blog) =>
          blog.articles.edges.slice(0, first).map((edge) => {
            const article = edge.node;

            return (
            <article key={article.id}>
                <Link href={`/blogs/news/${article.handle}`}>
              <Card
              className="h-full flex flex-col transition-shadow hover:shadow-xl duration-300 rounded-2xl animate-fadeIn"
              >
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg line-clamp-2 min-h-[3rem]">
                    {article.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-4 pt-0 space-y-3 grow">
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
                  <CardDescription className="text-muted-foreground text-sm line-clamp-3 min-h-[4.5rem]">
                    {article.content?.slice(0, 120)}...
                  </CardDescription>
                </CardContent>
              </Card>
              </Link>
            </article>
            );
          })
        )}
      </div>
      {
       first && first < 5 && (
        <div className="flex justify-center">
        <Link className={cn("mt-6", buttonVariants({variant: "default"}))} href="/blogs/news">
          See More Blogs →
        </Link>
        </div>
       )
      }
    </div>
  );
}
