import Footer from "@/components/layout/footer-two";
import Prose from "@/components/prose";
import { getArticle } from "@/lib/shopify";
import Image from "next/image";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const article = await getArticle(id);
  return {
    title: article[0]?.title,
    description: article[0]?.content?.slice(0, 120),
    openGraph: {
      type: 'article'
    }
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);
  console.log(article);
  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-6xl font-bold mb-6 text-center">{article[0]?.title}</h1>
      {article[0]?.image && <Image 
        src={article[0]?.image?.url || ""}
        alt={article[0]?.image?.altText || ""}
        width={article[0]?.image?.width || 500}
        height={article[0]?.image?.height || 500}
        className="rounded-lg shadow max-h-[400px] object-contain w-full h-auto mb-6"
      />}
      <Prose className="mb-20 text-lg" html={article[0]?.contentHtml || ""} />
      <Footer />
    </div>
  );
}
