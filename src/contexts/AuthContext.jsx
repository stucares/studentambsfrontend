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
    
    console.log('AuthContext initializing...', { token: token?.substring(0, 20), type, isDemoMode });
    
    if (isDemoMode) {
      // Load demo user
      console.log('Loading demo user...');
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
      console.log('Token and type found, fetching profile...');
      setUserType(type);
      fetchUserProfile(type);
    } else {
      console.log('No token or type found, setting loading to false');
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (type) => {
    try {
      const endpoint = type === 'admin' ? '/admin/dashboard/stats' : '/ambassador/profile';
      console.log('Fetching profile from:', endpoint);
      
      const response = await api.get(endpoint);
      console.log('Profile response:', response.data);
      
      if (type === 'admin') {
        setUser({ type: 'admin', ...response.data });
      } else {
        setUser(response.data.ambassador);
      }
      console.log('User set successfully:', response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      // Don't logout on profile fetch failure, just stop loading
      // The user is still authenticated with a valid token
      setLoading(false);
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
      console.log('Login attempt:', { endpoint, email, isAdmin });
      
      const response = await api.post(endpoint, { email, password });
      console.log('Login response:', response.data);
      
      const { token } = response.data;
      const userData = response.data.ambassador || response.data.admin;
      const type = isAdmin ? 'admin' : 'ambassador';
      
      console.log('Storing token and user type:', { token: token.substring(0, 20) + '...', type });
      
      localStorage.setItem('token', token);
      localStorage.setItem('userType', type);
      
      setUserType(type);
      setUser(userData);
      
      console.log('Login successful, user set:', userData);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
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

  const refreshUser = async () => {
    const type = localStorage.getItem('userType');
    if (type && !demoMode) {
      await fetchUserProfile(type);
    }
  };

  const value = {
    user,
    userType,
    loading,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated: !!user,
    isAdmin: userType === 'admin',
    demoMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
