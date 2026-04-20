import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import MainAuthScreen from '../authFlow/MainAuthScreen';
import HomeScreen from '../authFlow/HomeScreen';
import LoginScreen from '../authFlow/loginScreen';
import RegistrationPage from '../authFlow/registrationPage';
import OtpVerificationScreen from '../authFlow/OtpVerificationScreen';
import NetworkScreen from '../networkFlow/NetworkScreen';
import CreatePostScreen from '../postFlow/CreatePostScreen';
import LeaderboardScreen from '../leaderboardFlow/LeaderboardScreen';
import { setAuth } from '../store/slices/authSlice';
import { getAuthToken } from '../services/api';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const token = await getAuthToken();
        if (token) {
          dispatch(setAuth({ token }));
        }
      } finally {
        setIsBootstrapping(false);
      }
    };

    bootstrapAuth();
  }, [dispatch]);

  if (isBootstrapping) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#e08dff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'MainAuth'}
      screenOptions={{ headerShown: false }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MyNetwork" component={NetworkScreen} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainAuth" component={MainAuthScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationPage} />
          <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b0b0d',
  },
});

export default AppNavigator;
