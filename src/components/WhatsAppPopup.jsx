import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import api from '../utils/api';

const WhatsAppPopup = ({ trigger = 'dashboard' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopupSettings();
  }, []);

  const fetchPopupSettings = async () => {
    try {
      const res = await api.get('/premium/popup-settings');
      const popupSettings = res.data.settings;
      console.log('🔔 Popup Settings Loaded:', popupSettings);
      console.log('🎯 Current Trigger:', trigger);
      setSettings(popupSettings);

      // Check if popup is enabled and should show on this trigger
      if (!popupSettings.enabled) {
        console.log('❌ Popup disabled');
        setLoading(false);
        return;
      }

      if (!popupSettings.whatsappLink) {
        console.log('❌ No WhatsApp link configured');
        setLoading(false);
        return;
      }

      // Check trigger-specific settings
      const shouldShow = (
        (trigger === 'login' && popupSettings.showOnLogin) ||
        (trigger === 'register' && popupSettings.showOnRegister) ||
        (trigger === 'dashboard' && popupSettings.showOnDashboard)
      );

      console.log('✅ Should show popup:', shouldShow);

      if (shouldShow) {
        // Check if user has already seen popup
        const hasSeenPopup = localStorage.getItem(`popup_seen_${trigger}`);
        console.log('👀 Already seen popup:', hasSeenPopup);

        if (!hasSeenPopup) {
          // Delay popup by configured seconds
          const delay = (popupSettings.showAfterSeconds || 3) * 1000;
          console.log(`⏱️ Showing popup in ${delay}ms...`);
          setTimeout(() => {
            console.log('🎉 Opening popup now!');
            setIsOpen(true);
            localStorage.setItem(`popup_seen_${trigger}`, 'true');
          }, delay);
        }
      }
    } catch (error) {
      console.error('Failed to load popup settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinWhatsApp = () => {
    if (settings?.whatsappLink) {
      window.open(settings.whatsappLink, '_blank');
      setIsOpen(false);
    }
  };

  const openPopup = () => {
    if (settings?.enabled && settings?.whatsappLink) {
      setIsOpen(true);
    }
  };

  if (loading || !settings) return null;

  // WhatsApp button for dashboard (always visible if enabled)
  const WhatsAppButton = () => {
    if (!settings.enabled || !settings.whatsappLink) return null;

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openPopup}
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 transition-all"
        title="Join WhatsApp Group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold">Join WhatsApp</span>
      </motion.button>
    );
  };

  return (
    <>
      <WhatsAppButton />

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* WhatsApp Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                {settings.title || 'Join Our Community!'}
              </h2>

              {/* Message */}
              <p className="text-center text-gray-600 mb-6">
                {settings.message || 'Join our WhatsApp group for exclusive updates and support.'}
              </p>

              {/* Join Button */}
              <button
                onClick={handleJoinWhatsApp}
                className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-6 h-6" />
                {settings.buttonText || 'Join WhatsApp Group'}
              </button>

              {/* Skip Link */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-3 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
              >
                Maybe Later
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppPopup;
