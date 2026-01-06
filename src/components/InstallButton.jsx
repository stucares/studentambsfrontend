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

    // Icon-only variant
    if (iconOnly) {
        return (
            <>
                <button
                    onClick={handleClick}
                    className={`p-2 text-gray-600 hover:text-primary-600 transition-colors ${className}`}
                    title="Install App"
                >
                    <Download className="w-5 h-5" />
                </button>

                <IOSInstallModal
                    isOpen={showIOSModal}
                    onClose={() => setShowIOSModal(false)}
                />
            </>
        );
    }

    // Different styling based on variant
    const baseStyles = "flex items-center gap-2 font-medium transition-all";

    const variants = {
        default: "px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg",
        landing: "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg",
        navbar: "px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm",
        mobile: "px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl",
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={`${baseStyles} ${variants[variant]} ${className}`}
                title="Install App"
            >
                <Download className="w-4 h-4" />
                <span>Install</span>
            </button>

            <IOSInstallModal
                isOpen={showIOSModal}
                onClose={() => setShowIOSModal(false)}
            />
        </>
    );
};

export default InstallButton;
