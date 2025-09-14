export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, "lines"> & {
  lines: CartItem[];
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  image: Image;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  productType: string;
  metafields: Metafield[];
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
    tag?: {
      tag: string;
    }
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
  variables: {
    query: string;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: ShopifyMenu;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifySearchOperation = {
  data: {
    search: {
      edges: { node: ShopifyProduct }[];
      productFilters: {
        id: string;
        label: string;
        type: string;
        presentation: string;
        values: {
          count: number;
          image: {
            image: {
              altText: string;
              id: string;
              height: number;
              width: number;
              url: string;
            };
          };
          label: string;
        }[];
      }[];
    };
  };
  variables: {
    query: string;
    reverse?: boolean;
    sortKey?: string;
    productFilters?: ProductFilter[];
  };
};

export type ShopifyMetaobjectsOperation = {
  data: {
    metaobjects: ConnectionProduct<Metaobject>;
  };
  variables: {
    type: string;
    first: number;
  };
};

export type MetaobjectField = {
  key: string;
  value: string;
  type: string;
};

export type Metaobject = {
  id: string;
  handle: string;
  type: string;
  fields: MetaobjectField[];
};

export type ConnectionProduct<T> = {
  edges: {
    node: T;
    cursor: string;
  }[];
};

// Updated Metafield type to include references
export type Metafield = {
  value: string;
  type: string;
  key: string;
  namespace: string;
  reference: ConnectionProduct<Metaobject>;
  references?: ConnectionProduct<Metaobject>; // Optional since not all metafields have references
};

export type ProductFilter = {
  available?: boolean;
  tag?: string;
  productMetafield?: {
    namespace: string;
    key: string;
    value?: string;
    values?: string[];
  };
};

export type MenuItem = {
    id: string;
    title: string;
    url: string;
    target: "_blank" | "_self" | "_parent" | "_top";
    type: "ARTICLE" | "CATEGORY" | "COLLECTION" | "COLLECTIONS" | "PAGE" | "PRODUCT" | "BLOG" | "SHOP_POLICY" | "CATALOG";
    items: MenuItem[];
};

export type ShopifyMenu = {
    id: string;
    handle: string;
    title: string;
    items: MenuItem[];
    itemsCount: number;
};

export type Article = {
    id: string;
    title: string;
    handle: string;
    content: string;
    contentHtml: string;
    image: Image;
};

export type Blog = {
    id: string;
    title: string;
    handle: string;
    seo: SEO;
    articles: Connection<Article>;
};

export type ShopifyBlogsOperation = {
    data: {
      blogs: {
        edges: {
          node: Blog;
          cursor: string;
        }[];
      };
    };
};

export type ShopifyArticleOperation = {
    data: {
      articles: {
        edges: {
          node: Article;
          cursor: string;
        }[];
      };
    };
    variables: {
      handle: string;
    };
};
