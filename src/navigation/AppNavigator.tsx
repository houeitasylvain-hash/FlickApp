import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import FeedScreen from '../screens/FeedScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0a0a0a', borderTopColor: '#1e1e1e' },
        tabBarActiveTintColor: '#ff2d55',
        tabBarInactiveTintColor: '#666',
      }}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🏠</Text>, tabBarLabel: 'Accueil' }}
      />
      <Tab.Screen
        name="Profile"
        component={FeedScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>👤</Text>, tabBarLabel: 'Profil' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
