import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            });

            const { token, user } = response.data;
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            Alert.alert('Login Success', `Welcome back, ${user.name || user.email}!`);
            navigation.navigate('MainTabs');
        } catch (error) {
            let errorMessage = 'An error occurred during login';
            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Invalid email or password';
                } else {
                    errorMessage = error.response.data.message || errorMessage;
                }
            }
            Alert.alert('Login Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-slate-50 p-5 justify-center">
            {/* Logo Section */}
            <View className="items-center mb-10">
                {/* <Image 
                    source={require('../assets/logo.png')} 
                    className="w-24 h-24 mb-5"
                    resizeMode="contain"
                /> */}
                <Text className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</Text>
                <Text className="text-base text-slate-500">Sign in to continue</Text>
            </View>

            {/* Form Section */}
            <View className="mb-5">
                {/* Email Input */}
                <View className="mb-5">
                    <Text className="text-sm text-slate-800 mb-2">Email</Text>
                    <View className={`flex-row items-center border rounded-lg px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}>
                        <Ionicons name="mail-outline" size={20} color="#6b7280" className="mr-2" />
                        <TextInput
                            className="flex-1 text-base"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>}
                </View>

                {/* Password Input */}
                <View className="mb-5">
                    <Text className="text-sm text-slate-800 mb-2">Password</Text>
                    <View className={`flex-row items-center border rounded-lg px-3 py-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}>
                        <Ionicons name="lock-closed-outline" size={20} color="#6b7280" className="mr-2" />
                        <TextInput
                            className="flex-1 text-base"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons 
                                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                                size={20} 
                                color="#6b7280" 
                            />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>}
                </View>

                {/* Login Button */}
                <TouchableOpacity 
                    className={`bg-indigo-600 rounded-lg py-3 items-center justify-center ${loading ? 'opacity-70' : ''}`}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-semibold text-base">Sign In</Text>
                    )}
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity 
                    className="items-center mt-4"
                    onPress={() => navigation.navigate('ForgetPasswordScreen')}
                >
                    <Text className="text-indigo-600 text-sm">Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center">
                <Text className="text-slate-600">Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text className="text-indigo-600 font-medium"> Sign Up</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

export default Login;