import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AuthScreenShell from './components/AuthScreenShell';

const MainAuthScreen = ({ navigation }) => {
  return (
    <AuthScreenShell>
      <View style={styles.content}>
        {/* Heading - Editorial Dominance */}
        <View style={styles.headingContainer}>
          <Text style={styles.headline}>Your nights</Text>
          <Text style={styles.headline}>deserve a</Text>
          <Text style={styles.headline}>profile.</Text>
        </View>

        {/* Actions - Kinetic Layering */}
        <View style={styles.actionContainer}>
          {/* Primary Button */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Home')}
          >
            <View style={styles.buttonContent}>
              <AntDesign name="google" size={24} color="#4f006c" style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>Sign up with Google</Text>
            </View>
          </TouchableOpacity>

          {/* Secondary Button - Glassmorphic / Ghost Border rule */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.secondaryButtonText}>I have an account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.joinNowRow}
            onPress={() => navigation.navigate('Registration')}
          >
            <Text style={styles.joinNowLabel}>New to Drinkdin?</Text>
            <Text style={styles.joinNowAction}>JOIN Now</Text>
          </TouchableOpacity>
        </View>

        {/* Footer - Vertical "Rhythm" */}
        <View style={styles.footer}>
          <View style={styles.linksRow}>
            <TouchableOpacity><Text style={styles.footerLink}>TERMS OF SERVICE</Text></TouchableOpacity>
            <View style={styles.footerSeparator} />
            <TouchableOpacity><Text style={styles.footerLink}>PRIVACY POLICY</Text></TouchableOpacity>
          </View>
          <Text style={styles.copyright}>© 2024 DRINKDIN</Text>
        </View>
      </View>
    </AuthScreenShell>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  headingContainer: {
    marginBottom: 48,
  },
  headline: {
    fontSize: 52,
    fontFamily: 'Outfit_800ExtraBold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 58,
    letterSpacing: -1,
  },
  actionContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#e08dff',
    height: 64,
    borderRadius: 32,
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
    fontSize: 18,
    fontFamily: 'Outfit_800ExtraBold',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: 'rgba(38, 38, 38, 0.2)',
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(73, 72, 71, 0.15)',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Outfit_700Bold',
  },
  joinNowRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingTop: 6,
  },
  joinNowLabel: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 15,
    fontFamily: 'Outfit_400Regular',
  },
  joinNowAction: {
    color: '#e08dff',
    fontSize: 15,
    fontFamily: 'Outfit_800ExtraBold',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  footer: {
    alignItems: 'center',
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    opacity: 0.4,
  },
  footerLink: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Outfit_700Bold',
    letterSpacing: 1,
  },
  footerSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 12,
  },
  copyright: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 9,
    fontFamily: 'Outfit_400Regular',
    letterSpacing: 0.5,
  },
});

export default MainAuthScreen;
