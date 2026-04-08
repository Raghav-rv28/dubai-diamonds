export default {
  cacheComponents: true,
  experimental: {
    inlineCss: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    loader: "custom",
    loaderFile: "./lib/shopify-image-loader.ts",
  },
};
