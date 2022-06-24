import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import * as SecureStore from 'expo-secure-store';

import UserContext from './context/userContext';

import uri from './constants/Uri';
import { IUser } from './interfaces/users';

const getToken = async () => {
  const token = await SecureStore.getItemAsync('token');
  return token
};

const token = getToken();

console.log(token);

const link = createHttpLink({
  uri,
  credentials: 'include',
  headers: {
    authorization: token,
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [user, setUser] = useState<IUser | undefined>(undefined);

  if (!isLoadingComplete) {
    return null;
  }
  
  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={[user, setUser]}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </UserContext.Provider>
    </ApolloProvider>
  );
}
