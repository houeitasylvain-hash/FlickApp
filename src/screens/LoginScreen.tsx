import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import { login, register } from '../services/api';

export default function LoginScreen({ navigation }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        const res = await login(email, password);
        if (res.data.token) {
          navigation.replace('Main');
        } else {
          Alert.alert('Erreur', res.data.error);
        }
      } else {
        const res = await register(username, email, password);
        if (res.data.user) {
          Alert.alert('Succès', 'Compte créé ! Connecte-toi');
          setIsLogin(true);
        } else {
          Alert.alert('Erreur', res.data.error);
        }
      }
    } catch {
      Alert.alert('Erreur', 'Serveur inaccessible');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FL<Text style={styles.logo2}>ICK</Text></Text>
      <Text style={styles.tagline}>Partage tes moments 🎬</Text>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, isLogin && styles.tabActive]}
          onPress={() => setIsLogin(true)}>
          <Text style={[styles.tabText, isLogin && styles.



EOP
