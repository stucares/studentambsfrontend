import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, TrendingUp, CheckCircle, Plus, Edit, Trash2, Search } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [ambassadors, setAmbassadors] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingAmbassador, setEditingAmbassador] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ambassadorsRes, tasksRes] = await Promise.all([
        api.get('/admin/dashboard/stats'),
        api.get('/admin/ambassadors'),
        api.get('/admin/tasks'),
      ]);
      setStats(statsRes.data.stats);
      setAmbassadors(ambassadorsRes.data.ambassadors);
      setTasks(tasksRes.data.tasks);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  // Filter ambassadors based on search query
  const filteredAmbassadors = ambassadors.filter((ambassador) => {
    const query = searchQuery.toLowerCase();
    return (
      ambassador.name?.toLowerCase().includes(query) ||
      ambassador.email?.toLowerCase().includes(query) ||
      ambassador.collegeName?.toLowerCase().includes(query) ||
      ambassador.level?.toLowerCase().includes(query) ||
      ambassador.phoneNumber?.toLowerCase().includes(query)
    );
  });

  const handleUpdateStats = async (ambassadorId, referralCount, creditPoints, isPremium, premiumType) => {
    try {
      await api.put(`/admin/ambassadors/${ambassadorId}/stats`, {
        referralCount: parseInt(referralCount),
        creditPoints: parseInt(creditPoints),
        isPremium,
        premiumType
      });
      toast.success('Ambassador updated successfully');
      fetchDashboardData();
      setEditingAmbassador(null);
    } catch (error) {
      toast.error('Failed to update ambassador');
    }
  };

  const handleToggleStatus = async (ambassadorId) => {
    try {
      await api.put(`/admin/ambassadors/${ambassadorId}/toggle-status`);
      toast.success('Status updated');
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await api.delete(`/admin/tasks/${taskId}`);
      toast.success('Task deleted successfully');
      fetchDashboardData();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-300">Manage ambassadors and tasks</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.totalAmbassadors}</h3>
            <p className="text-sm text-gray-400">Total Ambassadors</p>
            <p className="text-xs text-green-400 mt-1">{stats.activeAmbassadors} active</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card p-6 border-2 border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1 text-purple-400">{stats.premiumAmbassadors || 0}</h3>
            <p className="text-sm text-gray-400">Premium Members</p>
            <p className="text-xs text-purple-400 mt-1">VIP users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Target className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.totalTasks}</h3>
            <p className="text-sm text-gray-400">Total Tasks</p>
            <p className="text-xs text-green-400 mt-1">{stats.activeTasks} active, {stats.premiumTasks || 0} premium</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-pink-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-pink-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.totalReferrals}</h3>
            <p className="text-sm text-gray-400">Total Referrals</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.completedReferrals}</h3>
            <p className="text-sm text-gray-400">Completed Referrals</p>
          </motion.div>
        </div>

        {/* Tasks Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Tasks Management</h2>
            <button
              onClick={() => setShowTaskModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Task
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`glass-card p-6 ${task.isPremiumOnly ? 'border-2 border-purple-500/50' : ''}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{task.title}</h3>
                      {task.isPremiumOnly && (
                        <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">
                          PREMIUM
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{task.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 mb-3">
                  <p className="text-xs text-gray-400 mb-1">Message Template:</p>
                  <p className="text-sm font-mono">{task.messageTemplate}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {task.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-sm font-bold text-yellow-400">+{task.pointsReward} pts</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ambassadors Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Ambassadors</h2>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, email, college, or level..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 font-bold text-lg"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {/* Search Results Summary */}
          {searchQuery && (
            <div className="mb-3 text-sm text-gray-600 font-medium">
              Found {filteredAmbassadors.length} ambassador{filteredAmbassadors.length !== 1 ? 's' : ''} matching "{searchQuery}"
            </div>
          )}
          
          <div className="glass-card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">College</th>
                  <th className="text-left p-4">Level</th>
                  <th className="text-center p-4">Referrals</th>
                  <th className="text-center p-4">Points</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-center p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAmbassadors.length > 0 ? (
                  filteredAmbassadors.map((ambassador) => (
                  <tr key={ambassador.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{ambassador.name}</span>
                        {ambassador.isPremium && (
                          <span className="bg-purple-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                            ⭐ VIP
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-400">{ambassador.email}</td>
                    <td className="p-4 text-sm">{ambassador.collegeName}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-xs font-bold">
                        {ambassador.level}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold">{ambassador.referralCount}</td>
                    <td className="p-4 text-center font-bold">{ambassador.creditPoints}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(ambassador.id)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          ambassador.isActive
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {ambassador.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setEditingAmbassador(ambassador)}
                        className="btn-secondary py-2 px-4 text-sm"
                      >
                        Edit Stats
                      </button>
                    </td>
                  </tr>
                ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-8 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Search className="w-12 h-12 text-gray-400" />
                        <p className="text-gray-400 text-lg">No ambassadors found matching "{searchQuery}"</p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="btn-secondary py-2 px-4 text-sm"
                        >
                          Clear Search
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Task Modal */}
        {showTaskModal && (
          <TaskModal
            onClose={() => setShowTaskModal(false)}
            onSuccess={() => {
              setShowTaskModal(false);
              fetchDashboardData();
            }}
          />
        )}

        {/* Edit Task Modal */}
        {editingTask && (
          <EditTaskModal
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onSuccess={() => {
              setEditingTask(null);
              fetchDashboardData();
            }}
          />
        )}

        {/* Edit Ambassador Modal */}
        {editingAmbassador && (
          <EditAmbassadorModal
            ambassador={editingAmbassador}
            onClose={() => setEditingAmbassador(null)}
            onUpdate={handleUpdateStats}
          />
        )}
      </motion.div>
    </div>
  );
};

// Task Modal Component
const TaskModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    productLink: '',
    productThumbnail: '',
    messageTemplate: '',
    pointsReward: 0,
    isPremiumOnly: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/tasks', formData);
      toast.success('Task created successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Task Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              rows="3"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Product Link</label>
            <input
              type="url"
              value={formData.productLink}
              onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Product Thumbnail URL (optional)</label>
            <input
              type="url"
              value={formData.productThumbnail}
              onChange={(e) => setFormData({ ...formData, productThumbnail: e.target.value })}
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
            {formData.productThumbnail && (
              <div className="mt-2">
                <img 
                  src={formData.productThumbnail} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Message Template (use {`{{CODE}}`} for unique code)
            </label>
            <textarea
              value={formData.messageTemplate}
              onChange={(e) => setFormData({ ...formData, messageTemplate: e.target.value })}
              className="input-field"
              rows="4"
              placeholder="Check out this amazing product! Use my code {{CODE}} for special offers."
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              💡 The product link and thumbnail will be automatically included when copied
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Points Reward</label>
            <input
              type="number"
              value={formData.pointsReward}
              onChange={(e) => setFormData({ ...formData, pointsReward: e.target.value })}
              className="input-field"
              min="0"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
            <input
              type="checkbox"
              id="isPremiumOnly"
              checked={formData.isPremiumOnly}
              onChange={(e) => setFormData({ ...formData, isPremiumOnly: e.target.checked })}
              className="w-5 h-5 rounded border-gray-600 text-purple-500 focus:ring-purple-500"
            />
            <label htmlFor="isPremiumOnly" className="text-sm font-medium cursor-pointer flex-1">
              <span className="text-purple-400">⭐ Premium Only Task</span>
              <p className="text-xs text-gray-400 mt-1">
                Only premium members will see and can complete this task
              </p>
            </label>
          </div>
          
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1">
              Create Task
            </button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Edit Ambassador Modal
const EditAmbassadorModal = ({ ambassador, onClose, onUpdate }) => {
  const [referralCount, setReferralCount] = useState(ambassador.referralCount);
  const [creditPoints, setCreditPoints] = useState(ambassador.creditPoints);
  const [isPremium, setIsPremium] = useState(ambassador.isPremium || false);
  const [premiumType, setPremiumType] = useState('monthly');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(ambassador.id, referralCount, creditPoints, isPremium, premiumType);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-6 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Ambassador Stats</h2>
        <p className="text-gray-300 mb-4">{ambassador.name}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Referral Count</label>
            <input
              type="number"
              value={referralCount}
              onChange={(e) => setReferralCount(e.target.value)}
              className="input-field"
              min="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Credit Points</label>
            <input
              type="number"
              value={creditPoints}
              onChange={(e) => setCreditPoints(e.target.value)}
              className="input-field"
              min="0"
              required
            />
          </div>

          <div className="border-t border-gray-600 pt-4">
            <h3 className="text-lg font-semibold mb-3 text-purple-400">Premium Status</h3>
            
            <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30 mb-3">
              <input
                type="checkbox"
                id="isPremium"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
                className="w-5 h-5 rounded border-gray-600 text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="isPremium" className="text-sm font-medium cursor-pointer flex-1">
                <span className="text-purple-400">⭐ Premium Member</span>
                <p className="text-xs text-gray-400 mt-1">
                  Grant premium access to this ambassador
                </p>
              </label>
            </div>

            {isPremium && (
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-2">Premium Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPremiumType('monthly')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      premiumType === 'monthly'
                        ? 'border-primary-500 bg-primary-500/20 text-primary-400'
                        : 'border-gray-600 bg-gray-700/30 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-sm font-bold">Monthly</div>
                    <div className="text-xs">1 Month</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPremiumType('lifetime')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      premiumType === 'lifetime'
                        ? 'border-purple-500 bg-purple-500/20 text-purple-400'
                        : 'border-gray-600 bg-gray-700/30 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-sm font-bold">Lifetime</div>
                    <div className="text-xs">Forever</div>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1">
              Update Ambassador
            </button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Edit Task Modal Component
const EditTaskModal = ({ task, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: task.title || '',
    description: task.description || '',
    productLink: task.productLink || '',
    productThumbnail: task.productThumbnail || '',
    messageTemplate: task.messageTemplate || '',
    pointsReward: task.pointsReward || 0,
    isActive: task.isActive !== undefined ? task.isActive : true,
    isPremiumOnly: task.isPremiumOnly || false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/tasks/${task.id}`, formData);
      toast.success('Task updated successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Task Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              rows="3"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Product Link</label>
            <input
              type="url"
              value={formData.productLink}
              onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Product Thumbnail URL (optional)</label>
            <input
              type="url"
              value={formData.productThumbnail}
              onChange={(e) => setFormData({ ...formData, productThumbnail: e.target.value })}
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
            {formData.productThumbnail && (
              <div className="mt-2">
                <img 
                  src={formData.productThumbnail} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Message Template (use {`{{CODE}}`} for unique code)
            </label>
            <textarea
              value={formData.messageTemplate}
              onChange={(e) => setFormData({ ...formData, messageTemplate: e.target.value })}
              className="input-field"
              rows="4"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Points Reward</label>
            <input
              type="number"
              value={formData.pointsReward}
              onChange={(e) => setFormData({ ...formData, pointsReward: e.target.value })}
              className="input-field"
              min="0"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
            <input
              type="checkbox"
              id="editIsActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-5 h-5 rounded border-gray-600 text-green-500 focus:ring-green-500"
            />
            <label htmlFor="editIsActive" className="text-sm font-medium cursor-pointer">
              <span className="text-green-400">✓ Task is Active</span>
            </label>
          </div>

          <div className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
            <input
              type="checkbox"
              id="editIsPremiumOnly"
              checked={formData.isPremiumOnly}
              onChange={(e) => setFormData({ ...formData, isPremiumOnly: e.target.checked })}
              className="w-5 h-5 rounded border-gray-600 text-purple-500 focus:ring-purple-500"
            />
            <label htmlFor="editIsPremiumOnly" className="text-sm font-medium cursor-pointer flex-1">
              <span className="text-purple-400">⭐ Premium Only Task</span>
              <p className="text-xs text-gray-400 mt-1">
                Only premium members will see and can complete this task
              </p>
            </label>
          </div>
          
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1">
              Update Task
            </button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
