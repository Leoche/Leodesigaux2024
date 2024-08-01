import gql from 'graphql-tag'

export default gql`query allWorks {
  works {
    nodes {
      title
      slug
      acf {
        date
        link
        link2
        previewUrl: preview {
          node {
            mediaItemUrl
          }
        }
        tags {
          tagList: edges {
            tag: node {
              name
              slug
            }
          }
        }
        category {
          categoryList: edges {
            category: node {
              name
              slug
            }
          }
        }
      }
      content(format: RENDERED)
    }
  }
}
`