import productFragment from "../fragments/product";

export const searchQuery = /* GraphQL */ `
  query search($query: String!, $reverse: Boolean, $productFilters: [ProductFilter!]) {
    search(query: $query, types: PRODUCT, first: 100, reverse: $reverse, productFilters: $productFilters) {
      edges {
        node {
          ...product
        }
      }
      productFilters {
        id
        label
        type
        presentation
        values {
          count
          image {
            image {
              altText
              id
              height
              width
              url
            }
          }
          label
        }
      }
    }
  }
  ${productFragment}
`;
