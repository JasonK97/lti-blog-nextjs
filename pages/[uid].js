import Head from 'next/head'
import { GET_POSTS, GET_DETAILS, GET_SLUGS } from '../utils/GraphQL/Queries'
import { client } from './_app'

// export async function getStaticPaths(slug) {
//   const { data } = await client.query({
//     query: GET_DETAILS(slug)
//   })

//   return {
//     paths: [
//       { params: { slug: data.article } }
//     ],
//     fallback: true
//   }
// }

export async function getStaticProps() {
  const { data } = await client.query(GET_SLUGS)

  return {
    props: {
      data: data.allArticles.edges
    }
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_SLUGS })

  return {
    paths: [ data.allArticles.edges.map(slug => { params: { uid: slug.node._meta.uid } } ) ],
    fallback: false
  }
}

export default function ArticleDetail({ post }) {
  return (
    <div>
      <Head>
        <title>Leisure Time Inc. | Post</title>
      </Head>

      <main>
        <h1>{post.allArticles.edges.node.title[0].text}</h1>
      </main>
    </div>
  )
}
