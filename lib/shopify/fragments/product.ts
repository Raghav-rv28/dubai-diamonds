  import imageFragment from './image';
import seoFragment from './seo';

  const productFragment = /* GraphQL */ `
    fragment product on Product {
      id
      handle
      availableForSale
      title
      description
      descriptionHtml
      productType
      options {
        id
        name
        values
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 250) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            weight
            weightUnit
          }
        }
      }
      featuredImage {
        ...image
      }
      images(first: 20) {
        edges {
          node {
            ...image
          }
        }
      }
      metafields(identifiers: [
       {key: "diamond_carat_variancy", namespace: "custom"}
      ,{key: "material", namespace: "custom"}
      ,{key: "diamond_clarity", namespace: "custom"}
      ,{key: "diamond_cut", namespace: "custom"}
      ,{key: "diamond_color", namespace: "custom"}
      ,{key: "ring-size", namespace: "shopify"}
      ,{key: "ring-metal", namespace: "shopify"}
      ,{key: "band-design", namespace: "shopify"}
      ,{key: "bracelet_length", namespace: "custom"}
      ,{key: "diamond-setting", namespace: "custom"}
      ,{key: "earrings", namespace: "custom"}
      ]) {
        value
        type
        key
        namespace
        reference {
  ... on Metaobject {
    id
    handle
    type
    fields {
      key
      value
      type
    }
  }
}
        references(first: 10) {
        edges {
          node {
            ... on Metaobject {
              id
              handle
              fields {
                key
                value
                type
              }
              type
            }
          }
        }
      }
      }
      seo {
        ...seo
      }
      tags
      updatedAt
    }
    ${imageFragment}
    ${seoFragment}
  `;

  export default productFragment;
