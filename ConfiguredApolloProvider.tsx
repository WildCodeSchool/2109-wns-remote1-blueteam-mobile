import { type FC } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import * as SecureStore from 'expo-secure-store';

import uri from './constants/Uri';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri,
});

const authMiddleware = new ApolloLink((operation, forward) => {
    const getToken = async (): Promise<string> => {
        const token = await SecureStore.getItemAsync('token');
        console.log("token", token);
        console.log(token ?? '');
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

const client = new ApolloClient({
    cache,
    link: from([authMiddleware, httpLink]),
});

const ConfiguredApolloProvider: FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default ConfiguredApolloProvider;
