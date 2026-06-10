import React, { useEffect, useState } from 'react';
import {
  View, FlatList, Dimensions, TouchableOpacity,
  Text, StyleSheet, ActivityIndicator
} from 'react-native';
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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff2d55" />
      </View>
    );
  }

  if (!videos.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Aucune video</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <View style={styles.videoContainer}>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>VIDEO</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.actionBtn}>
              <Text style={styles.actionText}>{liked.has(item.id) ? 'Aime' : 'Jaime'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
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
  emptyText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  videoContainer: { width: '100%', height, backgroundColor: '#000' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#333', fontSize: 24 },
  actions: { position: 'absolute', right: 12, bottom: 120, alignItems: 'center', gap: 20 },
  actionBtn: { alignItems: 'center', marginBottom: 16 },
  actionText: { color: '#fff', fontSize: 13 },
  info: { position: 'absolute', left: 12, bottom: 100 },
  username: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
