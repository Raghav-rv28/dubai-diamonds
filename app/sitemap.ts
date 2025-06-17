import { getBlogs, getCollections, getPages, getProducts } from "lib/shopify";
import { baseUrl, validateEnvironmentVariables } from "lib/utils";
import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified?: string;
  description?: string;
  title?: string;
};

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const routesMap = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt,
    }))
  );

  const productsPromise = getProducts().then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/products/${product.handle}`,
      lastModified: product.updatedAt,
    }))
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}/pages/${page.handle}`,
      lastModified: page.updatedAt,
    }))
  );


  const blogsPromise = getBlogs().then((blogs) => {
    const blog = blogs.filter((blog) => blog.handle === "news")[0]
    if(!blog) return []
    return blog.articles?.edges.map((article) => ({
      url: `${baseUrl}/blogs/news/${article?.node?.handle}`,
      description: article?.node?.content,
      title: article?.node?.title,
    }))
  })
  
  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise, blogsPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
