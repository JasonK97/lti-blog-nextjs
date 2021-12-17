import Head from 'next/head'
import { GET_POSTS, GET_DETAILS, GET_UIDS } from '../utils/GraphQL/Queries'
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

export async function getStaticProps({ params }) {
  const { data } = await client.query({ query: GET_DETAILS(params.uid) })

  return {
    props: {
      article: data.article ?? null
    }
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_UIDS })
  // console.log(data.allArticles.edges.map(({ node }) => node._meta.uid ))

  return {
    paths: data.allArticles.edges.map(({ node }) => ({ params: { uid: node._meta.uid } }) ),
    fallback: true
  }
}

export default function ArticleDetail({ article }) {
  return (
    <div>
      <Head>
        <title>Leisure Time Inc. | Post</title>
      </Head>

      <main>
        <h1>{article?.title?.[0]?.text}</h1>
      </main>
    </div>
  )
}
