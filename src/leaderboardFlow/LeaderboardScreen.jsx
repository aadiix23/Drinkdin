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
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../store/slices/leaderboardSlice';

const navItems = [
  { key: 'home', label: 'Home', icon: 'home', active: false, family: 'AntDesign', screen: 'Home' },
  { key: 'network', label: 'Network', icon: 'team', active: false, family: 'AntDesign', screen: 'MyNetwork' },
  { key: 'post', label: 'Post', icon: 'plus-square', active: false, family: 'Feather', screen: 'CreatePost' },
  { key: 'leaderboard', label: 'Ranking', icon: 'trophy', active: true, family: 'AntDesign', screen: 'Leaderboard' },
];

const leaderboardData = [
  { rank: 1, name: 'Sarah Chen', username: '@sarahc', likes: 12450, posts: 89, avatar: 'S' },
  { rank: 2, name: 'Alex Rivera', username: '@alexr', likes: 9820, posts: 156, avatar: 'A' },
  { rank: 3, name: 'Jordan Kim', username: '@jordank', likes: 8750, posts: 234, avatar: 'J' },
  { rank: 4, name: 'Mike Johnson', username: '@mikej', likes: 7230, posts: 178, avatar: 'M' },
  { rank: 5, name: 'Emma Wilson', username: '@emmaw', likes: 6890, posts: 145, avatar: 'E' },
  { rank: 6, name: 'David Lee', username: '@davidl', likes: 5420, posts: 98, avatar: 'D' },
  { rank: 7, name: 'Lisa Park', username: '@lisap', likes: 4890, posts: 167, avatar: 'L' },
  { rank: 8, name: 'James Brown', username: '@jamesb', likes: 3560, posts: 89, avatar: 'J' },
  { rank: 9, name: 'Anna Smith', username: '@annas', likes: 2980, posts: 112, avatar: 'A' },
  { rank: 10, name: 'Tom Wilson', username: '@tomw', likes: 2150, posts: 76, avatar: 'T' },
];

const getRankStyle = (rank) => {
  if (rank === 1) return { bg: '#FFD700', text: '#000' };
  if (rank === 2) return { bg: '#C0C0C0', text: '#000' };
  if (rank === 3) return { bg: '#CD7F32', text: '#000' };
  return { bg: 'rgba(255, 255, 255, 0.1)', text: '#fff' };
};

const renderNavIcon = (item) => {
  const color = item.active ? '#e08dff' : 'rgba(255, 255, 255, 0.62)';
  if (item.family === 'AntDesign') {
    return <AntDesign name={item.icon} size={22} color={color} />;
  }
  return <Feather name={item.icon} size={22} color={color} />;
};

const LeaderboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { rankings, isLoading, error } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const handleNavPress = (screen) => {
    navigation.navigate(screen);
  };

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
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.85}>
            <Feather name="filter" size={22} color="rgba(255, 255, 255, 0.72)" />
          </TouchableOpacity>
        </View>

        <View style={styles.topThreeContainer}>
          <View style={styles.topThree}>
            {(rankings && rankings.length > 0 ? rankings.slice(0, 3) : []).map((item, index) => {
              const rankStyle = getRankStyle(item.rank);
              const isCenter = index === 1;
              return (
                <TouchableOpacity 
                  key={item.rank} 
                  style={[
                    styles.topCard,
                    isCenter && styles.topCardCenter
                  ]}
                  activeOpacity={0.85}
                >
                  <View style={[styles.topRankBadge, { backgroundColor: rankStyle.bg }]}>
                    <Text style={[styles.topRankText, { color: rankStyle.text }]}>{item.rank}</Text>
                  </View>
                  <View style={[styles.topAvatar, isCenter && styles.topAvatarCenter]}>
                    <Text style={[styles.topAvatarText, isCenter && styles.topAvatarTextCenter]}>{item.fullName?.charAt(0) || 'U'}</Text>
                  </View>
                  <Text style={[styles.topName, isCenter && styles.topNameCenter]}>{item.fullName || 'User'}</Text>
                  <View style={styles.topStats}>
                    <View style={styles.topStatItem}>
                      <AntDesign name="heart" size={10} color="#e91e63" />
                      <Text style={styles.topStatText}>{item.likes.toLocaleString()}</Text>
                    </View>
                  </View>
                  {isCenter && (
                    <View style={styles.crownBadge}>
                      <AntDesign name="star" size={14} color="#FFD700" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
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

          <Text style={styles.sectionTitle}>Top Contributors</Text>
          
          {(rankings || []).map((item, idx) => {
            const rank = idx + 1;
            const rankStyle = getRankStyle(rank);
            return (
              <TouchableOpacity 
                key={item.userId} 
                style={styles.leaderboardItem}
                activeOpacity={0.85}
              >
                <View style={styles.rankContainer}>
                  <View style={[styles.rankBadge, { backgroundColor: rankStyle.bg }]}>
                    <Text style={[styles.rankText, { color: rankStyle.text }]}>{rank}</Text>
                  </View>
                </View>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.fullName?.charAt(0) || 'U'}</Text>
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{item.fullName || 'User'}</Text>
                    <Text style={styles.userUsername}>@{item.fullName?.toLowerCase().replace(' ', '') || 'user'}</Text>
                  </View>
                </View>
                <View style={styles.itemStats}>
                  <View style={styles.statItem}>
                    <AntDesign name="heart" size={14} color="#e91e63" />
                    <Text style={styles.statText}>{(item.totalLikes || 0).toLocaleString()}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Feather name="file-text" size={14} color="rgba(255, 255, 255, 0.62)" />
                    <Text style={styles.statText}>{item.totalPosts || 0}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topThreeContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  topThree: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 6,
  },
  topCard: {
    alignItems: 'center',
    padding: 12,
    paddingTop: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    flex: 1,
    maxWidth: 90,
  },
  topCardCenter: {
    backgroundColor: 'rgba(224, 141, 255, 0.1)',
    borderColor: 'rgba(224, 141, 255, 0.3)',
    paddingVertical: 14,
    maxWidth: 100,
  },
  topRankBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  topRankText: {
    fontSize: 12,
    fontFamily: 'Outfit_800ExtraBold',
  },
  topAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(224, 141, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  topAvatarCenter: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  topAvatarText: {
    color: '#e08dff',
    fontSize: 14,
    fontFamily: 'Outfit_700Bold',
  },
  topAvatarTextCenter: {
    fontSize: 16,
  },
  topName: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Outfit_600SemiBold',
    textAlign: 'center',
  },
  topNameCenter: {
    fontSize: 12,
  },
  crownBadge: {
    position: 'absolute',
    top: -10,
  },
  topStats: {
    flexDirection: 'row',
    gap: 8,
  },
  topStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  topStatText: {
    color: 'rgba(255, 255, 255, 0.62)',
    fontSize: 10,
    fontFamily: 'Outfit_500Medium',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    margin: 16,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 12,
    alignItems: 'center',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
  },
  contentScroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 18,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Outfit_700Bold',
    marginBottom: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  rankContainer: {
    marginRight: 12,
    width: 32,
    alignItems: 'center',
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 14,
    fontFamily: 'Outfit_700Bold',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 14,
    fontFamily: 'Outfit_700Bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Outfit_600SemiBold',
  },
  userUsername: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
  },
  itemStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 13,
    fontFamily: 'Outfit_500Medium',
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

export default LeaderboardScreen;