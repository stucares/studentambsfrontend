import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, Copy, Check } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { getLevelInfo, copyToClipboard } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { demoMode, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedTask, setCopiedTask] = useState(null);

  useEffect(() => {
    if (demoMode) {
      // Load demo data
      setStats({
        referralCount: user.referralCount,
        creditPoints: user.creditPoints,
        activeTasks: 3
      });
      setTasks([
        {
          id: 1,
          title: 'Share Math Course',
          description: 'Share our premium Math course with your network',
          productLink: 'https://stucare.com/math-course',
          messageTemplate: 'Check out this amazing Math course! Use my code: {{CODE}}',
          pointsReward: 20,
          isActive: true
        },
        {
          id: 2,
          title: 'Promote Science Bootcamp',
          description: 'Spread the word about our Science bootcamp',
          productLink: 'https://stucare.com/science-bootcamp',
          messageTemplate: 'Join the Science bootcamp with my referral code: {{CODE}}',
          pointsReward: 30,
          isActive: true
        },
        {
          id: 3,
          title: 'English Learning Program',
          description: 'Help students improve their English skills',
          productLink: 'https://stucare.com/english-program',
          messageTemplate: 'Improve your English with this program! Code: {{CODE}}',
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
      const [statsRes, tasksRes] = await Promise.all([
        api.get('/ambassador/stats'),
        api.get('/ambassador/tasks'),
      ]);
      setStats(statsRes.data.stats);
      setTasks(tasksRes.data.tasks);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleCopyMessage = async (taskId, message) => {
    const success = await copyToClipboard(message);
    if (success) {
      setCopiedTask(taskId);
      toast.success('Message copied! Share it now! 🚀');
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
          <p className="text-gray-300">Track your performance and complete tasks</p>
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
          <h2 className="text-2xl font-bold mb-4">Available Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass-card p-6 hover:scale-105 transition-transform"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{task.title}</h3>
                  {task.pointsReward > 0 && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      +{task.pointsReward} pts
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mb-4">{task.description}</p>
                
                <div className="bg-white/5 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-400 mb-1">Share this message:</p>
                  <p className="text-sm font-mono">{task.messageTemplate}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyMessage(task.id, task.messageTemplate)}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
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
                    className="btn-secondary"
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
      </motion.div>
    </div>
  );
};

export default Dashboard;
