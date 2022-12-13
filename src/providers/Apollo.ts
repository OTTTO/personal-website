import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem("token")}` || null,
    },
  }));

  return forward(operation);
});

const errorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      const code = extensions.code;

      if (code === "FORBIDDEN" || code === "UNAUTHENTICATED") {
        window.localStorage.removeItem("token");
        // window.location.replace("/");
      }
      console.log(`[GraphQL error]: Message: ${message}`);
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, errorHandler, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
