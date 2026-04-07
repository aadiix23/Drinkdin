import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Drinkdin</Text>
        <Text style={styles.subtitle}>Your Social Pulse is active.</Text>

        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>This is your feed. Stay tuned!</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e08dff',
    marginBottom: 40,
    fontWeight: '600',
  },
  placeholderCard: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(38, 38, 38, 0.4)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(73, 72, 71, 0.15)',
    marginBottom: 40,
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: 'rgba(38, 38, 38, 0.2)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(73, 72, 71, 0.15)',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default HomeScreen;
