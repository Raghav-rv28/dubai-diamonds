
export const getMetaObjectsQuery = /* GraphQL */ `
query getMetaObjects($type: String!, $first: Int) {
  metaobjects(type: $type, first: $first) {
    edges {
      node {
        id
        handle
        type
        updatedAt
        fields {
          key
          value
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`
