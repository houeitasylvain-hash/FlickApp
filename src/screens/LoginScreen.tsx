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
          Alert.alert('Succes', 'Compte cree ! Connecte-toi');
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
      <Text style={styles.logo}>FLICK</Text>
      <Text style={styles.tagline}>Partage tes moments</Text>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, isLogin && styles.tabActive]} onPress={() => setIsLogin(true)}>
          <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, !isLogin && styles.tabActive]} onPress={() => setIsLogin(false)}>
          <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>Inscription</Text>
        </TouchableOpacity>
      </View>
      {!isLogin && (
        <TextInput style={styles.input} placeholder="Nom d utilisateur" placeholderTextColor="#666" value={username} onChangeText={setUsername} />
      )}
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#666" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Mot de passe" placeholderTextColor="#666" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.btn} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>{isLogin ? 'Se connecter' : 'Creer mon compte'}</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 24, justifyContent: 'center' },
  logo: { fontSize: 48, fontWeight: 'bold', color: '#ff2d55', textAlign: 'center' },
  tagline: { color: '#666', textAlign: 'center', marginBottom: 40, fontSize: 15 },
  tabs: { flexDirection: 'row', backgroundColor: '#1e1e1e', borderRadius: 10, padding: 4, marginBottom: 20 },
  tab: { flex: 1, padding: 10, borderRadius: 8, alignItems: 'center' },
  tabActive: { backgroundColor: '#111' },
  tabText: { color: '#666', fontWeight: '500' },
  tabTextActive: { color: '#fff' },
  input: { backgroundColor: '#111', borderWidth: 1, borderColor: '#1e1e1e', borderRadius: 10, padding: 14, color: '#fff', marginBottom: 12, fontSize: 15 },
  btn: { backgroundColor: '#ff2d55', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
