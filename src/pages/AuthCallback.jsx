import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login: setAuthState } = useAuth();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if authentication was successful
        const success = searchParams.get('success');
        const error = searchParams.get('error');
        const message = searchParams.get('message');
        const data = searchParams.get('data');

        if (error) {
          // Authentication failed
          console.error('❌ OAuth error:', error, message);
          setStatus('error');
          toast.error(message || 'Google authentication failed');
          
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          return;
        }

        if (!success || !data) {
          console.error('❌ Missing callback data');
          setStatus('error');
          toast.error('Invalid callback data');
          
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          return;
        }

        // Parse the authentication data
        const authData = JSON.parse(decodeURIComponent(data));
        const { token, user } = authData;

        if (!token || !user) {
          console.error('❌ Invalid auth data structure');
          setStatus('error');
          toast.error('Invalid authentication response');
          
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          return;
        }

        // Store the token
        localStorage.setItem('token', token);
        localStorage.setItem('userType', 'ambassador');

        console.log('✅ Google OAuth successful:', user);
        setStatus('success');

        // Show appropriate welcome message
        if (user.profileIncomplete) {
          toast.success(`Welcome, ${user.name}! Please complete your profile.`);
          setTimeout(() => {
            navigate('/account'); // Redirect to profile completion
          }, 1000);
        } else {
          toast.success(`Welcome back, ${user.name}! 🎉`);
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }

      } catch (error) {
        console.error('❌ Callback processing error:', error);
        setStatus('error');
        toast.error('Failed to process authentication');
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, setAuthState]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
      >
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 mx-auto mb-4">
              <svg className="animate-spin h-16 w-16 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Completing Sign In...
            </h2>
            <p className="text-gray-600">
              Please wait while we finish setting up your account
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Success! ✨
            </h2>
            <p className="text-gray-600">
              You're being redirected to your dashboard...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600">
              Redirecting you back to login...
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AuthCallback;
