import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const collageCards = [
  {
    key: 'card1',
    source: require('../assets/1.jpg'),
    top: height * 0.03,
    left: -24,
    rotate: '-10deg',
    height: 148,
  },
  {
    key: 'card2',
    source: require('../assets/2.jpg'),
    top: height * 0.05,
    left: width * 0.30,
    rotate: '8deg',
    height: 188,
  },
  {
    key: 'card3',
    source: require('../assets/3.jpg'),
    top: height * 0.05,
    right: 15,
    rotate: '10deg',
    height: 154,
  },
  {
    key: 'card4',
    source: require('../assets/5.jpg'),
    top: height * 0.25,
    left: -18,
    rotate: '11deg',
    height: 178,
  },
  {
    key: 'card5',
    source: require('../assets/6.jpg'),
    top: height * 0.28,
    left: width * 0.32,
    rotate: '-7deg',
    height: 194,
  },
  {
    key: 'card6',
    source: require('../assets/4.jpg'),
    top: height * 0.28,
    right: 10,
    rotate: '7deg',
    height: 168,
  },
];

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.collageLayer} pointerEvents="none">
        {collageCards.map((card) => (
          <View
            key={card.key}
            style={[
              styles.collageCard,
              {
                top: card.top,
                left: card.left,
                right: card.right,
                height: card.height,
                transform: [{ rotate: card.rotate }],
              },
            ]}
          >
            <Image source={card.source} style={styles.collageImage} />
          </View>
        ))}
      </View>
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(224, 141, 255, 0)', 'rgba(224, 141, 255, 0.14)', 'rgba(224, 141, 255, 0.32)']}
        locations={[0, 0.45, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomGradient}
      />
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
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
                onPress={() => {}}
              >
                <Text style={styles.secondaryButtonText}>I have an account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.joinNowRow}
                onPress={() => navigation.navigate('Home')}
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
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  collageLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  collageCard: {
    position: 'absolute',
    width: width * 0.28,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  collageImage: {
    width: '100%',
    height: '100%',
  },
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height * 0.38,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(14, 14, 14, 0.6)',
  },
  safeArea: {
    flex: 1,
  },
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

export default LoginScreen;
