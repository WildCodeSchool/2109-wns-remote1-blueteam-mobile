import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NativeBaseProvider } from "native-base";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import ConfiguredApolloProvider from './context/ConfiguredApolloProvider';

import UserContext from './context/userContext';

import { IUser } from './interfaces/users';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [user, setUser] = useState<IUser | undefined>(undefined);

  if (!isLoadingComplete) {
    return null;
  }
  
  return (
    <ConfiguredApolloProvider>
      <UserContext.Provider value={[user, setUser]}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </UserContext.Provider>
    </ConfiguredApolloProvider>
  );
}
