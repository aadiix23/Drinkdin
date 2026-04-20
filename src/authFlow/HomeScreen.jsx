import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, fetchComments } from '../store/slices/commentSlice';
import { fetchFeed, toggleFeedLike } from '../store/slices/feedSlice';

const navItems = [
  { key: 'home', label: 'Home', icon: 'home', active: true, family: 'AntDesign', screen: 'Home' },
  { key: 'network', label: 'Network', icon: 'team', active: false, family: 'AntDesign', screen: 'MyNetwork' },
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.feed);
  const { byPostId, isLoadingByPostId, isSubmittingByPostId } = useSelector((state) => state.comments);
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const handleNavPress = (screen) => {
    if (screen === 'Home') {
      navigation.navigate('HomeTabs');
    } else {
      navigation.navigate(screen);
    }
  };

  const handleLikeToggle = async (post) => {
    try {
      await dispatch(toggleFeedLike({ postId: post._id, likedByMe: post.likedByMe })).unwrap();
    } catch (err) {
      Alert.alert('Like Error', err || 'Failed to update like');
    }
  };

  const handleToggleComments = (postId) => {
    const isExpanded = Boolean(expandedComments[postId]);
    setExpandedComments((current) => ({
      ...current,
      [postId]: !isExpanded,
    }));

    if (!isExpanded && !byPostId[postId]) {
      dispatch(fetchComments(postId));
    }
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs((current) => ({
      ...current,
      [postId]: value,
    }));
  };

  const handleAddComment = async (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) {
      Alert.alert('Comment Error', 'Please write a comment first.');
      return;
    }

    try {
      await dispatch(addComment({ postId, text })).unwrap();
      setCommentInputs((current) => ({
        ...current,
        [postId]: '',
      }));
      dispatch(fetchFeed());
    } catch (err) {
      Alert.alert('Comment Error', err || 'Failed to add comment');
    }
  };

  const renderPost = (post, isFirst = false) => {
    if (!post) return null;

    const comments = byPostId[post._id] || [];
    const isCommentsOpen = Boolean(expandedComments[post._id]);
    const isCommentsLoading = Boolean(isLoadingByPostId[post._id]);
    const isSubmittingComment = Boolean(isSubmittingByPostId[post._id]);
    const commentCount = comments.length > 0 ? comments.length : post.commentCount || 0;

    return (
      <View key={post._id || post.id} style={styles.postContainer}>
        <LinearGradient
          colors={isFirst ? ['rgba(224, 141, 255, 0.18)', 'rgba(255, 255, 255, 0.03)'] : ['rgba(255, 255, 255, 0.05)', 'rgba(224, 141, 255, 0.06)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.postCard}
        >
          <View style={styles.postHeader}>
            <View style={styles.identityBlock}>
              <View style={styles.postAvatar}>
                <Text style={styles.postAvatarText}>{post.user?.fullname?.charAt(0) || 'U'}</Text>
              </View>
              <View style={styles.postHeaderCopy}>
                <View style={styles.nameRow}>
                  <Text style={styles.postName}>{post.user?.fullname || 'User'}</Text>
                  <Text style={styles.degreeText}>• {post.user?.age || ''}</Text>
                </View>
                <Text style={styles.postMeta}>{post.user?.username || ''}</Text>
                <View style={styles.timeRow}>
                  <Text style={styles.timeText}>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</Text>
                  <Text style={styles.dotText}>•</Text>
                  <Ionicons name="globe-outline" size={13} color="rgba(255, 255, 255, 0.58)" />
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.followRow} activeOpacity={0.85}>
              <AntDesign name="plus" size={18} color="#e08dff" />
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.postCopy}>{post.content || ''}</Text>
          <View style={styles.reactionRow}>
            <View style={styles.reactionBadge}>
              <MaterialCommunityIcons name="bottle-wine" size={14} color="#4f006c" />
            </View>
            <Text style={styles.reactionCount}>{post.likes?.length || 0}</Text>
            <Text style={styles.reactionMeta}>• {commentCount} comments</Text>
          </View>
          <View style={styles.actionBar}>
            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.85}
              onPress={() => handleLikeToggle(post)}
            >
              <MaterialCommunityIcons
                name={post.likedByMe ? 'glass-cocktail' : 'bottle-wine-outline'}
                size={21}
                color={post.likedByMe ? '#e08dff' : '#ffffff'}
              />
              <Text style={[styles.actionLabel, post.likedByMe && styles.actionLabelActive]}>
                {post.likedByMe ? 'Toasted' : 'Toast'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.85}
              onPress={() => handleToggleComments(post._id)}
            >
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
          {isCommentsOpen ? (
            <View style={styles.commentsSection}>
              {isCommentsLoading ? (
                <View style={styles.commentsLoading}>
                  <ActivityIndicator size="small" color="#e08dff" />
                </View>
              ) : comments.length > 0 ? (
                comments.map((comment) => (
                  <View key={comment._id} style={styles.commentCard}>
                    <View style={styles.commentAvatar}>
                      <Text style={styles.commentAvatarText}>
                        {comment.user?.fullname?.charAt(0) || 'U'}
                      </Text>
                    </View>
                    <View style={styles.commentContent}>
                      <Text style={styles.commentAuthor}>
                        {comment.user?.fullname || 'User'}
                      </Text>
                      <Text style={styles.commentText}>{comment.text}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noCommentsText}>No comments yet. Be the first to reply.</Text>
              )}

              <View style={styles.commentComposer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Write a comment..."
                  placeholderTextColor="rgba(255, 255, 255, 0.38)"
                  value={commentInputs[post._id] || ''}
                  onChangeText={(value) => handleCommentInputChange(post._id, value)}
                />
                <TouchableOpacity
                  style={[
                    styles.commentSendButton,
                    (!commentInputs[post._id]?.trim() || isSubmittingComment) && styles.commentSendButtonDisabled,
                  ]}
                  activeOpacity={0.85}
                  onPress={() => handleAddComment(post._id)}
                  disabled={!commentInputs[post._id]?.trim() || isSubmittingComment}
                >
                  <Text style={styles.commentSendText}>
                    {isSubmittingComment ? '...' : 'Send'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </LinearGradient>
      </View>
    );
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
          onRefresh={() => dispatch(fetchFeed())}
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

          {posts && posts.length > 0 ? (
            posts.map((post, index) => renderPost(post, index === 0))
          ) : (
            !isLoading && (
              <View style={styles.emptyFeed}>
                <Text style={styles.emptyText}>No posts yet. Start following people!</Text>
              </View>
            )
          )}
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
  postContainer: {
    marginBottom: 8,
  },
  postCard: {
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
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
  },
  followRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  reactionMeta: {
    marginLeft: 8,
    color: 'rgba(255, 255, 255, 0.56)',
    fontSize: 13,
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
  actionLabelActive: {
    color: '#e08dff',
    fontFamily: 'Outfit_700Bold',
  },
  commentsSection: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  commentsLoading: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  commentCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  commentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  commentAvatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Outfit_700Bold',
  },
  commentContent: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  commentAuthor: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Outfit_700Bold',
    marginBottom: 2,
  },
  commentText: {
    color: 'rgba(255, 255, 255, 0.82)',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Outfit_400Regular',
  },
  noCommentsText: {
    color: 'rgba(255, 255, 255, 0.56)',
    fontSize: 13,
    fontFamily: 'Outfit_400Regular',
    marginBottom: 12,
  },
  commentComposer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    minHeight: 46,
    borderRadius: 18,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
  },
  commentSendButton: {
    marginLeft: 10,
    minWidth: 62,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#e08dff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  commentSendButtonDisabled: {
    opacity: 0.45,
  },
  commentSendText: {
    color: '#23002f',
    fontSize: 14,
    fontFamily: 'Outfit_700Bold',
  },
  emptyFeed: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.62)',
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    margin: 16,
    borderRadius: 12,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
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
