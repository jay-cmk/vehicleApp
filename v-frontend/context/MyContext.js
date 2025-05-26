// MyContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

// 1. Create Context
export const MyContext = createContext();

// 2. Create Provider Component
export const MyProvider = ({ children }) => {
  const [user, setUser] = useState(null);

useEffect(() => {
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setUser(token);
      console.log("token my =", token); // ✅ Logs actual token
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  getToken();
}, []);
 
  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};
