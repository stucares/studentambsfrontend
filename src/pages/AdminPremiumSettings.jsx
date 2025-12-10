import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, DollarSign, Sparkles, Calendar, Gift } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminPremiumSettings = () => {
  const [settings, setSettings] = useState({
    premiumPrice: 19,
    lifetimePrice: 999,
    pointsMultiplier: 2,
    dailyTasksEnabled: true,
    welcomeKitEnabled: true,
    meetingDaysAfterPayment: 2,
    premiumDurationMonths: 1,
    cashfreeEnabled: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/admin/premium/settings');
      setSettings(response.data.settings);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load settings');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/admin/premium/settings', settings);
      toast.success('Settings saved! Users will see updated pricing immediately. ✨', {
        duration: 4000,
        icon: '🎉'
      });
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
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
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
            Premium Settings
          </h1>
          <p className="text-gray-600">Configure premium subscription features</p>
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Live Updates:</strong> Changes made here are immediately visible to all users on the premium upgrade page.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Pricing */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-800">Pricing</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Price (₹)
                </label>
                <input
                  type="number"
                  value={settings.premiumPrice}
                  onChange={(e) => setSettings({ ...settings, premiumPrice: parseFloat(e.target.value) })}
                  className="input-field w-full"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">Monthly subscription price</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lifetime Price (₹)
                </label>
                <input
                  type="number"
                  value={settings.lifetimePrice}
                  onChange={(e) => setSettings({ ...settings, lifetimePrice: parseFloat(e.target.value) })}
                  className="input-field w-full"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">One-time lifetime payment</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (Months)
                </label>
                <input
                  type="number"
                  value={settings.premiumDurationMonths}
                  onChange={(e) => setSettings({ ...settings, premiumDurationMonths: parseInt(e.target.value) })}
                  className="input-field w-full"
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">Premium membership duration</p>
              </div>
            </div>
          </div>

          {/* Points & Rewards */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-800">Points & Rewards</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points Multiplier (x)
              </label>
              <input
                type="number"
                value={settings.pointsMultiplier}
                onChange={(e) => setSettings({ ...settings, pointsMultiplier: parseFloat(e.target.value) })}
                className="input-field w-full"
                min="1"
                step="0.5"
              />
              <p className="text-xs text-gray-500 mt-1">
                Premium members earn {settings.pointsMultiplier}x points for each referral
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-800">Features</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Daily Tasks</h3>
                  <p className="text-sm text-gray-600">Access to exclusive daily tasks for premium members</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.dailyTasksEnabled}
                    onChange={(e) => setSettings({ ...settings, dailyTasksEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Welcome Kit</h3>
                  <p className="text-sm text-gray-600">Send welcome kit to new premium members</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.welcomeKitEnabled}
                    onChange={(e) => setSettings({ ...settings, welcomeKitEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">Cashfree Payments</h3>
                  <p className="text-sm text-gray-600">Enable real payment processing (disable for dev mode)</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.cashfreeEnabled}
                    onChange={(e) => setSettings({ ...settings, cashfreeEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Meeting */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-800">Meeting Scheduling</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schedule Meeting After (Days)
              </label>
              <input
                type="number"
                value={settings.meetingDaysAfterPayment}
                onChange={(e) => setSettings({ ...settings, meetingDaysAfterPayment: parseInt(e.target.value) })}
                className="input-field w-full"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Days after payment to automatically schedule onboarding meeting
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPremiumSettings;
