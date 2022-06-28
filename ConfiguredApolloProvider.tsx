import { type FC } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import * as SecureStore from 'expo-secure-store';

import uri from './constants/Uri';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri,
});

const authMiddleware = new ApolloLink((operation, forward) => {
    const getToken = async (): Promise<string> => {
        const token = await SecureStore.getItemAsync('token');
        return token ?? '';
    };
  
    operation.setContext(({ headers = {} }) => getToken().then(token => ({
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
        },
    })));

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache,
  link: from([errorLink, authMiddleware, httpLink]),
});
const ConfiguredApolloProvider: FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ConfiguredApolloProvider;
