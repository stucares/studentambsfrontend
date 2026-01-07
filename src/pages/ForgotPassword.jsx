import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowLeft, Shield, KeyRound } from 'lucide-react';
import api from '../utils/api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Step 1: Request OTP
    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/password/forgot', { email: formData.email });

            if (response.data.success) {
                toast.success('OTP sent to your email! Check your inbox.');
                setStep(2);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.userMessage || 'Unable to send OTP. Please check your email and try again.');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/password/verify-otp', {
                email: formData.email,
                otp: formData.otp
            });

            if (response.data.success) {
                toast.success('OTP verified! Set your new password.');
                setStep(3);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.userMessage || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/password/reset', {
                email: formData.email,
                otp: formData.otp,
                newPassword: formData.newPassword
            });

            if (response.data.success) {
                toast.success('Password reset successfully! You can now login.');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.userMessage || 'Unable to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((stepNum) => (
                <React.Fragment key={stepNum}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= stepNum
                        ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                        }`}>
                        {stepNum}
                    </div>
                    {stepNum < 3 && (
                        <div className={`w-12 sm:w-16 h-1 ${step > stepNum ? 'bg-primary-500' : 'bg-gray-200'
                            }`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 max-w-md w-full"
            >
                <div className="text-center mb-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-4 flex items-center justify-center gap-3"
                    >
                        <img
                            src="/stucare_logo.png"
                            alt="Stucare"
                            className="h-10 w-auto"
                        />
                        <span className="text-2xl font-bold text-gray-400">×</span>
                        <img
                            src="/3048_Scholare_HK-JPG-01__1_-removebg-preview.png"
                            alt="Scholare"
                            className="h-10 w-auto"
                        />
                    </motion.div>

                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full mb-4">
                        {step === 1 && <Mail className="w-8 h-8 text-primary-600" />}
                        {step === 2 && <Shield className="w-8 h-8 text-primary-600" />}
                        {step === 3 && <KeyRound className="w-8 h-8 text-primary-600" />}
                    </div>

                    <h1 className="text-3xl font-bold gradient-text mb-2">
                        {step === 1 && 'Forgot Password'}
                        {step === 2 && 'Verify OTP'}
                        {step === 3 && 'Set New Password'}
                    </h1>
                    <p className="text-gray-600 text-sm">
                        {step === 1 && 'Enter your email to receive a verification code'}
                        {step === 2 && 'Enter the 6-digit OTP sent to your email'}
                        {step === 3 && 'Create a strong new password for your account'}
                    </p>
                </div>

                {renderStepIndicator()}

                {/* Step 1: Email Input */}
                {step === 1 && (
                    <form onSubmit={handleRequestOTP} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOTP} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Enter OTP</label>
                            <input
                                type="text"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                className="input-field text-center text-2xl font-mono tracking-widest"
                                placeholder="000000"
                                maxLength="6"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                OTP sent to <strong>{formData.email}</strong>
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleRequestOTP({ preventDefault: () => { } })}
                            className="w-full text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                            Didn't receive OTP? Resend
                        </button>
                    </form>
                )}

                {/* Step 3: New Password */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Resetting Password...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
