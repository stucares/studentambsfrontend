import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, DollarSign, Sparkles, Calendar, Gift, Users, Upload, MessageCircle } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminPremiumSettings = () => {
  const [activeTab, setActiveTab] = useState('premium');
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
  const [referralSettings, setReferralSettings] = useState({
    pointsPerReferral: 50,
    bonusForPremiumReferral: 100,
    enabled: true
  });
  const [popupSettings, setPopupSettings] = useState({
    enabled: true,
    title: 'Join Our Community! 🎉',
    message: 'Connect with fellow ambassadors and get exclusive updates!',
    buttonText: 'Join WhatsApp Group',
    whatsappLink: '',
    showAfterSeconds: 3,
    showOnLogin: true,
    showOnRegister: true,
    showOnDashboard: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const [premiumRes, referralRes, popupRes] = await Promise.all([
        api.get('/admin/premium/settings'),
        api.get('/premium/referral-settings'),
        api.get('/premium/popup-settings')
      ]);
      setSettings(premiumRes.data.settings);
      setReferralSettings(referralRes.data.settings);
      setPopupSettings(popupRes.data.settings);
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

  const handleSaveReferralSettings = async () => {
    setSaving(true);
    try {
      await api.put('/premium/referral-settings', referralSettings);
      toast.success('Referral settings saved successfully! 🎉');
    } catch (error) {
      toast.error('Failed to save referral settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePopupSettings = async () => {
    setSaving(true);
    try {
      await api.put('/premium/popup-settings', popupSettings);
      toast.success('WhatsApp popup settings saved successfully! 🎉');
    } catch (error) {
      toast.error('Failed to save popup settings');
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

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b-2 border-gray-200">
          <button
            onClick={() => setActiveTab('premium')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'premium'
                ? 'text-primary-600 border-b-4 border-primary-600 -mb-0.5'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Premium Settings
            </div>
          </button>
          <button
            onClick={() => setActiveTab('referral')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'referral'
                ? 'text-primary-600 border-b-4 border-primary-600 -mb-0.5'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Referral Settings
            </div>
          </button>
          <button
            onClick={() => setActiveTab('popup')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'popup'
                ? 'text-primary-600 border-b-4 border-primary-600 -mb-0.5'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Popup
            </div>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'premium' && (
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
        )}

        {activeTab === 'referral' && (
          <div className="space-y-6">
          {/* Referral Points */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-800">Referral Points Configuration</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-300">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                  <span className="text-2xl">💰</span>
                  Points Per Referral (CSV Upload Base)
                </label>
                <input
                  type="number"
                  value={referralSettings.pointsPerReferral}
                  onChange={(e) => setReferralSettings({
                    ...referralSettings,
                    pointsPerReferral: parseInt(e.target.value)
                  })}
                  className="input-field w-full text-lg font-bold"
                  min="0"
                  step="10"
                />
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-red-700 font-bold bg-red-100 p-2 rounded mb-2">
                    🎯 <strong>Points awarded ONLY when referred user purchases premium</strong>
                  </p>
                  <p className="text-xs text-gray-700 font-semibold">
                    ✓ Registration = Referral count increases
                  </p>
                  <p className="text-xs text-gray-700 font-semibold">
                    ✓ Premium purchase = Referrer gets points
                  </p>
                  <p className="text-xs text-green-700 mt-2 bg-green-100 p-2 rounded">
                    <strong>Example:</strong> User A refers User B. User B registers (A's referral count +1, but no points yet). User B buys premium → User A gets {referralSettings.pointsPerReferral} points + {referralSettings.bonusForPremiumReferral} bonus = {referralSettings.pointsPerReferral + referralSettings.bonusForPremiumReferral} total points.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bonus for Premium Referrals
                </label>
                <input
                  type="number"
                  value={referralSettings.bonusForPremiumReferral}
                  onChange={(e) => setReferralSettings({
                    ...referralSettings,
                    bonusForPremiumReferral: parseInt(e.target.value)
                  })}
                  className="input-field w-full"
                  min="0"
                  step="10"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Extra points when referred user becomes premium member
                </p>
              </div>
            </div>
          </div>

          {/* Referral System Status */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-800">System Status</h2>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">Referral System</h3>
                <p className="text-sm text-gray-600">Enable or disable the entire referral system</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={referralSettings.enabled}
                  onChange={(e) => setReferralSettings({
                    ...referralSettings,
                    enabled: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>

          {/* Info Box */}
          <div className="glass-card p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <h3 className="font-semibold text-gray-800 mb-2">How Referral System Works</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">1.</span>
                <span>Ambassador shares their unique referral code with friends</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">2.</span>
                <span>New user enters code during registration → <strong>Referral count increases</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">3.</span>
                <span>When referred user <strong>purchases premium</strong> → Referrer earns {referralSettings.pointsPerReferral} points</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">4.</span>
                <span>Plus additional +{referralSettings.bonusForPremiumReferral} bonus points for premium referral</span>
              </li>
              <li className="flex items-start gap-2 bg-yellow-100 p-2 rounded">
                <span className="text-orange-600 font-bold">⚠️</span>
                <span className="text-orange-800"><strong>Important:</strong> Points are awarded only when the referred user buys premium, not at registration.</span>
              </li>
            </ul>
          </div>

          {/* CSV Upload Info */}
          <div className="glass-card p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
            <div className="flex items-start gap-3">
              <Upload className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Bulk Update via CSV</h3>
                <p className="text-sm text-gray-700 mb-2">
                  You can update referral counts in bulk by uploading a CSV file from the Ambassador Dashboard.
                </p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>CSV updates referral counts from Shopify data</li>
                  <li><strong>Points are awarded only when referred users purchase premium</strong></li>
                  <li>CSV format: uniqueCode, referralCount</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveReferralSettings}
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Referral Settings'}
            </button>
          </div>
        </div>
        )}

        {activeTab === 'popup' && (
          <div className="space-y-6">
            {/* WhatsApp Link */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-bold text-gray-800">WhatsApp Group Link</h2>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Group Invite Link
                </label>
                <input
                  type="url"
                  value={popupSettings.whatsappLink}
                  onChange={(e) => setPopupSettings({ ...popupSettings, whatsappLink: e.target.value })}
                  className="input-field w-full"
                  placeholder="https://chat.whatsapp.com/your-group-link"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Paste your WhatsApp group invite link here
                </p>
              </div>
            </div>

            {/* Popup Content */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-800">Popup Content</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Popup Title
                  </label>
                  <input
                    type="text"
                    value={popupSettings.title}
                    onChange={(e) => setPopupSettings({ ...popupSettings, title: e.target.value })}
                    className="input-field w-full"
                    placeholder="Join Our Community! 🎉"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Popup Message
                  </label>
                  <textarea
                    value={popupSettings.message}
                    onChange={(e) => setPopupSettings({ ...popupSettings, message: e.target.value })}
                    className="input-field w-full"
                    rows={3}
                    placeholder="Connect with fellow ambassadors..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={popupSettings.buttonText}
                    onChange={(e) => setPopupSettings({ ...popupSettings, buttonText: e.target.value })}
                    className="input-field w-full"
                    placeholder="Join WhatsApp Group"
                  />
                </div>
              </div>
            </div>

            {/* Popup Timing */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-800">Popup Timing</h2>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Show After (seconds)
                </label>
                <input
                  type="number"
                  value={popupSettings.showAfterSeconds}
                  onChange={(e) => setPopupSettings({ ...popupSettings, showAfterSeconds: parseInt(e.target.value) })}
                  className="input-field w-full"
                  min="0"
                  max="60"
                />
                <p className="text-xs text-gray-500 mt-1">
                  How many seconds to wait before showing the popup (0 = immediately)
                </p>
              </div>
            </div>

            {/* Popup Display Settings */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-bold text-gray-800">Display Settings</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">Popup Enabled</h3>
                    <p className="text-sm text-gray-600">Master switch for the popup</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={popupSettings.enabled}
                      onChange={(e) => setPopupSettings({ ...popupSettings, enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">Show on Login</h3>
                    <p className="text-sm text-gray-600">Display popup after user logs in</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={popupSettings.showOnLogin}
                      onChange={(e) => setPopupSettings({ ...popupSettings, showOnLogin: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">Show on Register</h3>
                    <p className="text-sm text-gray-600">Display popup after user registers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={popupSettings.showOnRegister}
                      onChange={(e) => setPopupSettings({ ...popupSettings, showOnRegister: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">Show on Dashboard</h3>
                    <p className="text-sm text-gray-600">Display popup when visiting dashboard</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={popupSettings.showOnDashboard}
                      onChange={(e) => setPopupSettings({ ...popupSettings, showOnDashboard: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="glass-card p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <h3 className="font-semibold text-gray-800 mb-4">📱 Popup Preview</h3>
              <div className="bg-white rounded-xl p-6 shadow-lg border max-w-sm mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{popupSettings.title || 'Join Our Community!'}</h4>
                  <p className="text-gray-600 mb-4">{popupSettings.message || 'Connect with fellow ambassadors...'}</p>
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold">
                    {popupSettings.buttonText || 'Join WhatsApp Group'}
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSavePopupSettings}
                disabled={saving}
                className="btn-primary flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Popup Settings'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPremiumSettings;
