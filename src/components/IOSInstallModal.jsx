import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share, PlusSquare } from 'lucide-react';

const IOSInstallModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-[100] p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Install Stucare App</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <p className="text-gray-600 mb-6">
                        Install this app on your iPhone for quick access and a better experience!
                    </p>

                    <div className="space-y-4">
                        {/* Step 1 */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-primary-600 font-bold">1</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 mb-1">Tap the Share button</p>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Share className="w-5 h-5 text-blue-500" />
                                    <span className="text-sm">at the bottom of Safari</span>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-primary-600 font-bold">2</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 mb-1">Tap "Add to Home Screen"</p>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <PlusSquare className="w-5 h-5 text-gray-700" />
                                    <span className="text-sm">in the share menu</span>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-primary-600 font-bold">3</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900 mb-1">Tap "Add"</p>
                                <p className="text-sm text-gray-600">to confirm installation</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full mt-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
                    >
                        Got it!
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default IOSInstallModal;
