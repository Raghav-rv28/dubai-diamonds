
export const articleFragment = /* GraphQL */ `
    fragment article on Article {
        id
        title
        handle
        content
        contentHtml
        image {
            id
            url
            height
            width
            altText
        }
    }
`;

export const blogFragment = /* GraphQL */ `
    fragment blog on Blog {
        id
        title
        handle
        seo {
            title
            description
        }
        articles(first: 100) {
            edges {
                node {
                    ...article
                }
            }
        }
    }
    ${articleFragment}
`;

export const getBlogQuery = /* GraphQL */ `
    query getBlog($handle: String!) {
        blog(handle: $handle) {
            ...blog
        }
    }
    ${blogFragment}
`;

export const getBlogsQuery = /* GraphQL */ `
    query getBlogs {
        blogs(first: 100) {
            edges {
                node {
                    ...blog
                }
            }
        }
    }
    ${blogFragment}
`;

export const getArticlesQuery = /* GraphQL */ `
    query getArticles($handle: String!) {
        articles(first: 1, query: $handle) {
            edges {
                node {
                    ...article
                }
            }
        }
    }
    ${articleFragment}
`;
