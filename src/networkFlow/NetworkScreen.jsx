import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetwork, toggleFollow } from '../store/slices/followSlice';

const navItems = [
  { key: 'home', label: 'Home', icon: 'home', active: false, family: 'AntDesign', screen: 'Home' },
  { key: 'network', label: 'Network', icon: 'team', active: true, family: 'AntDesign', screen: 'MyNetwork' },
  { key: 'post', label: 'Post', icon: 'plus-square', active: false, family: 'Feather', screen: 'CreatePost' },
  { key: 'leaderboard', label: 'Ranking', icon: 'trophy', active: false, family: 'AntDesign', screen: 'Leaderboard' },
];

const renderNavIcon = (item) => {
  const color = item.active ? '#e08dff' : 'rgba(255, 255, 255, 0.62)';
  if (item.family === 'AntDesign') {
    return <AntDesign name={item.icon} size={22} color={color} />;
  }
  return <Feather name={item.icon} size={22} color={color} />;
};

const NetworkScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { connections, following, isLoading, error } = useSelector((state) => state.follow);

  useEffect(() => {
    dispatch(fetchNetwork());
  }, [dispatch]);

  const handleNavPress = (screen) => {
    navigation.navigate(screen);
  };

  const handleFollow = async (userId) => {
    try {
      await dispatch(toggleFollow(userId)).unwrap();
    } catch (err) {
      console.log('Follow error:', err);
    }
  };

  const isFollowing = (userId) => following.includes(userId);

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#0b0b0d', '#16101a', '#0b0b0d']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Network</Text>
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.85}>
            <Feather name="search" size={22} color="rgba(255, 255, 255, 0.72)" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{connections.length}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{following.length}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{following.length}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <ScrollView
          style={styles.contentScroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#e08dff" />
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suggested Users</Text>
            {connections.map((person) => (
              <View key={person._id} style={styles.connectionCard}>
                <View style={styles.personInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{person.fullname.charAt(0)}</Text>
                  </View>
                  <View style={styles.personDetails}>
                    <Text style={styles.personName}>{person.fullname}</Text>
                    <Text style={styles.personRole}>{person.role}</Text>
                    <Text style={styles.connectionsText}>{person.username}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={[styles.followButton, isFollowing(person._id) && styles.followingButton]} 
                  activeOpacity={0.85}
                  onPress={() => handleFollow(person._id)}
                >
                  {isFollowing(person._id) ? (
                    <Text style={styles.followingText}>Following</Text>
                  ) : (
                    <>
                      <AntDesign name="plus" size={16} color="#e08dff" />
                      <Text style={styles.followText}>Follow</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            ))}
            {!isLoading && connections.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateTitle}>No network suggestions yet</Text>
                <Text style={styles.emptyStateText}>Users from the feed will appear here once the API returns them.</Text>
              </View>
            ) : null}
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.navItem}
              activeOpacity={0.85}
              onPress={() => handleNavPress(item.screen)}
            >
              <View style={styles.navIconWrap}>
                {renderNavIcon(item)}
                {item.badge ? (
                  <View style={styles.navBadge}>
                    <Text style={styles.navBadgeText}>{item.badge}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0b0b0d',
  },
  safeArea: {
    flex: 1,
  },
  glowOne: {
    position: 'absolute',
    top: -40,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(224, 141, 255, 0.12)',
  },
  glowTwo: {
    position: 'absolute',
    top: 260,
    left: -70,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(138, 77, 255, 0.08)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'Outfit_800ExtraBold',
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'Outfit_700Bold',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.62)',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginHorizontal: 12,
  },
  contentScroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 18,
  },
  loadingContainer: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  errorText: {
    color: '#ffd7d7',
    fontSize: 13,
    fontFamily: 'Outfit_400Regular',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Outfit_700Bold',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  connectionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  suggestionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(224, 141, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#e08dff',
    fontSize: 18,
    fontFamily: 'Outfit_700Bold',
  },
  personDetails: {
    flex: 1,
  },
  personName: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Outfit_700Bold',
  },
  personRole: {
    color: 'rgba(255, 255, 255, 0.68)',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
    marginTop: 2,
  },
  connectionsText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    fontFamily: 'Outfit_400Regular',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(224, 141, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  moreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(224, 141, 255, 0.15)',
    borderWidth: 1,
    borderColor: '#e08dff',
  },
  followText: {
    color: '#e08dff',
    fontSize: 14,
    fontFamily: 'Outfit_700Bold',
    marginLeft: 4,
  },
  followingButton: {
    backgroundColor: '#e08dff',
    borderColor: '#e08dff',
  },
  followingText: {
    color: '#4f006c',
    fontSize: 14,
    fontFamily: 'Outfit_700Bold',
  },
  emptyState: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 18,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  emptyStateTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    marginBottom: 6,
  },
  emptyStateText: {
    color: 'rgba(255, 255, 255, 0.68)',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Outfit_400Regular',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingTop: 10,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(11, 11, 13, 0.96)',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIconWrap: {
    position: 'relative',
    marginBottom: 4,
  },
  navBadge: {
    position: 'absolute',
    top: -7,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#d81b60',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  navBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Outfit_700Bold',
  },
  navLabel: {
    color: 'rgba(255, 255, 255, 0.62)',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'Outfit_400Regular',
  },
  navLabelActive: {
    color: '#ffffff',
    fontFamily: 'Outfit_700Bold',
  },
});

export default NetworkScreen;
