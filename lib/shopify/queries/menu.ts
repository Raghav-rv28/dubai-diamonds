export const getMenuQuery = /* GraphQL */ `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
        tags
        type
        items {
          title
          url
          tags
          type
          items {
            title
            url
            tags
            type
          }
        }
      }
      id
      itemsCount
      title
    }
  }
`;
