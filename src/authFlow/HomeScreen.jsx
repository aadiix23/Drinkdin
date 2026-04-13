import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const suggestedCard = {
  author: 'N. Mohamed Athif',
  degree: '3rd+',
  role: 'Mobile & IoT Developer | Pre-Final Year',
  time: '1d',
  headline: 'UX teardown: why crowded nightlife apps still feel fragmented, and how I would fix the flow.',
  likes: 14,
};

const feedPosts = [
  {
    id: 'post-1',
    author: 'Finsera Capital',
    meta: '31 followers',
    tag: 'Promoted',
    copy: 'Remote roles in hospitality-tech are surging this quarter. Founders are hiring operators who understand both rooms and retention.',
    likes: 91,
    comments: 12,
  },
  {
    id: 'post-2',
    author: 'Maya S.',
    meta: 'Brand Strategist at Hush Social',
    tag: 'Trending',
    copy: 'Hosted a low-light founder table last night. The quieter the room, the stronger the conversations became.',
    likes: 248,
    comments: 39,
  },
];

const navItems = [
  { key: 'home', label: 'Home', icon: 'home', active: true, family: 'AntDesign' },
  { key: 'network', label: 'My Network', icon: 'team', active: false, family: 'AntDesign' },
  { key: 'post', label: 'Post', icon: 'plus-square', active: false, family: 'Feather' },
  { key: 'alerts', label: 'Notifications', icon: 'bell', active: false, family: 'Feather', badge: '1' },
  { key: 'jobs', label: 'Jobs', icon: 'briefcase', active: false, family: 'Feather' },
];

const renderNavIcon = (item) => {
  const color = item.active ? '#e08dff' : 'rgba(255, 255, 255, 0.62)';

  if (item.family === 'AntDesign') {
    return <AntDesign name={item.icon} size={22} color={color} />;
  }

  return <Feather name={item.icon} size={22} color={color} />;
};

