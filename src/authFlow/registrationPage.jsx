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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AuthScreenShell from './components/AuthScreenShell';
import { registerUser } from '../../service/authservice';

const RegistrationPage = ({ navigation }) => {
  const [form, setForm] = useState({
    fullname: '',
    username: '',
    age: '',
    email: '',
    password: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isOfLegalAge, setIsOfLegalAge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setError(null); // Clear error when user starts typing
  };

  const handleRegister = async () => {
    setError(null);

    // Validation
    if (!form.fullname.trim()) {
      setError('Full name is required');
      return;
    }
    if (!form.username.trim()) {
      setError('Username is required');
      return;
    }
    if (!form.age.trim()) {
      setError('Age is required');
      return;
    }
    if (parseInt(form.age) < 21) {
      setError('You must be 21 years or older');
      return;
    }
    if (!form.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!form.password.trim()) {
      setError('Password is required');
      return;
    }
    if (!acceptedTerms) {
      setError('You must accept the terms and privacy policy');
      return;
    }
    if (!isOfLegalAge) {
      setError('You must confirm you are 21 years or above');
      return;
    }

    try {
      setLoading(true);
      const userData = {
        fullname: form.fullname,
        username: form.username,
        age: parseInt(form.age),
        email: form.email,
        password: form.password,
      };

      await registerUser(userData);
      
      // Success - navigate to OTP verification
      navigation.navigate('OtpVerification', {
        email: form.email,
      });
      
      Alert.alert('Success', 'Registration successful! Please verify your email.');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage =
        typeof err === 'string'
          ? err
          : err?.message || err?.error || 'Registration failed. Please try again.';

      setError(errorMessage);
      Alert.alert('Registration Error', errorMessage);
    } finally {
      setLoading(false);
    }
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
              <Text style={styles.eyebrow}>JOIN THE SCENE</Text>
              <Text style={styles.headline}>Set up your</Text>
              <Text style={styles.headline}>Drinkdin</Text>
              <Text style={styles.headline}>profile.</Text>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Basic Details</Text>

              <TextInput
                value={form.fullname}
                onChangeText={(value) => updateField('fullname', value)}
                placeholder="Full name"
                placeholderTextColor="rgba(255, 255, 255, 0.38)"
                style={styles.input}
              />

              <TextInput
                value={form.username}
                onChangeText={(value) => updateField('username', value)}
                placeholder="Username"
                placeholderTextColor="rgba(255, 255, 255, 0.38)"
                autoCapitalize="none"
                style={styles.input}
              />

              <TextInput
                value={form.age}
                onChangeText={(value) => updateField('age', value)}
                placeholder="Age"
                placeholderTextColor="rgba(255, 255, 255, 0.38)"
                keyboardType="number-pad"
                style={styles.input}
              />

              <TextInput
                value={form.email}
                onChangeText={(value) => updateField('email', value)}
                placeholder="Email address"
                placeholderTextColor="rgba(255, 255, 255, 0.38)"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />

              <TextInput
                value={form.password}
                onChangeText={(value) => updateField('password', value)}
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.38)"
                secureTextEntry
                style={styles.input}
              />

              <View style={styles.checkboxGroup}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setAcceptedTerms((current) => !current)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                    {acceptedTerms ? <AntDesign name="check" size={14} color="#4f006c" /> : null}
                  </View>
                  <Text style={styles.checkboxText}>I accept the terms and privacy policy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setIsOfLegalAge((current) => !current)}
                  activeOpacity={0.85}
                >
                  <View style={[styles.checkbox, isOfLegalAge && styles.checkboxChecked]}>
                    {isOfLegalAge ? <AntDesign name="check" size={14} color="#4f006c" /> : null}
                  </View>
                  <Text style={styles.checkboxText}>I am 21 years of age or above</Text>
                </TouchableOpacity>
              </View>

              {error && <Text style={styles.errorText}>{error}</Text>}

              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#4f006c" size="small" />
                ) : (
                  <Text style={styles.primaryButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.secondaryButtonText}>I have an account</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 24,
  },
  headingContainer: {
    paddingTop: 28,
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
    marginTop: 20,
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
  checkboxGroup: {
    marginTop: 2,
    marginBottom: 8,
    gap: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    fontFamily: 'Outfit_500Medium',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },});

export default RegistrationPage;
