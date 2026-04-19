import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import {
  Outfit_400Regular,
  Outfit_700Bold,
  Outfit_800ExtraBold,
  Outfit_900Black,
  useFonts,
} from '@expo-google-fonts/outfit';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/store';

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    Outfit_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}