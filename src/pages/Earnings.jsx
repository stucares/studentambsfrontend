import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { Wallet, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, IndianRupee } from 'lucide-react';
import { validateUpiId, validateWithdrawalAmount } from '../utils/validators';
import { sanitizeFormData } from '../utils/sanitizer';


const Earnings = () => {
  const [stats, setStats] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, historyRes] = await Promise.all([
        api.get('/withdrawal/stats'),
        api.get('/withdrawal/history')
      ]);

      setStats(statsRes.data.stats);
      setWithdrawals(historyRes.data.withdrawals);
      setUpiId(statsRes.data.stats.upiId || '');
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error(error.userMessage || 'Unable to load earnings data. Please refresh the page.');
      setLoading(false);
    }
  };

  const handleWithdrawRequest = async (e) => {
    e.preventDefault();

    // Validate inputs
    const errors = {};

    const upiError = validateUpiId(upiId);
    if (upiError) errors.upiId = upiError;

    const points = parseInt(withdrawAmount);
    const amountError = validateWithdrawalAmount(
      withdrawAmount,
      stats.minWithdrawalPoints,
      stats.availablePoints
    );
    if (amountError) errors.withdrawAmount = amountError;

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Please fix the errors before submitting');
      return;
    }

    setValidationErrors({});
    setSubmitting(true);

    try {
      // Sanitize data before sending
      const sanitizedData = sanitizeFormData(
        { points, upiId },
        { upiId: 'string' }
      );

      const response = await api.post('/withdrawal/request', sanitizedData);

      toast.success(response.data.message);
      setShowWithdrawModal(false);
      setWithdrawAmount('');
      setUpiId('');
      fetchData();
    } catch (error) {
      toast.error(error.userMessage || 'Unable to process withdrawal request. Please try again.');
    } finally {
      setSubmitting(false);
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
      <span className={`inline - flex items - center gap - 1 px - 3 py - 1 rounded - full text - sm font - medium ${badge.color} `}>
        <Icon className="w-4 h-4" />
        {badge.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
      </div>
    );
  }

  const calculateAmount = (points) => {
    return (points * parseFloat(stats?.pointsToRupeeRatio || 1)).toFixed(2);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Earnings</h2>

        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary-500/20 p-3 rounded-xl">
                  <Wallet className="w-8 h-8 text-primary-400" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Available Points</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats?.availablePoints || 0}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    ≈ ₹{calculateAmount(stats?.availablePoints || 0)}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Withdrawn</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats?.totalWithdrawn || 0}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    ≈ ₹{calculateAmount(stats?.totalWithdrawn || 0)}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-xl">
                  <Clock className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Pending Requests</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats?.pendingWithdrawals || 0}</h3>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Withdrawal Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Withdraw Earnings</h3>
                <p className="text-gray-600">
                  Minimum withdrawal: {stats?.minWithdrawalPoints} points (₹{calculateAmount(stats?.minWithdrawalPoints)})
                </p>
                {stats?.daysUntilNextWithdrawal > 0 && (
                  <p className="text-yellow-600 text-sm mt-2 font-medium">
                    Next withdrawal available in {stats.daysUntilNextWithdrawal} days
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowWithdrawModal(true)}
                disabled={!stats?.canWithdraw}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Request Withdrawal
              </button>
            </div>
          </motion.div>

          {/* Withdrawal History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Withdrawal History</h3>

            {withdrawals.length === 0 ? (
              <div className="text-center py-12">
                <Wallet className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No withdrawal history yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Date</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Points</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">UPI ID</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Status</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold text-sm">Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((withdrawal) => (
                      <tr key={withdrawal.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="py-4 px-4 text-gray-900 text-sm">
                          {new Date(withdrawal.requestedAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-gray-900 font-semibold text-sm">{withdrawal.points}</td>
                        <td className="py-4 px-4 text-gray-900 font-semibold text-sm">₹{withdrawal.amount}</td>
                        <td className="py-4 px-4 text-gray-700 text-sm">{withdrawal.upiId}</td>
                        <td className="py-4 px-4">{getStatusBadge(withdrawal.status)}</td>
                        <td className="py-4 px-4 text-gray-700 text-sm">
                          {withdrawal.transactionId || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Withdrawal Modal */}
          {showWithdrawModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 max-w-md w-full"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Withdrawal</h3>            <form onSubmit={handleWithdrawRequest} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Points to Withdraw
                    </label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      min={stats?.minWithdrawalPoints}
                      max={stats?.availablePoints}
                      className="input-field"
                      placeholder={`Min: ${stats?.minWithdrawalPoints} `}
                      required
                    />
                    {withdrawAmount && (
                      <p className="text-sm text-gray-700 mt-2 font-medium">
                        You will receive: ₹{calculateAmount(withdrawAmount)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="input-field"
                      placeholder="yourname@upi"
                      required
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      {stats?.processingMessage || 'Your withdrawal request will be processed within 24 hours'}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowWithdrawModal(false)}
                      className="flex-1 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? 'Processing...' : 'Request'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Earnings;
