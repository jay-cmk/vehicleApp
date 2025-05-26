import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';



const Home = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsAuthenticated(false);
      Alert.alert('Logged out', 'You have been successfully logged out');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View>
        {isAuthenticated && (
          <Animated.View entering={FadeInDown.delay(200).duration(500)}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Ionicons name="log-out" size={30} color="#ef4444" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      {/* Optional Logo Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/car.png')}
          style={{ width: 200, height: 200 }}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Vehicle App</Text>
      </View>

      <Animated.View entering={FadeIn.duration(500)} style={styles.card}>

        {!isAuthenticated && <View>
          <Animated.View entering={FadeInDown.delay(200).duration(500)}>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(500)}>
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>}

      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e1e1', // red-700
    padding: 24,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb', // gray-50
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  header: {
    backgroundColor: '#1e293b', // slate-800
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-end', // moves button to the right
    marginRight: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },


  logoutText: {
    color: '#ef4444', // red-500
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
    marginLeft: 5,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#4f46e5', // indigo-600
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: '#4f46e5', // indigo-600
    padding: 16,
    borderRadius: 12,
  },
  registerText: {
    color: '#4f46e5',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
