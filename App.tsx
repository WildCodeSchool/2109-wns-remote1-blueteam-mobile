import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import ConfiguredApolloProvider from './ConfiguredApolloProvider';

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
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </UserContext.Provider>
    </ConfiguredApolloProvider>
  );
}
