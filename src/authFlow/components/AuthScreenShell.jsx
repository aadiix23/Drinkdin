import React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const collageCards = [
  {
    key: 'card1',
    source: require('../../assets/1.jpg'),
    top: height * 0.03,
    left: -24,
    rotate: '-10deg',
    height: 148,
  },
  {
    key: 'card2',
    source: require('../../assets/2.jpg'),
    top: height * 0.05,
    left: width * 0.3,
    rotate: '8deg',
    height: 188,
  },
  {
    key: 'card3',
    source: require('../../assets/3.jpg'),
    top: height * 0.05,
    right: 15,
    rotate: '10deg',
    height: 154,
  },
  {
    key: 'card4',
    source: require('../../assets/5.jpg'),
    top: height * 0.25,
    left: -18,
    rotate: '11deg',
    height: 178,
  },
  {
    key: 'card5',
    source: require('../../assets/6.jpg'),
    top: height * 0.28,
    left: width * 0.32,
    rotate: '-7deg',
    height: 194,
  },
  {
    key: 'card6',
    source: require('../../assets/4.jpg'),
    top: height * 0.28,
    right: 10,
    rotate: '7deg',
    height: 168,
  },
];

const AuthScreenShell = ({ children }) => {
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
        colors={[
          'rgba(224, 141, 255, 0)',
          'rgba(224, 141, 255, 0.14)',
          'rgba(224, 141, 255, 0.32)',
        ]}
        locations={[0, 0.45, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomGradient}
      />
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
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
});

export default AuthScreenShell;
