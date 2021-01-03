import fetch from "isomorphic-unfetch"
import { ApolloClient } from "apollo-boost"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"

const graphqlUrl = "http://localhost/noticias-cidade/wordpress/graphql"

const client = new ApolloClient({
    link: createHttpLink({
        uri: graphqlUrl,
        fetch
    }),
    cache: new InMemoryCache()
})

export default client