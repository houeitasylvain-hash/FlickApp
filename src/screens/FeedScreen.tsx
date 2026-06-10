import React, { useEffect, useState } from 'react';
import {
  View, FlatList, Dimensions, TouchableOpacity,
  Text, StyleSheet, ActivityIndicator
} from 'react-native';
import Video from 'react-native-video';
import { getFeed } from '../services/api';

const { height } = Dimensions.get('window');
const API_URL = 'http://localhost:3000';

export default function FeedScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState(new Set());

  useEffect(() => {
    getFeed().then(res => {
      setVideos(res.data.videos);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const toggleLike = (id) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#ff2d55" />
    </View>
  );

  if (!videos.length) return (
    <View style={styles.center}>
      <Text style={styles.empty}>🎬</Text>
      <Text style={styles.emptyText}>Aucune vidéo</Text>
    </View>
  );

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems[0]) setActiveIndex(viewableItems[0].index ?? 0);
      }}
      renderItem={({ item, index }) => (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: `${API_URL}${item.url}` }}
            style={styles.video}
            resizeMode="cover"
            repeat
            paused={index !== activeIndex}
          />
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => toggleLike(item.id)}>
              <Text style={styles.actionIcon}>{liked.has(item.id) ? '❤️' : '🤍'}</Text>
              <Text style={styles.actionText}>J'aime</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actionIcon}>💬</Text>
              <Text style={styles.actionText}>Commenter</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <Text style={styles.username}>@flick_user</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' },
  empty: { fontSize: 56 },
  emptyText: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginVertical: 8 },
  videoContainer: { width: '100%', height, backgroundColor: '#000' },
  video: { ...StyleSheet.absoluteFillObject },
  actions: { position: 'absolute', right: 12, bottom: 120, alignItems: 'center', gap: 20 },
  actionIcon: { fontSize: 32, textAlign: 'center' },
  actionText: { color: '#fff', fontSize: 11, textAlign: 'center' },
  info: { position: 'absolute', left: 12, bottom: 100 },
  username: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
