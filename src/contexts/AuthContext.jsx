import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('userType');
    const isDemoMode = localStorage.getItem('demoMode') === 'true';
    
    if (isDemoMode) {
      // Load demo user
      setDemoMode(true);
      setUserType('ambassador');
      setUser({
        id: 1,
        name: 'Demo Ambassador',
        email: 'demo@student.edu',
        collegeName: 'Demo University',
        phoneNumber: '+91 98765 43210',
        age: 22,
        uniqueCode: 'STU12345678',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
        referralCount: 15,
        creditPoints: 150,
        level: 'Hustler',
        isActive: true
      });
      setLoading(false);
    } else if (token && type) {
      setUserType(type);
      fetchUserProfile(type);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (type) => {
    try {
      const endpoint = type === 'admin' ? '/admin/dashboard/stats' : '/ambassador/profile';
      const response = await api.get(endpoint);
      setUser(type === 'admin' ? { type: 'admin' } : response.data.ambassador);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      logout();
    }
  };

  const login = async (email, password, isAdmin = false) => {
    // Check for demo login
    if (email === 'demo@student.edu' && password === 'demo123') {
      localStorage.setItem('demoMode', 'true');
      localStorage.setItem('userType', 'ambassador');
      setDemoMode(true);
      setUserType('ambassador');
      setUser({
        id: 1,
        name: 'Demo Ambassador',
        email: 'demo@student.edu',
        collegeName: 'Demo University',
        phoneNumber: '+91 98765 43210',
        age: 22,
        uniqueCode: 'STU12345678',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
        referralCount: 15,
        creditPoints: 150,
        level: 'Hustler',
        isActive: true
      });
      return { success: true };
    }

    try {
      const endpoint = isAdmin ? '/auth/admin/login' : '/auth/login';
      const response = await api.post(endpoint, { email, password });
      
      const { token } = response.data;
      const type = isAdmin ? 'admin' : 'ambassador';
      
      localStorage.setItem('token', token);
      localStorage.setItem('userType', type);
      
      setUserType(type);
      setUser(isAdmin ? { type: 'admin' } : response.data.ambassador);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      const { token, ambassador } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userType', 'ambassador');
      
      setUserType('ambassador');
      setUser(ambassador);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('demoMode');
    setUser(null);
    setUserType(null);
    setDemoMode(false);
  };

  const value = {
    user,
    userType,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: userType === 'admin',
    demoMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
