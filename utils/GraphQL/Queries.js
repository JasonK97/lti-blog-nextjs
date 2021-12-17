import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  {
    allArticles(sortBy: published_at_DESC) {
      edges {
        node {
          feature_image
          _meta {
            id
            uid
          }
          title
          body {
            ... on ArticleBodyInline_text {
              type
              label
              primary {
                description
              }
            }
          }
          published_at
        }
      }
    }
  }
`

export function GET_DETAILS(slug) {
  var GET_POST_DETAILS = gql`
    query getArticle($slug: String = "${slug}") {
      article(uid: $slug, lang: "en-us") {
        feature_image
        published_at
        title
        body {
          ... on ArticleBodyInline_text {
            type
            primary {
              description
            }
          }
        }
      }
    }
  `
  return GET_POST_DETAILS
}

export const GET_SLUGS = gql`
  {
    allArticles(sortBy: published_at_DESC) {
      edges {
        node {
          _meta {
            uid
          }
        }
      }
    }
  }
`
