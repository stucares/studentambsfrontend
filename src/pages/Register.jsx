import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, User, Phone, GraduationCap, Hash, Eye, EyeOff, Upload, X, Search } from 'lucide-react';
import AvatarSelector from '../components/AvatarSelector';
import axios from 'axios';

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
    profileImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [useCustomImage, setUseCustomImage] = useState(false);
  
  // University autocomplete state
  const [universities, setUniversities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingUniversities, setLoadingUniversities] = useState(false);
  const universityInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch universities from API with debounce
  useEffect(() => {
    const searchUniversities = async () => {
      if (formData.collegeName.length < 2) {
        setUniversities([]);
        setShowSuggestions(false);
        return;
      }

      setLoadingUniversities(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/universities?name=${encodeURIComponent(formData.collegeName)}`
        );
        
        // Filter and limit results
        const filteredUniversities = response.data
          .slice(0, 15) // Limit to 15 results
          .map(uni => ({
            name: uni.name,
            country: uni.country,
            stateProvince: uni['state-province']
          }));
        
        setUniversities(filteredUniversities);
        setShowSuggestions(filteredUniversities.length > 0);
      } catch (error) {
        console.error('Error fetching universities:', error);
        setUniversities([]);
      } finally {
        setLoadingUniversities(false);
      }
    };

    const debounceTimer = setTimeout(searchUniversities, 150);
    return () => clearTimeout(debounceTimer);
  }, [formData.collegeName]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        universityInputRef.current &&
        !universityInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectUniversity = (universityName) => {
    setFormData({ ...formData, collegeName: universityName });
    setShowSuggestions(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Compress and create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Create canvas for compression
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate new dimensions (max 800x800)
          let width = img.width;
          let height = img.height;
          const maxSize = 800;
          
          if (width > height && width > maxSize) {
            height = (height / width) * maxSize;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width / height) * maxSize;
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          
          setImagePreview(compressedBase64);
          setFormData({ ...formData, profileImage: compressedBase64 });
          setUseCustomImage(true);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCustomImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, profileImage: null });
    setUseCustomImage(false);
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
      avatar: useCustomImage ? formData.profileImage : formData.avatar,
    });

    setLoading(false);

    if (result.success) {
      toast.success('Registration successful! Welcome aboard! 🎉');
      navigate('/premium-upgrade');
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
              src="/3048_Scholare_HK-JPG-01__1_-removebg-preview.png" 
              alt="Scholare" 
              className="h-10 w-auto"
            />
          </motion.div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Join Stucare</h1>
          <p className="text-gray-600">Become a Student Ambassador</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Selection or Custom Upload */}
          <div className="space-y-4">
            {!useCustomImage ? (
              <>
                <AvatarSelector 
                  selectedAvatar={formData.avatar}
                  onSelect={(avatar) => setFormData({ ...formData, avatar })}
                />
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Or upload your own photo</p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Profile Picture</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary-500"
                  />
                  <button
                    type="button"
                    onClick={removeCustomImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={removeCustomImage}
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  Choose avatar instead
                </button>
              </div>
            )}
          </div>
          
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

          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700">College/University Name</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-gray-400 z-10" />
              <input
                ref={universityInputRef}
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                onFocus={() => formData.collegeName.length >= 2 && universities.length > 0 && setShowSuggestions(true)}
                className="input-field pl-10 pr-10"
                placeholder="Start typing your university name..."
                required
                autoComplete="off"
              />
              {loadingUniversities && (
                <Search className="absolute right-3 top-3 w-5 h-5 text-primary-500 animate-pulse" />
              )}
            </div>
            
            {/* University Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && universities.length > 0 && (
                <motion.div
                  ref={suggestionsRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
                >
                  {universities.map((uni, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectUniversity(uni.name)}
                      className="w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors border-b border-gray-100 last:border-b-0 focus:bg-primary-50 focus:outline-none"
                    >
                      <div className="font-medium text-gray-800">{uni.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {uni.stateProvince && `${uni.stateProvince}, `}{uni.country}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                  required
                  minLength="6"
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

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
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
