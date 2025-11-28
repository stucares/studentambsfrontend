import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, User, Phone, GraduationCap, Hash } from 'lucide-react';
import AvatarSelector from '../components/AvatarSelector';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    collegeName: '',
    phoneNumber: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.phoneNumber.length !== 10 || !/^\d{10}$/.test(formData.phoneNumber)) {
      toast.error('Phone number must be exactly 10 digits');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: parseInt(formData.age),
      collegeName: formData.collegeName,
      phoneNumber: formData.phoneNumber,
      avatar: formData.avatar,
    });

    setLoading(false);

    if (result.success) {
      toast.success('Registration successful! Welcome aboard! 🎉');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 max-w-2xl w-full"
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
              src="/scholare-logo.svg" 
              alt="Scholare" 
              className="h-10 w-auto"
            />
          </motion.div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Join Stucare</h1>
          <p className="text-gray-600">Become a Student Ambassador</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AvatarSelector 
            selectedAvatar={formData.avatar}
            onSelect={(avatar) => setFormData({ ...formData, avatar })}
          />
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Age</label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="20"
                  required
                  min="16"
                  max="100"
                />
              </div>
            </div>
          </div>

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
            <label className="block text-sm font-medium mb-2 text-gray-700">College Name</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="University Name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number (10 digits)</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="1234567890"
                required
                pattern="\d{10}"
                maxLength="10"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Must be exactly 10 digits</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
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
                  minLength="6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Creating Account...' : 'Join Now'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
