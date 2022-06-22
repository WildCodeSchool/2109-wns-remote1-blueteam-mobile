import { useState } from 'react';
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

import userContext from './context/userContext';

import uri from './constants/Uri';

interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  job: string;
  role: string;
}

const link = createHttpLink({
  uri,
  credentials: 'include',
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
      <userContext.Provider value={[user, setUser]}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </userContext.Provider>
    </ApolloProvider>
  );
}
