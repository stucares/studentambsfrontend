import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import WhatsAppPopup from '../components/WhatsAppPopup';
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <img
              src="/stucare_logo.png"
              alt="Stucare"
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-gray-400">×</span>
            <img
              src="/3048_Scholare_HK-JPG-01__1_-removebg-preview.png"
              alt="Scholare"
              className="h-10 w-auto"
            />
          </motion.div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Login to your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
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
            <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
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
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-500 hover:text-primary-600 font-semibold">
              Register now
            </Link>
          </p>
        </div>
      </motion.div>

      {/* WhatsApp Popup */}
      <WhatsAppPopup trigger="login" />
    </div>
  );
};

export default Login;
