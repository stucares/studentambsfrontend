import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Try admin login first
    let result = await login(formData.email, formData.password, true);
    
    // If admin login fails, try ambassador login
    if (!result.success) {
      result = await login(formData.email, formData.password, false);
    }
    
    setLoading(false);

    if (result.success) {
      toast.success(`Welcome back! 👋`);
      // Check user type from localStorage
      const userType = localStorage.getItem('userType');
      navigate(userType === 'admin' ? '/admin' : '/dashboard');
    } else {
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
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="••••••••"
                required
              />
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
    </div>
  );
};

export default Login;
