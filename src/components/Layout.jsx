import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, User, LogOut, Menu, X, Wallet, Crown, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-card mx-4 mt-4 rounded-2xl sticky top-4 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-3">
              <img 
                src="/StuCare's TM.png" 
                alt="Stucare" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-400">×</span>
              <img 
                src="/3048_Scholare_HK-JPG-01__1_-removebg-preview.png" 
                alt="Scholare" 
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-red-500/20 text-red-400 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
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
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                      location.pathname === link.path
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-400 transition-all"
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
      <main>{children}</main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm">
        <p>© 2025 Stucare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
