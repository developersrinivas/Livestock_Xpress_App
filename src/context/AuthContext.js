import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


export const AuthContext = createContext();

export const AuthProvider = ({ children, user: initialUser }) => {
  const [user, setUser] = useState(initialUser);

  const login = async (userData) => {
    Alert.alert('Login Successful', `Welcome, ${userData.name || 'User'}!`);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
