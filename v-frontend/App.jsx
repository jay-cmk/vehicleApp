import './global.css';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MyProvider } from './context/MyContext'; // adjust path if needed


// Import all your screens
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './pages/Admin';
import Client from './pages/Client';
import ForgetPasswordScreen from 'components/ForgetPasswordScreen';
import ResetPasswordScreen from 'components/ResetPasswordScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab navigator component
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home" // Set Home as default tab
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Admin"
        component={Admin}
        options={{
          tabBarLabel: 'Admin',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Client"
        component={Client}
        options={{
          tabBarLabel: 'Client',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState('MainTabs');

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setInitialRoute('MainTabs')
  }, [])
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (

    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="ForgetPasswordScreen"
          component={ForgetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />

          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>

    </MyProvider>
  );
}