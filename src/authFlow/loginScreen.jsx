import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AuthScreenShell from './components/AuthScreenShell';

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const updateField = (field, value) => {
    setCredentials((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <AuthScreenShell>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaView style={styles.safeContent}>
          <View style={styles.content}>
            <View style={styles.headingContainer}>
              <Text style={styles.eyebrow}>WELCOME BACK</Text>
              <Text style={styles.headline}>Pick up the</Text>
              <Text style={styles.headline}>night where</Text>
              <Text style={styles.headline}>you left it.</Text>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Login</Text>

              <TextInput
                value={credentials.email}
                onChangeText={(value) => updateField('email', value)}
                placeholder="Email address"
                placeholderTextColor="rgba(255, 255, 255, 0.38)"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />

              <TextInput
                value={credentials.password}
                onChangeText={(value) => updateField('password', value)}
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.38)"
                secureTextEntry
                style={styles.input}
              />

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setRememberMe((current) => !current)}
                activeOpacity={0.85}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe ? <AntDesign name="check" size={12} color="#4f006c" /> : null}
                </View>
                <Text style={styles.checkboxText}>Keep me signed in</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.primaryButtonText}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('MainAuth')}
              >
                <Text style={styles.secondaryButtonText}>Back to main auth</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </AuthScreenShell>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeContent: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 24,
  },
  headingContainer: {
    marginBottom: 20,
  },
  eyebrow: {
    color: '#e08dff',
    fontSize: 12,
    fontFamily: 'Outfit_700Bold',
    letterSpacing: 2.4,
    marginBottom: 12,
    textAlign: 'center',
  },
  headline: {
    fontSize: 42,
    lineHeight: 48,
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -1,
    fontFamily: 'Outfit_800ExtraBold',
  },
  formCard: {
    backgroundColor: 'rgba(18, 18, 18, 0.82)',
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  formTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Outfit_700Bold',
    marginBottom: 18,
  },
  input: {
    height: 54,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Outfit_400Regular',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#e08dff',
    borderColor: '#e08dff',
  },
  checkboxText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Outfit_400Regular',
  },
  primaryButton: {
    marginTop: 6,
    backgroundColor: '#e08dff',
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#bc00fb',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  primaryButtonText: {
    color: '#4f006c',
    fontSize: 16,
    fontFamily: 'Outfit_800ExtraBold',
  },
  secondaryButton: {
    marginTop: 10,
    height: 54,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(38, 38, 38, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(73, 72, 71, 0.15)',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
  },
});

export default LoginScreen;
