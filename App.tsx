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

import userContext from './context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uri from './constants/Uri';
import { IUser } from './interfaces/users';

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

  useEffect(() => {
    const setAsyncStorage = async (object: IUser) => {
      const jsonValue = JSON.stringify(object)
      await AsyncStorage.setItem('@active_user', jsonValue)
    }

    if (user) {
      try {
        setAsyncStorage(user)
      } catch (e) {
        console.log(e)
      }    }
  }, [user]);

  useEffect(() => {
    const getAsyncStorageData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@active_user')
        const objectToReturn: Promise<IUser | undefined> = jsonValue != null ? JSON.parse(jsonValue) : undefined;
        return objectToReturn;
      } catch(e) {
        console.log(e)
      }
    };

    const updateUserState = async () => {
      const user = await getAsyncStorageData();
      if (user) {
        setUser(user);
      }
    }

    updateUserState();

  }, []);

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
