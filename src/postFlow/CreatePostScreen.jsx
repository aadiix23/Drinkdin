import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../store/slices/postSlice';

const navItems = [
  { key: 'home', label: 'Home', icon: 'home', active: false, family: 'AntDesign', screen: 'Home' },
  { key: 'network', label: 'Network', icon: 'team', active: false, family: 'AntDesign', screen: 'MyNetwork' },
  { key: 'post', label: 'Post', icon: 'plus-square', active: true, family: 'Feather', screen: 'CreatePost' },
  { key: 'leaderboard', label: 'Ranking', icon: 'trophy', active: false, family: 'AntDesign', screen: 'Leaderboard' },
];

const renderNavIcon = (item) => {
  const color = item.active ? '#e08dff' : 'rgba(255, 255, 255, 0.62)';
  if (item.family === 'AntDesign') {
    return <AntDesign name={item.icon} size={22} color={color} />;
  }
  return <Feather name={item.icon} size={22} color={color} />;
};

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isCreating, error } = useSelector((state) => state.post);
  const [postText, setPostText] = useState('');

  const handleNavPress = (screen) => {
    navigation.navigate(screen);
  };

  const handlePost = async () => {
    if (!postText.trim()) {
      Alert.alert('Error', 'Please write something to post!');
      return;
    }

    try {
      await dispatch(createPost({ content: postText })).unwrap();
      setPostText('');
      Alert.alert('Success', 'Post created!');
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Error', err || 'Failed to create post');
    }
  };

  const mediaOptions = [
    { icon: 'image', label: 'Photo', color: '#4CAF50' },
    { icon: 'video', label: 'Video', color: '#2196F3' },
    { icon: 'calendar', label: 'Event', color: '#FF9800' },
    { icon: 'article', label: 'Article', color: '#9C27B0' },
  ];

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
        <KeyboardAvoidingView 
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              activeOpacity={0.85}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Post</Text>
            <TouchableOpacity 
              style={[
                styles.postButton, 
                !postText.trim() && styles.postButtonDisabled
              ]} 
              activeOpacity={0.85}
              onPress={handlePost}
              disabled={!postText.trim() || isPosting}
            >
              <Text style={styles.postText}>
                {isPosting ? 'Posting...' : 'Post'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.contentScroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputSection}>
              <View style={styles.userInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>N</Text>
                </View>
                <View>
                  <Text style={styles.userName}>Your Name</Text>
                  <View style={styles.visibilityRow}>
                    <Ionicons name="globe-outline" size={14} color="rgba(255, 255, 255, 0.62)" />
                    <Text style={styles.visibilityText}>Anyone</Text>
                  </View>
                </View>
              </View>

              <TextInput
                style={styles.textInput}
                placeholder="What's on your mind?"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                multiline
                value={postText}
                onChangeText={setPostText}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.addToPost}>
              <Text style={styles.addToPostTitle}>Add to your post</Text>
              <View style={styles.mediaOptions}>
                {mediaOptions.map((option, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.mediaOption}
                    activeOpacity={0.85}
                  >
                    <View style={[styles.mediaIconBg, { backgroundColor: option.color + '20' }]}>
                      <Feather name={option.icon} size={22} color={option.color} />
                    </View>
                    <Text style={styles.mediaLabel}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.extras}>
              <TouchableOpacity style={styles.extraItem} activeOpacity={0.85}>
                <Feather name="map-pin" size={22} color="rgba(255, 255, 255, 0.72)" />
                <Text style={styles.extraText}>Add location</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.extraItem} activeOpacity={0.85}>
                <Feather name="calendar" size={22} color="rgba(255, 255, 255, 0.72)" />
                <Text style={styles.extraText}>Create event</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.extraItem} activeOpacity={0.85}>
                <AntDesign name="adduser" size={22} color="rgba(255, 255, 255, 0.72)" />
                <Text style={styles.extraText}>Tag people</Text>
              </TouchableOpacity>
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
        </KeyboardAvoidingView>
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
  container: {
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Outfit_700Bold',
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cancelText: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
  },
  postButton: {
    backgroundColor: '#e08dff',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  postButtonDisabled: {
    backgroundColor: 'rgba(224, 141, 255, 0.3)',
  },
  postText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
  },
  contentScroll: {
    flex: 1,
  },
  inputSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
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
  userName: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
  },
  visibilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  visibilityText: {
    color: 'rgba(255, 255, 255, 0.62)',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
    marginLeft: 4,
  },
  textInput: {
    color: '#ffffff',
    fontSize: 17,
    lineHeight: 24,
    fontFamily: 'Outfit_400Regular',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  addToPost: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  addToPostTitle: {
    color: 'rgba(255, 255, 255, 0.62)',
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
    marginBottom: 12,
  },
  mediaOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mediaOption: {
    alignItems: 'center',
  },
  mediaIconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  mediaLabel: {
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
  },
  extras: {
    padding: 16,
  },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  extraText: {
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 15,
    fontFamily: 'Outfit_400Regular',
    marginLeft: 12,
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

export default CreatePostScreen;