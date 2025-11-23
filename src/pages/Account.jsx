import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { getLevelInfo } from '../utils/helpers';

const Account = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

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
      toast.error('Failed to load profile');
      setLoading(false);
    }
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
            className="w-full max-w-md mx-auto"
          >
            {/* Single Blue Card with Modern Design */}
            <div className="relative w-full aspect-[9/16] sm:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
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
              <div className="relative h-full p-6 sm:p-8 flex flex-col">
                {/* Header with My ID Card label */}
                <div className="flex items-center justify-between mb-8">
                  <div className="bg-white/95 px-3 py-2 rounded-lg shadow-md">
                    <img src="/StuCare's TM.png" alt="Stucare Logo" className="h-8 sm:h-10 w-auto" />
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/>
                    </svg>
                    <span className="text-xs sm:text-sm uppercase tracking-wider font-medium">My ID Card</span>
                  </div>
                </div>

                {/* Profile Photo - Large Circular */}
                <div className="flex justify-center mb-6">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-white/30 overflow-hidden bg-white shadow-2xl">
                    <img 
                      src={profile.avatar} 
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name and Role */}
                <div className="text-center mb-6">
                  <h2 className="text-white text-2xl sm:text-3xl font-bold uppercase tracking-wide mb-1">
                    {profile.name}
                  </h2>
                  <p className="text-white/80 text-sm sm:text-base uppercase tracking-widest font-medium">
                    Student Ambassador
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
                        <p className="text-white font-mono font-bold text-base sm:text-lg tracking-wider">{profile.uniqueCode}</p>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(profile.uniqueCode);
                          toast.success('Code copied to clipboard!');
                        }}
                        className="mt-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>
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
            className="grid grid-cols-3 gap-4 max-w-md mx-auto w-full"
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
        </div>
      </motion.div>
    </div>
  );
};

export default Account;
