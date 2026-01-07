import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { getLevelInfo } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';
import { BadgeCheck, Star, Crown, Sparkles, ArrowRight, Copy, AlertCircle, Camera, X, Upload, MessageCircle } from 'lucide-react';

const Account = () => {
  const navigate = useNavigate();
  const { demoMode, user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [updatingAvatar, setUpdatingAvatar] = useState(false);
  const [customImagePreview, setCustomImagePreview] = useState(null);
  const [uploadingCustom, setUploadingCustom] = useState(false);

  const avatarOptions = [
    { id: 1, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Alex&backgroundColor=b6e3f4' },
    { id: 2, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Sam&backgroundColor=c0aede' },
    { id: 3, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Jordan&backgroundColor=ffd5dc' },
    { id: 4, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Taylor&backgroundColor=d1f4e0' },
    { id: 5, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Morgan&backgroundColor=ffe8cc' },
    { id: 6, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Casey&backgroundColor=ffeaa7' },
    { id: 7, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Riley&backgroundColor=fab1a0' },
    { id: 8, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Jamie&backgroundColor=74b9ff' },
    { id: 9, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Dakota&backgroundColor=a29bfe' },
    { id: 10, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Avery&backgroundColor=fd79a8' },
    { id: 11, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Parker&backgroundColor=81ecec' },
    { id: 12, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Quinn&backgroundColor=55efc4' },
    { id: 13, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=River&backgroundColor=ff9ff3' },
    { id: 14, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Skyler&backgroundColor=feca57' },
    { id: 15, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Jaden&backgroundColor=54a0ff' },
    { id: 16, url: 'https://api.dicebear.com/7.x/open-peeps/svg?seed=Sage&backgroundColor=5f27cd' },
  ];

  useEffect(() => {
    if (demoMode) {
      // Load demo data
      setProfile(authUser);
      setStats({
        referralCount: authUser.referralCount,
        creditPoints: authUser.creditPoints
      });
      setLoading(false);
    } else {
      fetchProfile();
    }
  }, [demoMode]);

  const fetchProfile = async () => {
    try {
      const [profileRes, statsRes] = await Promise.all([
        api.get('/ambassador/profile'),
        api.get('/ambassador/stats'),
      ]);
      setProfile(profileRes.data.ambassador);
      setStats(statsRes.data.stats);
      setLoading(false);
    } catch (error) {
      toast.error(error.userMessage || 'Unable to load profile. Please refresh the page.');
      setLoading(false);
    }
  };

  const handleUpdateAvatar = async () => {
    if (!selectedAvatar && !customImagePreview) {
      toast.error('Please select an avatar or upload an image');
      return;
    }

    setUpdatingAvatar(true);
    try {
      const avatarUrl = customImagePreview || selectedAvatar;
      await api.put('/ambassador/profile', { avatar: avatarUrl });
      setProfile({ ...profile, avatar: avatarUrl });
      toast.success('Profile picture updated successfully!');
      setShowAvatarModal(false);
      setCustomImagePreview(null);
      setSelectedAvatar(null);
    } catch (error) {
      toast.error(error.userMessage || 'Unable to update profile picture. Please try again.');
    } finally {
      setUpdatingAvatar(false);
    }
  };

  const handleCustomImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploadingCustom(true);
    const reader = new FileReader();

    reader.onloadend = () => {
      setCustomImagePreview(reader.result);
      setSelectedAvatar(null); // Deselect avatar if custom image is uploaded
      setUploadingCustom(false);
      toast.success('Image loaded! Click Update to save.');
    };

    reader.onerror = () => {
      toast.error('Failed to read image file');
      setUploadingCustom(false);
    };

    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
      </div>
    );
  }

  const levelInfo = getLevelInfo(stats.referralCount);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text text-center">My ID Card</h1>

        <div className="flex flex-col gap-8">
          {/* Ambassador ID Card - Mobile Friendly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg mx-auto"
          >
            {/* Single Blue Card with Modern Design */}
            <div className="relative w-full aspect-[9/17] sm:aspect-[5/7] rounded-3xl overflow-hidden shadow-2xl">
              {/* Blue gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400"></div>

              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}></div>
              </div>

              {/* Content */}
              <div className="relative h-full p-7 sm:p-10 flex flex-col">
                {/* Header with logos */}
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-white/95 px-4 py-2 rounded-lg shadow-md flex items-center gap-3">
                    <img src="/stucare_logo.png" alt="Stucare" className="h-8 w-auto" />
                    <p className="text-xl font-bold text-gray-400">×</p>
                    <img src="/3048_Scholare_HK-JPG-01__1_-removebg-preview.png" alt="Scholare" className="h-8 w-auto" />
                  </div>
                </div>

                {/* Profile Photo - Large Circular */}
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white/30 overflow-hidden bg-white shadow-2xl">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => setShowAvatarModal(true)}
                      className="absolute bottom-2 right-2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group-hover:bg-primary-500 group-hover:text-white"
                      title="Edit avatar"
                    >
                      <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>

                {/* Name and Role */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h2 className="text-white text-2xl sm:text-3xl font-bold uppercase tracking-wide">
                      {profile.name}
                    </h2>
                    {profile.isPremium && (
                      <div className="relative">
                        <BadgeCheck className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 drop-shadow-lg" style={{ fill: 'white', stroke: '#ac63e6' }} />
                      </div>
                    )}
                  </div>
                  <p className="text-white/80 text-sm sm:text-base uppercase tracking-widest font-medium">
                    {profile.isPremium ? 'Premium Ambassador' : 'Student Ambassador'}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-1">College</p>
                      <p className="text-white text-sm font-semibold">{profile.collegeName}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-white text-sm font-semibold">{profile.phoneNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Email</p>
                      <p className="text-white text-sm font-semibold truncate">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Age</p>
                      <p className="text-white text-sm font-semibold">{profile.age} years</p>
                    </div>
                  </div>
                </div>

                {/* Ambassador Code and Level */}
                <div className="mt-auto pt-3 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Ambassador Code</p>
                        {profile.uniqueCodeApproved ? (
                          <p className="text-white font-mono font-bold text-base sm:text-lg tracking-wider">{profile.uniqueCode}</p>
                        ) : (
                          <p className="text-white/50 text-sm italic">Pending Approval</p>
                        )}
                      </div>
                      {profile.uniqueCodeApproved && (
                        <button
                          onClick={async () => {
                            try {
                              if (navigator.clipboard && window.isSecureContext) {
                                await navigator.clipboard.writeText(profile.uniqueCode);
                                toast.success('Code copied to clipboard!');
                              } else {
                                const textArea = document.createElement('textarea');
                                textArea.value = profile.uniqueCode;
                                textArea.style.position = 'fixed';
                                textArea.style.left = '-999999px';
                                document.body.appendChild(textArea);
                                textArea.focus();
                                textArea.select();
                                try {
                                  document.execCommand('copy');
                                  toast.success('Code copied to clipboard!');
                                } catch (err) {
                                  toast.error('Failed to copy. Please copy manually.');
                                }
                                document.body.removeChild(textArea);
                              }
                            } catch (err) {
                              console.error('Copy failed:', err);
                              toast.error('Failed to copy. Please copy manually.');
                            }
                          }}
                          className="mt-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                          title="Copy to clipboard"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white/40">
                      <span className="text-white font-bold text-sm">{levelInfo.emoji} {levelInfo.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto w-full"
          >
            <div className="glass-card p-4 text-center">
              <p className="text-3xl font-bold gradient-text mb-1">{stats.referralCount}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Referrals</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-3xl font-bold gradient-text mb-1">{stats.creditPoints}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Points</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl mb-1">{levelInfo.emoji}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">{levelInfo.name}</p>
            </div>
          </motion.div>

          {/* Referral Code Status Section */}
          {!profile.uniqueCodeApproved && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-md mx-auto w-full"
            >
              <div className="glass-card p-6 bg-yellow-50 border-l-4 border-yellow-400">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-yellow-800 mb-1">
                      Code Pending Approval
                    </h3>
                    <p className="text-sm text-yellow-700 mb-2">
                      Your unique referral code is awaiting admin approval. Once approved, you'll be able to share it with friends and start earning referral points!
                    </p>
                    <div className="flex items-center gap-2 text-xs text-yellow-600">
                      <div className="animate-pulse">⏳</div>
                      <span>Admin will review your code shortly</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Referral Code Section (when approved) */}
          {profile.uniqueCodeApproved && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="max-w-md mx-auto w-full"
            >
              <div className="glass-card p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Your Referral Code</h3>
                <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border-2 border-purple-200 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Share this code</p>
                    <p className="text-2xl font-bold text-purple-600 font-mono">{profile.uniqueCode}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        try {
                          // Modern clipboard API
                          if (navigator.clipboard && window.isSecureContext) {
                            await navigator.clipboard.writeText(profile.uniqueCode);
                            toast.success('Referral code copied!');
                          } else {
                            // Fallback for older browsers or non-HTTPS
                            const textArea = document.createElement('textarea');
                            textArea.value = profile.uniqueCode;
                            textArea.style.position = 'fixed';
                            textArea.style.left = '-999999px';
                            document.body.appendChild(textArea);
                            textArea.focus();
                            textArea.select();
                            try {
                              document.execCommand('copy');
                              toast.success('Referral code copied!');
                            } catch (err) {
                              toast.error('Failed to copy. Please copy manually.');
                            }
                            document.body.removeChild(textArea);
                          }
                        } catch (err) {
                          console.error('Copy failed:', err);
                          toast.error('Failed to copy. Please copy manually.');
                        }
                      }}
                      className="p-3 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
                      title="Copy Code"
                    >
                      <Copy className="h-5 w-5 text-purple-600" />
                    </button>
                    <button
                      onClick={() => {
                        const registrationUrl = `${window.location.origin}/register?ref=${profile.uniqueCode}`;
                        const message = `🎉 Join me as a Stucare Ambassador and earn rewards!\n\nUse my referral code: *${profile.uniqueCode}*\n\n👉 Register here: ${registrationUrl}\n\nStart earning points today! 🚀`;
                        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                        toast.success('Opening WhatsApp...');
                      }}
                      className="p-3 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                      title="Share on WhatsApp"
                    >
                      <MessageCircle className="h-5 w-5 text-green-600" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Share this code to refer friends and earn points! 🎉
                </p>
              </div>
            </motion.div>
          )}

          {/* Premium Status / Upgrade Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto w-full"
          >
            {profile.isPremium ? (
              <div className="glass-card p-6 bg-gradient-to-r from-primary-500/10 to-lime-500/10 border border-primary-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-lime-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">Premium Member</h3>
                      <BadgeCheck className="w-5 h-5 text-primary-500" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {profile.premiumExpiresAt
                        ? `Valid until ${new Date(profile.premiumExpiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`
                        : 'All premium benefits unlocked'}
                    </p>
                  </div>
                </div>
                {profile.meetingScheduled && (
                  <button
                    onClick={() => navigate('/meeting-scheduled')}
                    className="w-full mt-4 py-3 bg-primary-100 text-primary-700 rounded-xl font-medium hover:bg-primary-200 transition-colors"
                  >
                    View Meeting Details
                  </button>
                )}
              </div>
            ) : (
              <div className="glass-card p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-lime-400 to-lime-500 text-black px-4 py-1 text-xs font-bold rounded-bl-xl">
                  90% OFF
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-lime-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Upgrade to Premium</h3>
                    <p className="text-sm text-gray-600">Get verified badge, exclusive tasks & more</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-gray-900">₹19</span>
                    <span className="text-gray-400 line-through">₹199</span>
                    <span className="text-sm text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                      Verified Blue Tick Badge
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      Exclusive Daily Tasks
                    </li>
                    <li className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-primary-500" />
                      2x Points on Referrals
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => navigate('/premium-upgrade')}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Get Premium @ ₹19
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">
                  💰 Get ₹19 back after completing 1 task
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={() => setShowAvatarModal(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-6 gradient-text">Choose Your Profile Picture</h2>

            {/* Custom Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 text-gray-300">
                Upload Custom Image
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="glass-card p-6 hover:bg-white/10 transition-all border-2 border-dashed border-white/20 hover:border-primary-500 flex flex-col items-center gap-3">
                    <Upload className="w-8 h-8 text-primary-500" />
                    <div className="text-center">
                      <p className="font-semibold text-white">Click to upload</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Custom Image Preview */}
                {customImagePreview && (
                  <div className="relative">
                    <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-primary-500 shadow-lg">
                      <img
                        src={customImagePreview}
                        alt="Custom preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => setCustomImagePreview(null)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    <p className="text-xs text-center text-green-400 mt-2 font-semibold">✓ Ready to update</p>
                  </div>
                )}
              </div>
              {uploadingCustom && (
                <div className="flex items-center gap-2 mt-3 text-primary-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-primary-400"></div>
                  <span className="text-sm">Loading image...</span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0a0e27] text-gray-400">OR CHOOSE AN AVATAR</span>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
              {avatarOptions.map((avatar) => (
                <motion.div
                  key={avatar.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAvatar(avatar.url)}
                  className={`cursor-pointer rounded-xl p-2 transition-all ${selectedAvatar === avatar.url
                    ? 'bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10'
                    }`}
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-white">
                    <img
                      src={avatar.url}
                      alt={`Avatar ${avatar.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedAvatar === avatar.url && (
                    <div className="flex justify-center mt-2">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAvatarModal(false)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateAvatar}
                disabled={(!selectedAvatar && !customImagePreview) || updatingAvatar}
                className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {updatingAvatar ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    Update Profile Picture
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Account;
