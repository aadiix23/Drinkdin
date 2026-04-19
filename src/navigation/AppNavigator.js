import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainAuthScreen from '../authFlow/MainAuthScreen';
import HomeScreen from '../authFlow/HomeScreen';
import LoginScreen from '../authFlow/loginScreen';
import RegistrationPage from '../authFlow/registrationPage';
import OtpVerificationScreen from '../authFlow/OtpVerificationScreen';
import NetworkScreen from '../networkFlow/NetworkScreen';
import CreatePostScreen from '../postFlow/CreatePostScreen';
import LeaderboardScreen from '../leaderboardFlow/LeaderboardScreen';

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
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpVerification"
        component={OtpVerificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="MyNetwork" 
        component={NetworkScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="CreatePost" 
        component={CreatePostScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;