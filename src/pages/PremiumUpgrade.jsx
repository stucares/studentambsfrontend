import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BadgeCheck,
  Gift,
  Zap,
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  Shield,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const PremiumUpgrade = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // 'monthly' or 'lifetime'
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/premium/settings');
      setSettings(response.data.settings);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      // Use defaults if API fails
      setSettings({
        premiumPrice: 19,
        lifetimePrice: 999,
        pointsMultiplier: 2
      });
    }
  };

  useEffect(() => {
    // Check if user is already premium
    if (user?.isPremium) {
      navigate('/meeting-scheduled');
      return;
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [user, navigate]);

  const handleUpgrade = async () => {
    if (!settings) {
      toast.error('Settings not loaded yet');
      return;
    }

    setLoading(true);
    try {
      const planAmount = selectedPlan === 'lifetime' ? settings.lifetimePrice : settings.premiumPrice;

      // Create order on backend
      const response = await api.post('/payment/create-order', {
        amount: planAmount,
        plan: selectedPlan
      });

      if (response.data.success && response.data.paymentSessionId) {
        const { paymentSessionId, environment } = response.data;

        // Load Cashfree SDK dynamically
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.onload = () => {
          // Initialize Cashfree
          const cashfree = window.Cashfree({
            mode: environment === 'production' ? 'production' : 'sandbox'
          });

          // Checkout options
          const checkoutOptions = {
            paymentSessionId: paymentSessionId,
            returnUrl: `${window.location.origin}/payment-success?order_id=${response.data.orderId}`,
            redirectTarget: '_self'
          };

          // Initiate payment
          cashfree.checkout(checkoutOptions).then((result) => {
            if (result.error) {
              console.error('Payment error:', result.error);
              toast.error(result.error.message || 'Payment failed');
              setLoading(false);
            }
            if (result.redirect) {
              console.log('Payment redirect initiated');
            }
          });
        };

        script.onerror = () => {
          toast.error('Failed to load payment gateway');
          setLoading(false);
        };

        document.body.appendChild(script);
      } else {
        toast.error('Failed to create payment order');
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || 'Failed to initiate payment');
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
    toast('You can upgrade to premium anytime from your account', {
      icon: '💡',
      duration: 4000
    });
  };

  // Show loading while settings are being fetched
  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500"></div>
      </div>
    );
  }

  const benefits = [
    { icon: BadgeCheck, title: 'Verified Blue Tick', description: 'Stand out with a premium badge on your profile', color: 'from-blue-500 to-blue-600' },
    { icon: Zap, title: 'Daily Tasks', description: 'Access exclusive tasks with higher rewards', color: 'from-yellow-500 to-orange-500' },
    { icon: Gift, title: 'Welcome Kit', description: 'Receive branded merchandise delivered to you', color: 'from-pink-500 to-rose-500' },
    { icon: TrendingUp, title: '2x Points', description: 'Earn double points on all referrals', color: 'from-green-500 to-emerald-500' },
    { icon: Calendar, title: 'Personal Onboarding', description: 'Scheduled call with our success team', color: 'from-purple-500 to-violet-500' },
    { icon: Shield, title: 'Satisfaction Guaranteed', description: 'Experience premium value immediately', color: 'from-primary-500 to-primary-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-lime-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Congratulations Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Registration Successful!
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name || 'Ambassador'}! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            You're one step away from unlocking premium benefits
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4 mb-8 text-white text-center"
        >
          <p className="text-sm font-medium mb-2">⚡ Special Launch Offer Ends In:</p>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">{String(countdown.hours).padStart(2, '0')}</span>
              <p className="text-xs">Hours</p>
            </div>
            <span className="text-2xl font-bold">:</span>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">{String(countdown.minutes).padStart(2, '0')}</span>
              <p className="text-xs">Minutes</p>
            </div>
            <span className="text-2xl font-bold">:</span>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold">{String(countdown.seconds).padStart(2, '0')}</span>
              <p className="text-xs">Seconds</p>
            </div>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-gradient-to-l from-lime-400 to-lime-500 text-black px-6 py-2 text-sm font-bold rounded-bl-xl">
            90% OFF
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h2>
              <p className="text-gray-500">Unlock all benefits instantly</p>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Monthly Plan */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPlan('monthly')}
              className={`bg-gray-50 rounded-xl p-6 cursor-pointer transition-all ${selectedPlan === 'monthly'
                ? 'ring-2 ring-primary-500 bg-primary-50'
                : 'hover:bg-gray-100'
                }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Monthly Plan</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">₹{settings?.premiumPrice || 19}</span>
                    <span className="text-gray-400 line-through text-sm">₹199</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">per month</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'monthly'
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
                  }`}>
                  {selectedPlan === 'monthly' && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-center">
                <p className="text-yellow-800 text-xs font-medium">
                  💎 Unlock exclusive rewards instantly!
                </p>
              </div>
            </motion.div>

            {/* Lifetime Plan */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedPlan('lifetime')}
              className={`relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 cursor-pointer transition-all border-2 ${selectedPlan === 'lifetime'
                ? 'border-purple-500 shadow-lg'
                : 'border-purple-200 hover:border-purple-300'
                }`}
            >
              <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                BEST VALUE
              </div>
              <div className="flex items-center justify-between mb-3 mt-4">
                <div>
                  <p className="text-purple-700 text-sm font-bold">Lifetime Access</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">₹{settings?.lifetimePrice || 999}</span>
                    <span className="text-gray-400 line-through text-sm">₹4999</span>
                  </div>
                  <p className="text-xs text-purple-600 mt-1 font-medium">One-time payment</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'lifetime'
                  ? 'border-purple-500 bg-purple-500'
                  : 'border-purple-300'
                  }`}>
                  {selectedPlan === 'lifetime' && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
              <div className="bg-purple-100 border border-purple-300 rounded-lg p-2 text-center">
                <p className="text-purple-900 text-xs font-bold">
                  🎉 Never pay again! Premium forever
                </p>
              </div>
            </motion.div>
          </div>

          {/* Selected Plan Summary */}
          <div className="bg-gradient-to-r from-primary-50 to-lime-50 rounded-xl p-4 mb-6 text-center">
            {selectedPlan === 'monthly' ? (
              <p className="text-gray-700">
                <span className="font-bold">You Selected:</span> Monthly Plan • ₹{settings?.premiumPrice || 19}/month • Cancel anytime
              </p>
            ) : (
              <p className="text-gray-700">
                <span className="font-bold">You Selected:</span> Lifetime Access • ₹{settings?.lifetimePrice || 999} one-time • Premium forever! 🎉
              </p>
            )}
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0`}>
                  <benefit.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className={`w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 ${selectedPlan === 'lifetime'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                : 'btn-primary'
                } text-white rounded-xl font-bold transition-all`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  {selectedPlan === 'lifetime' ? `Get Lifetime Access @ ₹${settings?.lifetimePrice || 999}` : `Upgrade Now @ ₹${settings?.premiumPrice || 19}`}
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>

            <button
              onClick={handleSkip}
              className="w-full py-4 text-gray-700 font-semibold bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Continue as Free Ambassador</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Satisfaction Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-primary-50 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-700 font-bold">
              RS
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-2">
                "I was hesitant about upgrading, but the premium tools were worth it!
                Now I'm unlocking exclusive rewards and growing my network every month."
              </p>
              <p className="text-primary-700 font-medium">Rohit S., Mumbai</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumUpgrade;
