import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Calendar, Mail, Gift, Sparkles, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [meetingData, setMeetingData] = useState(null);
  const hasVerified = useRef(false); // Prevent duplicate verification calls

  useEffect(() => {
    const verifyPayment = async () => {
      // Prevent multiple verification calls
      if (hasVerified.current) return;
      hasVerified.current = true;

      try {
        const orderId = searchParams.get('order_id');
        const devMode = searchParams.get('dev_mode') === 'true';

        // Validate order ID format
        if (!orderId) {
          toast.error('Invalid payment reference');
          setTimeout(() => navigate('/dashboard'), 1000);
          return;
        }

        // Additional validation: order_id should start with 'order_' or 'dev_session_'
        if (!orderId.startsWith('order_') && !orderId.startsWith('dev_session_')) {
          toast.error('Invalid order ID format');
          setTimeout(() => navigate('/dashboard'), 1000);
          return;
        }

        console.log('Verifying payment for order:', orderId);
        const response = await api.post('/payment/verify', { orderId, devMode });

        if (response.data.success) {
          setVerified(true);
          setMeetingData(response.data.meeting);
          await refreshUser();
          toast.success('Payment verified successfully! 🎉');
        } else {
          toast.error('Payment verification failed');
          navigate('/premium-upgrade');
        }
      } catch (error) {
        console.error('Verification error:', error);

        // Show appropriate error message
        const errorMsg = error.response?.data?.message || 'Failed to verify payment';
        toast.error(errorMsg);

        // Redirect based on error type
        if (error.response?.status === 404) {
          // Order not found
          toast.error('Payment order not found. Please try again.');
        } else if (error.response?.status === 400) {
          // Payment not completed
          toast.error('Payment was not completed. Please complete the payment.');
        }

        // Always redirect to premium upgrade page on error
        setTimeout(() => {
          navigate('/premium-upgrade');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []); // Empty dependency array - run only once on mount

  const openCalendlyWidget = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/it-stucares/30min' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-lime-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!verified) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <CheckCircle className="w-14 h-14 text-green-500" />
            </motion.div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            You are now a Premium Ambassador
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 md:p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Onboarding Meeting Scheduled</h2>
              <p className="text-gray-500">We're excited to meet you!</p>
            </div>
          </div>

          <div className="bg-primary-50 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-800">Schedule Your Onboarding</h3>
                <p className="text-sm text-primary-600">Pick a time that works for you</p>
              </div>
            </div>

            <p className="text-primary-700 mb-4 text-sm">
              Book your 30-minute personal onboarding session with our team. Choose from available time slots that fit your schedule.
            </p>

            <button
              onClick={openCalendlyWidget}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 mb-3"
            >
              <Calendar className="w-5 h-5" />
              Schedule Your Meeting Now
            </button>

            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Or visit directly:</p>
              <a
                href="https://calendly.com/it-stucares/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 text-sm break-all"
              >
                calendly.com/it-stucares/30min
              </a>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">What to expect in the meeting:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Introduction to the ambassador program
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Get your welcome kit details
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Learn about daily tasks and earning tips
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Q&A - Ask us anything!
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 md:p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-lime-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">What's Next?</h2>
              <p className="text-gray-500">Your premium benefits are now active</p>
            </div>
          </div>

          <ul className="space-y-4">
            {[
              { text: 'Blue tick badge is now visible on your profile', done: true },
              { text: 'Access to exclusive daily tasks unlocked', done: true },
              { text: 'Welcome kit will be shipped within 7 days', done: false },
              { text: 'Complete your first task to get ₹19 cashback', done: false },
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.done ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                  {item.done ? <CheckCircle className="w-4 h-4" /> : <span className="text-sm">{index + 1}</span>}
                </div>
                <span className={item.done ? 'text-gray-900' : 'text-gray-600'}>{item.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
          >
            <Sparkles className="w-6 h-6" />
            Go to Dashboard
            <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
