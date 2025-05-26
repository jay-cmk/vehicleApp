// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const AuthScreen = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     mobileNumber: '',
//     email: '',
//     password: '',
//     address: '',
//   });

//   const handleChange = (name, value) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const url = isLogin
//         ? 'http://localhost:5000/api/users/login'
//         : 'http://localhost:5000/api/users/register';

//       const payload = isLogin
//         ? { email: formData.email, password: formData.password }
//         : formData;

//       const response = await axios.post(url, payload);
//       const { token, message } = response.data;

//       await AsyncStorage.setItem('token', token);
//       Alert.alert('Success', message);
      
//       // Reset form if it was signup
//       if (!isLogin) {
//         setFormData({
//           fullName: '',
//           mobileNumber: '',
//           email: '',
//           password: '',
//           address: '',
//         });
//       }
      
//       // TODO: Navigate to home screen
//     } catch (error) {
//       const errMsg = error.response?.data?.message || 'Something went wrong';
//       Alert.alert('Error', errMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       className="flex-1 bg-gray-50"
//     >
//       <ScrollView 
//         contentContainerStyle={{ flexGrow: 1 }}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View className="flex-1 justify-center px-6 py-8">
//           <View className="bg-white rounded-2xl shadow-md p-6">
//             <Text className="text-3xl font-bold text-center text-gray-800 mb-2">
//               {isLogin ? 'Welcome Back' : 'Create Account'}
//             </Text>
//             <Text className="text-center text-gray-500 mb-6">
//               {isLogin ? 'Sign in to continue' : 'Join us to get started'}
//             </Text>

//             {!isLogin && (
//               <>
//                 <TextInput
//                   placeholder="Full Name"
//                   className="border border-gray-200 rounded-xl px-4 py-3 mb-3 text-base bg-gray-50"
//                   value={formData.fullName}
//                   onChangeText={text => handleChange('fullName', text)}
//                 />
//                 <TextInput
//                   placeholder="Mobile Number"
//                   keyboardType="phone-pad"
//                   className="border border-gray-200 rounded-xl px-4 py-3 mb-3 text-base bg-gray-50"
//                   value={formData.mobileNumber}
//                   onChangeText={text => handleChange('mobileNumber', text)}
//                 />
//                 <TextInput
//                   placeholder="Address"
//                   className="border border-gray-200 rounded-xl px-4 py-3 mb-3 text-base bg-gray-50"
//                   value={formData.address}
//                   onChangeText={text => handleChange('address', text)}
//                 />
//               </>
//             )}

//             <TextInput
//               placeholder="Email"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               className="border border-gray-200 rounded-xl px-4 py-3 mb-3 text-base bg-gray-50"
//               value={formData.email}
//               onChangeText={text => handleChange('email', text)}
//             />
//             <TextInput
//               placeholder="Password"
//               secureTextEntry
//               className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-base bg-gray-50"
//               value={formData.password}
//               onChangeText={text => handleChange('password', text)}
//             />

//             <TouchableOpacity
//               onPress={handleSubmit}
//               className={`rounded-xl py-3 mt-2 ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
//               disabled={loading}
//             >
//               <Text className="text-white text-center font-semibold text-lg">
//                 {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => setIsLogin(prev => !prev)}
//               className="mt-4"
//             >
//               <Text className="text-center text-gray-600">
//                 {isLogin
//                   ? "Don't have an account? "
//                   : 'Already have an account? '}
//                 <Text className="text-blue-600 font-semibold">
//                   {isLogin ? 'Sign Up' : 'Sign In'}
//                 </Text>
//               </Text>
//             </TouchableOpacity>

//             {isLogin && (
//               <TouchableOpacity className="mt-2">
//                 <Text className="text-center text-blue-600">Forgot password?</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default AuthScreen;