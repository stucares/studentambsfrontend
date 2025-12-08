import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle, RefreshCw, ArrowLeft, HelpCircle } from 'lucide-react';

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason') || 'Payment was not completed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <XCircle className="w-14 h-14 text-red-500" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            {reason}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What can you do?</h2>
          
          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm text-gray-600">1</span>
              </div>
              <span className="text-gray-600">Check your internet connection and try again</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm text-gray-600">2</span>
              </div>
              <span className="text-gray-600">Ensure you have sufficient balance in your account</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm text-gray-600">3</span>
              </div>
              <span className="text-gray-600">Try using a different payment method</span>
            </li>
          </ul>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              💡 If money was deducted, it will be refunded within 5-7 business days.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <button
            onClick={() => navigate('/premium-upgrade')}
            className="w-full btn-primary py-4 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Dashboard
          </button>
          
          <a
            href="mailto:support@stucares.com"
            className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-5 h-5" />
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentFailed;
