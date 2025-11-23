import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, TrendingUp, CheckCircle, Plus, Edit, Trash2 } from 'lucide-react';
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

  const handleUpdateStats = async (ambassadorId, referralCount, creditPoints) => {
    try {
      await api.put(`/admin/ambassadors/${ambassadorId}/stats`, {
        referralCount: parseInt(referralCount),
        creditPoints: parseInt(creditPoints),
      });
      toast.success('Stats updated successfully');
      fetchDashboardData();
      setEditingAmbassador(null);
    } catch (error) {
      toast.error('Failed to update stats');
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.totalTasks}</h3>
            <p className="text-sm text-gray-400">Total Tasks</p>
            <p className="text-xs text-green-400 mt-1">{stats.activeTasks} active</p>
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
                className="glass-card p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{task.title}</h3>
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
          <h2 className="text-2xl font-bold mb-4">Ambassadors</h2>
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
                {ambassadors.map((ambassador) => (
                  <tr key={ambassador.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4 font-semibold">{ambassador.name}</td>
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
                ))}
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
    messageTemplate: '',
    pointsReward: 0,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(ambassador.id, referralCount, creditPoints);
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
          
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1">
              Update Stats
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
