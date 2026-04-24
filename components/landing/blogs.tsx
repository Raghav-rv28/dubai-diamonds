import { SectionHeader } from "@/components/ui/divider";
import { getBlogs } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_IMAGE =
  "https://cdn.shopify.com/s/files/1/0633/2714/2125/files/intro_poster_2.1.jpg?v=1746114226";

export default async function Blogs({ first }: { first?: number }) {
  const blogs = await getBlogs();

  const articles =
    blogs?.flatMap((blog) =>
      blog.articles.edges.slice(0, first).map((edge) => edge.node),
    ) ?? [];

  return (
    <section className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10 md:mb-14">
          <SectionHeader
            eyebrow="Journal"
            title="Stories of craft"
            titleItalic="& stone."
            align="left"
          />
          <Link
            href="/blogs/news"
            className="group hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-champagne transition-colors"
          >
            <span className="relative">
              View all
              <span className="absolute -bottom-1 left-0 h-px w-full bg-champagne origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </span>
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {articles.map((article) => {
            const image = article.image?.url ?? FALLBACK_IMAGE;

            return (
              <article key={article.id} className="group">
                <Link href={`/blogs/news/${article.handle}`} className="block">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={image}
                      alt={article.image?.altText || article.title || "Blog image"}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <span className="eyebrow text-[0.6rem]">Journal</span>
                    <h3 className="font-display text-2xl md:text-[1.65rem] leading-[1.15] text-foreground line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {article.content?.slice(0, 140)}
                      {article.content && article.content.length > 140 ? "…" : ""}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-foreground/70 group-hover:text-champagne transition-colors duration-300">
                      <span className="block h-px w-5 bg-champagne transition-[width] duration-500 group-hover:w-8" />
                      Read story
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {first && first < 5 && (
          <div className="mt-12 flex justify-center md:hidden">
            <Link
              href="/blogs/news"
              className="inline-flex items-center gap-2 px-6 py-3 border border-champagne/40 text-xs uppercase tracking-[0.25em] text-foreground hover:bg-champagne/10 transition-colors"
            >
              View all stories
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
