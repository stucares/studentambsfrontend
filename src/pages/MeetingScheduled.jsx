import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Mail, Clock, Video, CheckCircle, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';

const MeetingScheduled = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const openCalendlyWidget = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/it-stucares/30min' });
    }
  };

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      try {
        const response = await api.get('/ambassador/meeting-details');
        if (response.data.meeting) {
          setMeetingDetails(response.data.meeting);
        }
      } catch (error) {
        console.error('Failed to fetch meeting details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.isPremium) {
      fetchMeetingDetails();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user?.isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-lime-50 py-8 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="glass-card p-8">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Meeting Scheduled</h2>
            <p className="text-gray-600 mb-6">
              Upgrade to premium to get a personal onboarding meeting with our team.
            </p>
            <button
              onClick={() => navigate('/premium-upgrade')}
              className="btn-primary px-6 py-3"
            >
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-lime-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Meeting Scheduled
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Onboarding Meeting 📅
          </h1>
          <p className="text-xl text-gray-600">
            We're excited to meet you and help you get started!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
              <Video className="w-7 h-7 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Premium Ambassador Onboarding</h2>
              <p className="text-gray-500">Personal session with our success team</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-primary-50 rounded-xl p-6 text-center">
              <Calendar className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold text-primary-800 mb-2 text-lg">Schedule Your Onboarding Meeting</h3>
              <p className="text-primary-700 mb-4">
                Choose a convenient time for your 30-minute onboarding session with our team
              </p>
              <button
                onClick={openCalendlyWidget}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Pick Your Time Slot
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 text-sm mb-1">Check Your Email</p>
                  <p className="text-xs text-blue-700">
                    Meeting confirmation and details will be sent to <span className="font-semibold">{user?.email}</span> after you schedule
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">Or use the direct link:</h4>
              <a
                href="https://calendly.com/it-stucares/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-2 break-all"
              >
                calendly.com/it-stucares/30min
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 mb-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">What to expect in the meeting:</h3>
          <ul className="space-y-3">
            {[
              'Introduction to the ambassador program',
              'How to complete tasks and earn points',
              'Tips to maximize your earnings',
              'Q&A - Ask us anything!',
              'Welcome kit delivery details'
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
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
            className="w-full py-4 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-primary-300 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default MeetingScheduled;
