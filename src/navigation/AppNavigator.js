import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainAuthScreen from '../authFlow/MainAuthScreen';
import HomeScreen from '../authFlow/HomeScreen';
import LoginScreen from '../authFlow/loginScreen';
import RegistrationPage from '../authFlow/registrationPage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MainAuth">
      <Stack.Screen
        name="MainAuth"
        component={MainAuthScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }} 
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
