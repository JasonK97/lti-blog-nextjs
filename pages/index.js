import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
// import { useQuery } from '@apollo/client'
// import gql from 'graphql-tag'
import { GET_POSTS } from '../utils/GraphQL/Queries'
import { client } from './_app'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_POSTS
  })

  return {
    props: {
      articles: data.allArticles.edges
    }
  }
}

export default function Home({ articles }) {
  // const {loading, error, data } = useQuery(getStaticProps())

  // if (loading) return <h2>Loading ...</h2>
  // if (error) return `${error}`

  // console.log('articles : ', articles)

  return (
    <div className={styles.container}>
      <Head>
        <title>Leisure Time Inc. | Blog</title>
        <meta name="description" content="Blog for Leisure Time Inc." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          {articles.map(article => (
            <Link 
              key={article.node._meta.id} 
              className={styles.gridLink}
              href={`/${article.node._meta.uid}`}
            >
              <a>
                <Image 
                  src={article.node.feature_image.url}
                  alt={article.node.feature_image.alt}
                  width='700px'
                  height='400px'
                />
                <h2 className={styles.title}>{article.node.title[0].text}</h2>
                <em>Published : {article.node.published_at.substring(0, 10)}</em>
                <div>
                  {article.node.body.find((b) => b.type === 'inline_text')?.primary?.description?.map(({ text }, index) => {
                      if (index === 0) {
                        return <p key={index}>{text.substring(0, 190)}...<br /></p>
                      }
                      return ''
                    })}
                </div>
              </a>
            </Link>
          ))}
      </main>
    </div>
  )
}
