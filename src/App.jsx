import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Earnings from './pages/Earnings';
import PremiumUpgrade from './pages/PremiumUpgrade';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import MeetingScheduled from './pages/MeetingScheduled';
import AdminDashboard from './pages/AdminDashboard';
import AdminWithdrawals from './pages/AdminWithdrawals';
import AdminPremiumMembers from './pages/AdminPremiumMembers';
import AdminPremiumSettings from './pages/AdminPremiumSettings';

function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(30, 41, 59, 0.9)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Premium/Payment Routes */}
          <Route
            path="/premium-upgrade"
            element={
              <PrivateRoute>
                <PremiumUpgrade />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment-failed"
            element={
              <PrivateRoute>
                <PaymentFailed />
              </PrivateRoute>
            }
          />
          <Route
            path="/meeting-scheduled"
            element={
              <PrivateRoute>
                <MeetingScheduled />
              </PrivateRoute>
            }
          />
          
          {/* Ambassador Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Layout>
                  <Account />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/earnings"
            element={
              <PrivateRoute>
                <Layout>
                  <Earnings />
                </Layout>
              </PrivateRoute>
            }
          />
          
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/withdrawals"
            element={
              <PrivateRoute adminOnly>
                <Layout>
                  <AdminWithdrawals />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/premium-members"
            element={
              <PrivateRoute adminOnly>
                <Layout>
                  <AdminPremiumMembers />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/premium-settings"
            element={
              <PrivateRoute adminOnly>
                <Layout>
                  <AdminPremiumSettings />
                </Layout>
              </PrivateRoute>
            }
          />
          
          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
