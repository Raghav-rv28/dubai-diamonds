
export const blogFragment = /* GraphQL */ `
    fragment blog on Blog {
        id
        title
        handle
        seo {
            title
            description
        }
        content
        contentHtml
        createdAt
        updatedAt
        publishedAt
        image {
            altText
            id
            previewImage {
                
            }
        }
    }
`;

export const getBlogQuery = /* GraphQL */ `

`;

export const getBlogsQuery = /* GraphQL */ `

`;