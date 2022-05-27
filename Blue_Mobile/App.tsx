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

import uri from './constants/Uri';

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

  if (!isLoadingComplete) {
    return null;
  }
  
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
