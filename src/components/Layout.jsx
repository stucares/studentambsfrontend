import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, User, LogOut, Menu, X, Wallet, Crown, Settings, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InstallButton from './InstallButton';

const Layout = ({ children }) => {
    const { logout, user, isAdmin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const ambassadorLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/earnings', label: 'Earnings', icon: Wallet },
        { path: '/account', label: 'Account', icon: User },
    ];

    const adminLinks = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/premium-members', label: 'Premium Members', icon: Crown },
        { path: '/admin/withdrawals', label: 'Withdrawals', icon: Wallet },
        { path: '/admin/premium-settings', label: 'Settings', icon: Settings },
    ];

    const links = isAdmin ? adminLinks : ambassadorLinks;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2 sm:gap-3">
                            <img
                                src="/stucare_logo.png"
                                alt="Stucare"
                                className="h-8 sm:h-10 object-contain"
                            />
                            <span className="text-gray-400 text-lg sm:text-xl">×</span>
                            <img
                                src="/3048_Scholare_HK-JPG-01__1_-removebg-preview.png"
                                alt="Scholare"
                                className="h-8 sm:h-8 object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {/* Install Button */}
                            <InstallButton iconOnly />

                            {/* User Greeting */}
                            <span className="text-gray-600 font-medium">Hi, {user?.name?.split(' ')[0] || 'User'}</span>

                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium ${location.pathname === link.path
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.label}
                                </Link>
                            ))}

                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-gray-600"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden border-t border-gray-100 bg-white"
                        >
                            <div className="px-4 py-4 space-y-2">
                                <div className="px-4 py-2 text-gray-500 font-medium">Hi, {user?.name || 'User'}</div>
                                {links.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === link.path
                                            ? 'bg-primary-50 text-primary-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <link.icon className="w-5 h-5" />
                                        {link.label}
                                    </Link>
                                ))}

                                <div className="px-4 flex items-center gap-2">
                                    <InstallButton iconOnly />
                                    <span className="text-sm text-gray-500">Install App</span>
                                </div>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="pt-4 px-4 max-w-7xl mx-auto">{children}</main>

            {/* Footer */}
            <footer className="text-center py-8 text-gray-400 text-sm">
                <p>© 2025 Stucare. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
