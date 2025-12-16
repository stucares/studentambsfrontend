import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import WhatsAppPopup from '../components/WhatsAppPopup';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, userType } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && userType) {
      console.log('Already authenticated, redirecting...', { isAuthenticated, userType });
      navigate(userType === 'admin' ? '/admin' : '/dashboard', { replace: true });
    }
  }, [isAuthenticated, userType, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      toast.success(`Welcome back! 👋`);
      // Check user type from localStorage
      const storedUserType = localStorage.getItem('userType');
      console.log('Login successful, navigating to:', storedUserType === 'admin' ? '/admin' : '/dashboard');
      navigate(storedUserType === 'admin' ? '/admin' : '/dashboard', { replace: true });
    } else {
      console.error('Login failed:', result.message);
      toast.error(result.message);
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
              src="/StuCare's TM.png" 
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Logging in...' : 'Login'}
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
