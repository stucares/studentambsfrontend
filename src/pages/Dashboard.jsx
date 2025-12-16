import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, Copy, Check, Lock, AlertCircle, MessageCircle } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { getLevelInfo, copyToClipboard } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';
import WhatsAppPopup from '../components/WhatsAppPopup';

const Dashboard = () => {
  const { demoMode, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedTask, setCopiedTask] = useState(null);
  const [codeApproved, setCodeApproved] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState(null);

  useEffect(() => {
    // Fetch WhatsApp link from popup settings
    const fetchPopupSettings = async () => {
      try {
        const res = await api.get('/premium/popup-settings');
        if (res.data.success && res.data.settings.whatsappLink) {
          setWhatsappLink(res.data.settings.whatsappLink);
        }
      } catch (error) {
        console.log('Could not fetch popup settings');
      }
    };
    fetchPopupSettings();

    if (demoMode) {
      // Load demo data
      const ambassadorCode = user.uniqueCode;
      setStats({
        referralCount: user.referralCount,
        creditPoints: user.creditPoints,
        activeTasks: 3,
        uniqueCode: ambassadorCode
      });
      
      // Replace {{CODE}} placeholder with actual ambassador code
      setTasks([
        {
          id: 1,
          title: 'Share Math Course',
          description: 'Share our premium Math course with your network',
          productLink: 'https://stucare.com/math-course',
          productThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
          messageTemplate: `Check out this amazing Math course! Use my code: ${ambassadorCode}`,
          pointsReward: 20,
          isActive: true
        },
        {
          id: 2,
          title: 'Promote Science Bootcamp',
          description: 'Spread the word about our Science bootcamp',
          productLink: 'https://stucare.com/science-bootcamp',
          productThumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400',
          messageTemplate: `Join the Science bootcamp with my referral code: ${ambassadorCode}`,
          pointsReward: 30,
          isActive: true
        },
        {
          id: 3,
          title: 'English Learning Program',
          description: 'Help students improve their English skills',
          productLink: 'https://stucare.com/english-program',
          productThumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
          messageTemplate: `Improve your English with this program! Code: ${ambassadorCode}`,
          pointsReward: 25,
          isActive: true
        }
      ]);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [demoMode]);

  const fetchData = async () => {
    try {
      const [statsRes, tasksRes, profileRes] = await Promise.all([
        api.get('/ambassador/stats'),
        api.get('/ambassador/tasks'),
        api.get('/ambassador/profile'),
      ]);
      const ambassadorCode = profileRes.data.ambassador.uniqueCode;
      const isApproved = profileRes.data.ambassador.uniqueCodeApproved;
      setCodeApproved(isApproved);
      setStats({...statsRes.data.stats, uniqueCode: ambassadorCode});
      
      // Replace {{CODE}} placeholder in all task messages
      const tasksWithCode = tasksRes.data.tasks.map(task => ({
        ...task,
        messageTemplate: task.messageTemplate.replace(/\{\{CODE\}\}/gi, ambassadorCode || 'PENDING')
      }));
      
      setTasks(tasksWithCode);
      setLoading(false);
      
      // Show warning if code not approved
      if (!isApproved) {
        toast('⏳ Your tasks are locked until admin approves your unique code', {
          duration: 5000,
          icon: '🔒'
        });
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleCopyMessage = async (task) => {
    // Create rich formatted message with thumbnail and link
    const richMessage = `${task.messageTemplate}

🔗 Product Link: ${task.productLink}
${task.productThumbnail ? `\n📸 Preview: ${task.productThumbnail}` : ''}

✨ Shared by a Stucare Ambassador`;

    const success = await copyToClipboard(richMessage);
    if (success) {
      setCopiedTask(task.id);
      toast.success('Message copied with product details! 🚀');
      setTimeout(() => setCopiedTask(null), 2000);
    } else {
      toast.error('Failed to copy message');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-400">Failed to load dashboard data</p>
          <button onClick={() => window.location.reload()} className="btn-primary mt-4">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const levelInfo = getLevelInfo(stats.referralCount);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">Track your performance and complete tasks</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-3 rounded-xl ${levelInfo.color}`}>
                <span className="text-2xl">{levelInfo.emoji}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{levelInfo.name}</h3>
            <p className="text-sm text-gray-400">Current Level</p>
            {levelInfo.next && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress to {getLevelInfo(levelInfo.next).name}</span>
                  <span>{Math.round(levelInfo.progress)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${levelInfo.progress}%` }}
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                  />
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.referralCount}</h3>
            <p className="text-sm text-gray-400">Total Referrals</p>
            <p className="text-xs text-green-400 mt-1">
              {stats.completedReferrals} completed
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.creditPoints}</h3>
            <p className="text-sm text-gray-400">Credit Points</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-pink-500/20 rounded-xl">
                <Target className="w-6 h-6 text-pink-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.pendingReferrals}</h3>
            <p className="text-sm text-gray-400">Pending Referrals</p>
          </motion.div>
        </div>

        {/* Unique Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 mb-8"
        >
          <h3 className="text-xl font-bold mb-4">Your Unique Referral Code</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white/5 rounded-xl p-4 border-2 border-dashed border-primary-500">
              <p className="text-3xl font-mono font-bold text-center gradient-text">
                {stats.uniqueCode}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(stats.uniqueCode)}
              className="btn-secondary"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            This code is automatically included in all your task messages
          </p>
        </motion.div>

        {/* Tasks Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Available Tasks</h2>
            {stats.isPremium && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <Award className="w-4 h-4" />
                {stats.pointsMultiplier}x Points Active
              </span>
            )}
          </div>
          
          {/* Lock Message */}
          {!codeApproved && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
              <div className="flex items-start">
                <Lock className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-yellow-800 mb-1">
                    Tasks Locked 🔒
                  </h3>
                  <p className="text-sm text-yellow-700">
                    Your tasks are currently locked. Admin needs to approve your unique code first.
                    You'll be notified once approved and can start earning points!
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`glass-card p-6 relative ${task.isPremiumTask ? 'border-2 border-purple-500/50' : ''} ${!codeApproved ? 'opacity-50' : 'hover:scale-105'} transition-transform`}
              >
                {/* Lock Overlay */}
                {!codeApproved && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg z-10 backdrop-blur-sm">
                    <div className="text-center">
                      <Lock className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-600">Awaiting Approval</p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{task.title}</h3>
                    {task.isPremiumTask && (
                      <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  {task.pointsReward > 0 && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      +{stats.isPremium ? task.pointsReward * 2 : task.pointsReward} pts
                    </span>
                  )}
                </div>

                {/* Product Thumbnail */}
                {task.productThumbnail && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={task.productThumbnail} 
                      alt={task.title}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                      }}
                    />
                  </div>
                )}

                <p className="text-gray-600 mb-4">{task.description}</p>
                
                <div className="bg-white/5 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-400 mb-1">Share this message:</p>
                  <p className="text-sm font-mono whitespace-pre-wrap">{task.messageTemplate}</p>
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <p className="text-xs text-gray-500">+ Product link and thumbnail will be included</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyMessage(task)}
                    disabled={!codeApproved}
                    className={`flex-1 btn-primary flex items-center justify-center gap-2 ${!codeApproved ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {copiedTask === task.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Message
                      </>
                    )}
                  </button>
                  <a
                    href={task.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-secondary ${!codeApproved ? 'pointer-events-none opacity-50' : ''}`}
                  >
                    View Product
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {tasks.length === 0 && (
            <div className="glass-card p-12 text-center">
              <p className="text-gray-400 text-lg">No tasks available at the moment</p>
              <p className="text-gray-500 text-sm mt-2">Check back later for new opportunities!</p>
            </div>
          )}
        </motion.div>

        {/* WhatsApp Join Button */}
        {whatsappLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 flex items-center justify-between hover:bg-green-500/10 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <MessageCircle className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                    Join Our WhatsApp Community
                  </h3>
                  <p className="text-gray-400">Connect with fellow ambassadors, get tips & exclusive updates!</p>
                </div>
              </div>
              <div className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                Join Now
              </div>
            </a>
          </motion.div>
        )}
      </motion.div>

      {/* WhatsApp Popup */}
      <WhatsAppPopup trigger="dashboard" />
    </div>
  );
};

export default Dashboard;
