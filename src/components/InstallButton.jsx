import React, { useState } from 'react';
import { Download } from 'lucide-react';
import usePWAInstall from '../hooks/usePWAInstall';
import IOSInstallModal from './IOSInstallModal';

const InstallButton = ({ variant = 'default', className = '', iconOnly = false }) => {
    const { isInstallable, isIOS, installApp } = usePWAInstall();
    const [showIOSModal, setShowIOSModal] = useState(false);

    if (!isInstallable) return null;

    const handleClick = () => {
        if (isIOS) {
            setShowIOSModal(true);
        } else {
            installApp();
        }
    };

    // Icon-only variant - NOW MUCH BOLDER
    if (iconOnly) {
        return (
            <>
                <button
                    onClick={handleClick}
                    className={`relative p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all hover:scale-110 animate-pulse ${className}`}
                    title="Install App"
                >
                    <Download className="w-6 h-6" />
                    {/* Pulse ring effect */}
                    <span className="absolute top-0 right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
                    </span>
                </button>

                <IOSInstallModal
                    isOpen={showIOSModal}
                    onClose={() => setShowIOSModal(false)}
                />
            </>
        );
    }

    // Different styling based on variant - ALL ENHANCED
    const baseStyles = "flex items-center gap-2 font-bold transition-all transform hover:scale-105";

    const variants = {
        default: "px-6 py-3 bg-gradient-to-r from-primary-500 to-lime-500 text-white rounded-xl hover:from-primary-600 hover:to-lime-600 shadow-lg hover:shadow-2xl text-lg",
        landing: "px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl shadow-lg hover:shadow-xl",
        navbar: "px-4 py-2.5 bg-primary-500 text-white hover:bg-primary-600 rounded-lg shadow-md hover:shadow-lg font-semibold",
        mobile: "px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 rounded-xl shadow-md font-semibold",
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={`${baseStyles} ${variants[variant]} ${className}`}
                title="Install App"
            >
                <Download className="w-5 h-5" />
                <span>Install App</span>
            </button>

            <IOSInstallModal
                isOpen={showIOSModal}
                onClose={() => setShowIOSModal(false)}
            />
        </>
    );
};

export default InstallButton;
