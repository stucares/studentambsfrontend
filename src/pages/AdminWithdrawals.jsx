import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { Wallet, Clock, CheckCircle, XCircle, AlertCircle, Settings, Save } from 'lucide-react';

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    minWithdrawalPoints: 100,
    pointsToRupeeRatio: 1.00,
    withdrawalLockDays: 7,
    processingMessage: ''
  });

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const [withdrawalsRes, settingsRes] = await Promise.all([
        api.get(`/admin/withdrawals${filter !== 'all' ? `?status=${filter}` : ''}`),
        api.get('/admin/settings')
      ]);
      
      setWithdrawals(withdrawalsRes.data.withdrawals);
      setSettings(settingsRes.data.settings);
      setSettingsForm(settingsRes.data.settings);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load withdrawals');
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status, transactionId = '') => {
    try {
      await api.put(`/admin/withdrawals/${id}`, {
        status,
        transactionId: transactionId || undefined
      });
      
      toast.success('Withdrawal status updated');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    
    try {
      await api.put('/admin/settings', settingsForm);
      toast.success('Settings updated successfully');
      setShowSettings(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { icon: Clock, color: 'bg-yellow-500/20 text-yellow-400', text: 'Pending' },
      processing: { icon: AlertCircle, color: 'bg-blue-500/20 text-blue-400', text: 'Processing' },
      completed: { icon: CheckCircle, color: 'bg-green-500/20 text-green-400', text: 'Completed' },
      rejected: { icon: XCircle, color: 'bg-red-500/20 text-red-400', text: 'Rejected' }
    };
    
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
        <Icon className="w-4 h-4" />
        {badge.text}
      </span>
    );
  };

  const stats = {
    total: withdrawals.length,
    pending: withdrawals.filter(w => w.status === 'pending').length,
    processing: withdrawals.filter(w => w.status === 'processing').length,
    completed: withdrawals.filter(w => w.status === 'completed').length,
    totalAmount: withdrawals
      .filter(w => w.status === 'completed')
      .reduce((sum, w) => sum + parseFloat(w.amount), 0)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">Withdrawal Management</h1>
        <button
          onClick={() => setShowSettings(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="glass-card p-5">
          <p className="text-gray-600 text-sm font-medium mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-gray-600 text-sm font-medium mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-gray-600 text-sm font-medium mb-1">Processing</p>
          <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-gray-600 text-sm font-medium mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-gray-600 text-sm font-medium mb-1">Total Paid</p>
          <p className="text-2xl font-bold text-gray-900">₹{stats.totalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'pending', 'processing', 'completed', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg capitalize transition-all ${
              filter === status
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 hover:bg-white/10 text-gray-400'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Withdrawals Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Date</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Ambassador</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Points</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Amount</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">UPI ID</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-4 px-4 text-white">
                    {new Date(withdrawal.requestedAt).toLocaleDateString()}
                    <br />
                    <span className="text-sm text-gray-400">
                      {new Date(withdrawal.requestedAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-gray-900 font-medium">{withdrawal.ambassador.name}</p>
                      <p className="text-sm text-gray-600">{withdrawal.ambassador.email}</p>
                      <p className="text-sm text-gray-600">{withdrawal.ambassador.phoneNumber}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900 font-semibold">{withdrawal.points}</td>
                  <td className="py-4 px-4 text-gray-900 font-semibold">₹{withdrawal.amount}</td>
                  <td className="py-4 px-4">
                    <code className="text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded font-medium">
                      {withdrawal.upiId}
                    </code>
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(withdrawal.status)}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      {withdrawal.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(withdrawal.id, 'processing')}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 text-sm"
                          >
                            Process
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(withdrawal.id, 'rejected')}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {withdrawal.status === 'processing' && (
                        <button
                          onClick={() => {
                            const txnId = prompt('Enter Transaction ID:');
                            if (txnId) {
                              handleUpdateStatus(withdrawal.id, 'completed', txnId);
                            }
                          }}
                          className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 text-sm"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Withdrawal Settings</h3>
            
            <form onSubmit={handleUpdateSettings} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Minimum Withdrawal Points
                </label>
                <input
                  type="number"
                  value={settingsForm.minWithdrawalPoints}
                  onChange={(e) => setSettingsForm({ ...settingsForm, minWithdrawalPoints: parseInt(e.target.value) })}
                  className="input-field"
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  Minimum points required to request withdrawal
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Points to Rupee Ratio
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settingsForm.pointsToRupeeRatio}
                  onChange={(e) => setSettingsForm({ ...settingsForm, pointsToRupeeRatio: parseFloat(e.target.value) })}
                  className="input-field"
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  How many rupees per point (e.g., 1.00 means 100 points = ₹100)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Withdrawal Lock Period (Days)
                </label>
                <input
                  type="number"
                  value={settingsForm.withdrawalLockDays}
                  onChange={(e) => setSettingsForm({ ...settingsForm, withdrawalLockDays: parseInt(e.target.value) })}
                  className="input-field"
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  Days users must wait between withdrawals
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Processing Message
                </label>
                <textarea
                  value={settingsForm.processingMessage}
                  onChange={(e) => setSettingsForm({ ...settingsForm, processingMessage: e.target.value })}
                  className="input-field"
                  rows="3"
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  Message shown to users after withdrawal request
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Settings
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminWithdrawals;
