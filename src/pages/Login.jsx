import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { validateEmail, validatePassword } from '../utils/validators';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, userType } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const googleButtonRef = useRef(null);

  // Rate limiting state
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && userType) {
      console.log('Already authenticated, redirecting...', { isAuthenticated, userType });
      navigate(userType === 'admin' ? '/admin' : '/dashboard', { replace: true });
    }
  }, [isAuthenticated, userType, navigate]);

  // Initialize Google Sign-In
  useEffect(() => {
    const initializeGoogle = () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

      if (!clientId) {
        console.error('VITE_GOOGLE_CLIENT_ID is missing in environment variables');
        return;
      }

      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        console.log('GIS Initialized');
      }
    };

    if (window.google) {
      initializeGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          initializeGoogle();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  const handleGoogleCallback = async (response) => {
    if (response.credential) {
      try {
        setLoading(true);
        const res = await api.post('/auth/google', { token: response.credential });

        const { token, ambassador } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userType', 'ambassador');

        toast.success('Login successful!');
        window.location.href = '/dashboard';

      } catch (error) {
        console.error('Google Login Error:', error);
        toast.error(error.response?.data?.message || 'Google Login Failed');
        setLoading(false);
      }
    }
  };

  // Rate limiting constants
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 300; // 5 minutes in seconds

  // Check lockout status on component mount
  useEffect(() => {
    const checkLockout = () => {
      const lockoutUntil = localStorage.getItem('loginLockoutUntil');
      const attempts = parseInt(localStorage.getItem('loginAttempts') || '0');

      setLoginAttempts(attempts);

      if (lockoutUntil) {
        const lockoutTime = parseInt(lockoutUntil);
        const now = Date.now();

        if (now < lockoutTime) {
          setIsLocked(true);
          const remaining = Math.ceil((lockoutTime - now) / 1000);
          setLockoutRemaining(remaining);
        } else {
          // Lockout expired, clear data
          localStorage.removeItem('loginLockoutUntil');
          localStorage.removeItem('loginAttempts');
          setIsLocked(false);
          setLoginAttempts(0);
        }
      }
    };

    checkLockout();
  }, []);

  // Countdown timer during lockout
  useEffect(() => {
    if (isLocked && lockoutRemaining > 0) {
      const timer = setInterval(() => {
        setLockoutRemaining(prev => {
          if (prev <= 1) {
            // Lockout expired
            setIsLocked(false);
            localStorage.removeItem('loginLockoutUntil');
            localStorage.removeItem('loginAttempts');
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLocked, lockoutRemaining]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if locked out
    if (isLocked) {
      const minutes = Math.floor(lockoutRemaining / 60);
      const seconds = lockoutRemaining % 60;
      toast.error(`Too many failed attempts. Please wait ${minutes}m ${seconds}s`);
      return;
    }

    // Validate before submitting
    if (!validate()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    setLoading(true);

    console.log('Starting login process...');

    // Try admin login first
    let result = await login(formData.email, formData.password, true);

    console.log('Admin login result:', result);

    // If admin login fails, try ambassador login
    if (!result.success) {
      console.log('Admin login failed, trying ambassador login...');
      result = await login(formData.email, formData.password, false);
      console.log('Ambassador login result:', result);
    }

    setLoading(false);

    if (result.success) {
      // Success - reset attempts
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('loginLockoutUntil');
      setLoginAttempts(0);

      toast.success(`Welcome back! 👋`);
      const storedUserType = localStorage.getItem('userType');
      console.log('Login successful, navigating to:', storedUserType === 'admin' ? '/admin' : '/dashboard');
      navigate(storedUserType === 'admin' ? '/admin' : '/dashboard', { replace: true });
    } else {
      // Failed login - increment attempts
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem('loginAttempts', newAttempts.toString());

      if (newAttempts >= MAX_ATTEMPTS) {
        // Lock the user out
        const lockoutUntil = Date.now() + (LOCKOUT_DURATION * 1000);
        localStorage.setItem('loginLockoutUntil', lockoutUntil.toString());
        setIsLocked(true);
        setLockoutRemaining(LOCKOUT_DURATION);
        toast.error(`Too many failed attempts. You are locked out for ${LOCKOUT_DURATION / 60} minutes.`);
      } else {
        const remainingAttempts = MAX_ATTEMPTS - newAttempts;
        console.error('Login failed:', result.message);
        toast.error(`${result.message} (${remainingAttempts} attempts remaining)`);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-3 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 max-w-md w-full max-h-[95vh] overflow-y-auto"
      >
        <div className="text-center mb-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <img
              src="/stucare_logo.png"
              alt="Stucare"
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold text-gray-400">×</span>
            <img
              src="/3048_Scholare_HK-JPG-01__1_-removebg-preview.png"
              alt="Scholare"
              className="h-8 w-auto"
            />
          </motion.div>
          <h1 className="text-2xl font-bold gradient-text mb-1">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Login to your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field pl-10 pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Lockout Warning */}
          {isLocked && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 text-sm font-medium text-center">
                🔒 Too many failed attempts. Please wait{' '}
                <span className="font-bold">
                  {Math.floor(lockoutRemaining / 60)}m {lockoutRemaining % 60}s
                </span>
                {' '}before trying again.
              </p>
            </div>
          )}

          {/* Attempt Counter Warning */}
          {!isLocked && loginAttempts > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-yellow-800 text-sm text-center">
                ⚠️ {MAX_ATTEMPTS - loginAttempts} attempts remaining
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || isLocked}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : isLocked ? 'Locked' : 'Login'}
          </button>

          <div className="relative my-2.5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>


          {/* Custom Google Sign-In Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => window.google?.accounts.id.prompt()}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white" />
              </svg>
              Sign in with Google
            </button>
          </div>
        </form>

        <div className="mt-3 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-500 hover:text-primary-600 font-semibold">
              Register now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
