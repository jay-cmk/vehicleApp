import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [fullName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber,setMobileNumber]=useState('')
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword || !mobileNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        fullName,
        mobileNumber,
        email,
        password
      });

      const token = response.data.token;
      console.log("token",token)
      navigation.navigate('MainTabs',{token});
      
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error.response?.data?.message || 'An error occurred during registration'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50 justify-center p-6">
      <View className="bg-white p-8 rounded-lg shadow-md">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-8">
          Create a new account
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Full Name</Text>
            <TextInput
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="Full Name"
              value={fullName}
              onChangeText={setName}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">mobile number</Text>
            <TextInput
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Email address</Text>
            <TextInput
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Password</Text>
            <TextInput
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Confirm Password</Text>
            <TextInput
              className="border border-gray-300 rounded-md px-4 py-2"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity
          className={`mt-6 py-3 px-4 rounded-md flex items-center justify-center bg-indigo-600 ${loading ? 'opacity-70' : ''}`}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-medium">Register</Text>
          )}
        </TouchableOpacity>

        <View className="mt-4 flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-indigo-600 font-medium">Sign in here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;