const HomeScreen = () => {
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
        <View style={styles.topBar}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>N</Text>
          </View>

          <TouchableOpacity style={styles.searchBar} activeOpacity={0.85}>
            <Feather name="search" size={22} color="rgba(255, 255, 255, 0.72)" />
            <Text style={styles.searchPlaceholder}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.messageButton} activeOpacity={0.85}>
            <Ionicons name="chatbubble-ellipses-outline" size={25} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.feedScroll}
          contentContainerStyle={styles.feedContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.feedSection}>
            <View style={styles.sectionBar}>
              <Text style={styles.sectionHeading}>Suggested</Text>
              <View style={styles.sectionActions}>
                <TouchableOpacity style={styles.sectionIconButton} activeOpacity={0.85}>
                  <Feather name="more-vertical" size={20} color="rgba(255, 255, 255, 0.72)" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionIconButton} activeOpacity={0.85}>
                  <AntDesign name="close" size={20} color="rgba(255, 255, 255, 0.72)" />
                </TouchableOpacity>
              </View>
            </View>

            <LinearGradient
              colors={['rgba(224, 141, 255, 0.18)', 'rgba(255, 255, 255, 0.03)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.postCard}
            >
              <View style={styles.postHeader}>
                <View style={styles.identityBlock}>
                  <View style={styles.postAvatar}>
                    <Text style={styles.postAvatarText}>A</Text>
                  </View>

                  <View style={styles.postHeaderCopy}>
                    <View style={styles.nameRow}>
                      <Text style={styles.postName}>{suggestedCard.author}</Text>
                      <Text style={styles.degreeText}>� {suggestedCard.degree}</Text>
                    </View>
                    <Text style={styles.postMeta}>{suggestedCard.role}</Text>
                    <View style={styles.timeRow}>
                      <Text style={styles.timeText}>{suggestedCard.time}</Text>
                      <Text style={styles.dotText}>�</Text>
                      <Ionicons name="globe-outline" size={13} color="rgba(255, 255, 255, 0.58)" />
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.followRow} activeOpacity={0.85}>
                  <AntDesign name="plus" size={18} color="#e08dff" />
                  <Text style={styles.followText}>Follow</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.postCopy}>{suggestedCard.headline}</Text>

              <View style={styles.mediaRow}>
                <View style={styles.mediaPanel}>
                  <View style={styles.mediaTag}>
                    <Text style={styles.mediaTagText}>Before</Text>
                  </View>
                  <View style={styles.mediaCircle} />
                  <View style={styles.mediaFooter}>
                    <View style={styles.mediaAction}>
                      <Feather name="volume-2" size={18} color="#ffffff" />
                      <Text style={styles.mediaActionLabel}>Speaker</Text>
                    </View>
                    <View style={styles.mediaAction}>
                      <Feather name="video" size={18} color="#ffffff" />
                      <Text style={styles.mediaActionLabel}>Video</Text>
                    </View>
                    <View style={styles.mediaAction}>
                      <Feather name="mic-off" size={18} color="#ffffff" />
                      <Text style={styles.mediaActionLabel}>Mute</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.mediaPanel}>
                  <View style={[styles.mediaTag, styles.mediaTagActive]}>
                    <Text style={[styles.mediaTagText, styles.mediaTagTextActive]}>After</Text>
                  </View>
                  <View style={styles.mediaCircle} />
                  <View style={styles.mediaFooter}>
                    <View style={styles.mediaAction}>
                      <Feather name="volume-2" size={18} color="#ffffff" />
                      <Text style={styles.mediaActionLabel}>Speaker</Text>
                    </View>
                    <View style={styles.mediaAction}>
                      <Feather name="video" size={18} color="#ffffff" />
                      <Text style={styles.mediaActionLabel}>Video</Text>
                    </View>
                    <View style={styles.mediaAction}>
                      <Feather name="mic-off" size={18} color="#ffffff" />
                      <Text style={styles.mediaActionLabel}>Mute</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.reactionRow}>
                <View style={styles.reactionBadge}>
                  <AntDesign name="like1" size={14} color="#4f006c" />
                </View>
                <Text style={styles.reactionCount}>{suggestedCard.likes}</Text>
              </View>

              <View style={styles.actionBar}>
                <TouchableOpacity style={styles.actionItem} activeOpacity={0.85}>
                  <AntDesign name="like2" size={21} color="#ffffff" />
                  <Text style={styles.actionLabel}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem} activeOpacity={0.85}>
                  <Feather name="message-circle" size={21} color="#ffffff" />
                  <Text style={styles.actionLabel}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem} activeOpacity={0.85}>
                  <MaterialCommunityIcons name="repeat" size={22} color="#ffffff" />
                  <Text style={styles.actionLabel}>Repost</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem} activeOpacity={0.85}>
                  <Feather name="send" size={21} color="#ffffff" />
                  <Text style={styles.actionLabel}>Send</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {feedPosts.map((post) => (
            <View key={post.id} style={styles.feedSection}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.05)', 'rgba(224, 141, 255, 0.06)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.secondaryPostCard}
              >
                <View style={styles.secondaryHeader}>
                  <View style={styles.secondaryIdentity}>
                    <View style={styles.secondaryAvatar}>
                      <Text style={styles.secondaryAvatarText}>{post.author.charAt(0)}</Text>
                    </View>
                    <View>
                      <Text style={styles.secondaryName}>{post.author}</Text>
                      <Text style={styles.secondaryMeta}>{post.meta}</Text>
                      <Text style={styles.secondaryTag}>{post.tag}</Text>
                    </View>
                  </View>

                  <TouchableOpacity activeOpacity={0.85}>
                    <Feather name="more-vertical" size={20} color="rgba(255, 255, 255, 0.72)" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.secondaryCopy}>{post.copy}</Text>

                <View style={styles.bannerMock}>
                  <LinearGradient
                    colors={['rgba(224, 141, 255, 0.26)', 'rgba(98, 0, 132, 0.22)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.bannerOverlay}
                  >
                    <Text style={styles.bannerText}>Drinkdin Spotlight</Text>
                  </LinearGradient>
                </View>

                <View style={styles.secondaryStats}>
                  <Text style={styles.secondaryStatsText}>{post.likes} reactions</Text>
                  <Text style={styles.secondaryStatsText}>{post.comments} comments</Text>
                </View>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomNav}>
          {navItems.map((item) => (
            <TouchableOpacity key={item.key} style={styles.navItem} activeOpacity={0.85}>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 12,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Outfit_800ExtraBold',
  },
  searchBar: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  searchPlaceholder: {
    marginLeft: 12,
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 18,
    fontFamily: 'Outfit_400Regular',
  },
  messageButton: {
    width: 42,
    height: 42,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedScroll: {
    flex: 1,
  },
  feedContent: {
    paddingBottom: 18,
  },
  feedSection: {
    marginBottom: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(12, 12, 14, 0.52)',
  },
  sectionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sectionHeading: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'Outfit_700Bold',
  },
  sectionActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIconButton: {
    padding: 4,
    marginLeft: 12,
  },
  postCard: {
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 22,
    paddingTop: 16,
    paddingHorizontal: 14,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(18, 18, 20, 0.92)',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  identityBlock: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  postAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  postAvatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Outfit_800ExtraBold',
  },
  postHeaderCopy: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  postName: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
  },
  degreeText: {
    color: 'rgba(255, 255, 255, 0.62)',
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
  },
  postMeta: {
    color: 'rgba(255, 255, 255, 0.68)',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Outfit_400Regular',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.56)',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
  },
  dotText: {
    marginHorizontal: 5,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
  },
  followRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
  },
  followText: {
    marginLeft: 4,
    color: '#e08dff',
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
  },
  postCopy: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Outfit_400Regular',
    marginBottom: 14,
  },
  mediaRow: {
    flexDirection: 'row',
    gap: 4,
  },
  mediaPanel: {
    flex: 1,
    height: 250,
    backgroundColor: '#11161d',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 12,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  mediaTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  mediaTagActive: {
    backgroundColor: '#ddffe8',
  },
  mediaTagText: {
    color: '#5d6874',
    fontSize: 12,
    fontFamily: 'Outfit_800ExtraBold',
    textTransform: 'uppercase',
  },
  mediaTagTextActive: {
    color: '#11814e',
  },
  mediaCircle: {
    alignSelf: 'center',
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: 'rgba(224, 141, 255, 0.30)',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  mediaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(12, 12, 14, 0.88)',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  mediaAction: {
    alignItems: 'center',
    flex: 1,
  },
  mediaActionLabel: {
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 10,
    fontFamily: 'Outfit_400Regular',
    marginTop: 8,
  },
  reactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 10,
  },
  reactionBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#7fc0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  reactionCount: {
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 12,
  },
  actionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  actionLabel: {
    marginTop: 6,
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Outfit_400Regular',
  },
  secondaryPostCard: {
    marginHorizontal: 12,
    marginVertical: 12,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(18, 18, 20, 0.92)',
  },
  secondaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  secondaryIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  secondaryAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  secondaryAvatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
  },
  secondaryName: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
  },
  secondaryMeta: {
    color: 'rgba(255, 255, 255, 0.62)',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
  },
  secondaryTag: {
    color: '#e08dff',
    fontSize: 12,
    fontFamily: 'Outfit_700Bold',
    marginTop: 2,
  },
  secondaryCopy: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Outfit_400Regular',
    marginBottom: 12,
  },
  bannerMock: {
    height: 110,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#1a2030',
    marginBottom: 12,
  },
  bannerOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'Outfit_800ExtraBold',
    letterSpacing: 0.4,
  },
  secondaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 10,
  },
  secondaryStatsText: {
    color: 'rgba(255, 255, 255, 0.62)',
    fontSize: 12,
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

export default HomeScreen;
