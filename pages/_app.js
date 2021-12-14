import '../styles/globals.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { PrismicLink } from 'apollo-link-prismic'

export const client = new ApolloClient({
  link: PrismicLink({
    uri: `${process.env.REACT_APP_API_URL}`,
    accessToken: `${process.env.REACT_APP_API_KEY}`,
    repositoryName: 'leisuretimeinc'
  }),
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
