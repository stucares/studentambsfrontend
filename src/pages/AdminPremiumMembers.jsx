import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Calendar, Mail, Phone, CheckCircle, XCircle, Search, Filter, Download } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminPremiumMembers = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, expired
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchPremiumMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [searchTerm, filterStatus, members]);

  const fetchPremiumMembers = async () => {
    try {
      const response = await api.get('/admin/premium/members');
      setMembers(response.data.members);
      setFilteredMembers(response.data.members);
      setLoading(false);
    } catch (error) {
      toast.error(error.userMessage || 'Unable to load premium members. Please refresh the page.');
      setLoading(false);
    }
  };

  const filterMembers = () => {
    let filtered = [...members];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus === 'active') {
      filtered = filtered.filter(m => m.isPremium && new Date(m.premiumExpiresAt) > new Date());
    } else if (filterStatus === 'expired') {
      filtered = filtered.filter(m => !m.isPremium || new Date(m.premiumExpiresAt) <= new Date());
    }

    setFilteredMembers(filtered);
  };

  const handleRevokePremium = async (ambassadorId) => {
    if (!confirm('Are you sure you want to revoke premium access?')) return;

    setActionLoading(prev => ({ ...prev, [`${ambassadorId}-revoke`]: true }));
    try {
      await api.put(`/admin/premium/members/${ambassadorId}/revoke`);
      toast.success('Premium access revoked');
      fetchPremiumMembers();
    } catch (error) {
      toast.error(error.userMessage || 'Unable to revoke premium access. Please try again.');
    } finally {
      setActionLoading(prev => {
        const newState = { ...prev };
        delete newState[`${ambassadorId}-revoke`];
        return newState;
      });
    }
  };

  const handleExtendPremium = async (ambassadorId, months) => {
    setActionLoading(prev => ({ ...prev, [`${ambassadorId}-extend`]: true }));
    try {
      await api.put(`/admin/premium/members/${ambassadorId}/extend`, { months });
      toast.success(`Premium extended by ${months} month(s)`);
      fetchPremiumMembers();
    } catch (error) {
      toast.error(error.userMessage || 'Unable to extend premium. Please try again.');
    } finally {
      setActionLoading(prev => {
        const newState = { ...prev };
        delete newState[`${ambassadorId}-extend`];
        return newState;
      });
    }
  };

  const handleUpdateMeeting = async (ambassadorId, meetingDate, meetingLink) => {
    setActionLoading(prev => ({ ...prev, [`${ambassadorId}-meeting`]: true }));
    try {
      await api.put(`/admin/premium/members/${ambassadorId}/meeting`, {
        meetingDate,
        meetingLink,
        meetingScheduled: true
      });
      toast.success('Meeting details updated');
      fetchPremiumMembers();
    } catch (error) {
      toast.error(error.userMessage || 'Unable to update meeting details. Please try again.');
    } finally {
      setActionLoading(prev => {
        const newState = { ...prev };
        delete newState[`${ambassadorId}-meeting`];
        return newState;
      });
    }
  };

  const exportToCSV = () => {
    const csvData = filteredMembers.map(m => ({
      Name: m.name,
      Email: m.email,
      College: m.collegeName,
      Phone: m.phoneNumber,
      Status: m.isPremium ? 'Active' : 'Expired',
      ExpiresAt: new Date(m.premiumExpiresAt).toLocaleDateString(),
      MeetingScheduled: m.meetingScheduled ? 'Yes' : 'No',
      MeetingDate: m.meetingDate ? new Date(m.meetingDate).toLocaleString() : 'N/A'
    }));

    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `premium-members-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
      </div>
    );
  }

  const stats = {
    total: members.length,
    active: members.filter(m => m.isPremium && new Date(m.premiumExpiresAt) > new Date()).length,
    expired: members.filter(m => !m.isPremium || new Date(m.premiumExpiresAt) <= new Date()).length,
    meetingsScheduled: members.filter(m => m.meetingScheduled).length
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
            Premium Members
          </h1>
          <p className="text-gray-600">Manage premium subscriptions and meetings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Premium</p>
                <p className="text-3xl font-bold text-primary-500">{stats.total}</p>
              </div>
              <Crown className="w-10 h-10 text-primary-500" />
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-3xl font-bold text-green-500">{stats.active}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Expired</p>
                <p className="text-3xl font-bold text-red-500">{stats.expired}</p>
              </div>
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Meetings Scheduled</p>
                <p className="text-3xl font-bold text-blue-500">{stats.meetingsScheduled}</p>
              </div>
              <Calendar className="w-10 h-10 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
              <button
                onClick={exportToCSV}
                className="btn-secondary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="space-y-4">
          {filteredMembers.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-gray-500">No premium members found</p>
            </div>
          ) : (
            filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onRevoke={handleRevokePremium}
                onExtend={handleExtendPremium}
                onUpdateMeeting={handleUpdateMeeting}
                actionLoading={actionLoading}
              />
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

const MemberCard = ({ member, onRevoke, onExtend, onUpdateMeeting, actionLoading }) => {
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [meetingDate, setMeetingDate] = useState(member.meetingDate || '');
  const [meetingLink, setMeetingLink] = useState(member.meetingLink || '');

  const isActive = member.isPremium && new Date(member.premiumExpiresAt) > new Date();
  const daysLeft = Math.ceil((new Date(member.premiumExpiresAt) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
              alt={member.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                {member.name}
                {isActive && <Crown className="w-5 h-5 text-yellow-500" />}
              </h3>
              <p className="text-sm text-gray-600">{member.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-3">
            <div>
              <p className="text-gray-500">College</p>
              <p className="font-medium text-gray-700">{member.collegeName}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium text-gray-700">{member.phoneNumber}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                {isActive ? `Active (${daysLeft} days left)` : 'Expired'}
              </span>
            </div>
            <div>
              <p className="text-gray-500">Expires</p>
              <p className="font-medium text-gray-700">
                {new Date(member.premiumExpiresAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {member.meetingScheduled && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Meeting: {member.meetingDate ? new Date(member.meetingDate).toLocaleString() : 'Not set'}
              </p>
              {member.meetingLink && (
                <a
                  href={member.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline ml-6"
                >
                  {member.meetingLink}
                </a>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 md:min-w-[200px]">
          <button
            onClick={() => onExtend(member.id, 1)}
            disabled={actionLoading[`${member.id}-extend`]}
            className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading[`${member.id}-extend`] ? 'Extending...' : 'Extend +1 Month'}
          </button>
          <button
            onClick={() => setShowMeetingForm(!showMeetingForm)}
            className="btn-secondary text-sm"
          >
            {showMeetingForm ? 'Cancel' : 'Schedule Meeting'}
          </button>
          {isActive && (
            <button
              onClick={() => onRevoke(member.id)}
              disabled={actionLoading[`${member.id}-revoke`]}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading[`${member.id}-revoke`] ? 'Revoking...' : 'Revoke Premium'}
            </button>
          )}
        </div>
      </div>

      {showMeetingForm && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3 text-gray-800">Update Meeting Details</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Date & Time
              </label>
              <input
                type="datetime-local"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Link
              </label>
              <input
                type="url"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://calendly.com/..."
                className="input-field w-full"
              />
            </div>
            <button
              onClick={() => {
                onUpdateMeeting(member.id, meetingDate, meetingLink);
                setShowMeetingForm(false);
              }}
              disabled={actionLoading[`${member.id}-meeting`]}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading[`${member.id}-meeting`] ? 'Updating...' : 'Update Meeting'}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminPremiumMembers;
