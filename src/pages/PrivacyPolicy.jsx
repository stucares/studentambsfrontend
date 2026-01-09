import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Database, Lock, UserCheck, Globe, Mail, Bell, Trash2, AlertCircle } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Home
                    </Link>
                    <div className="flex items-center space-x-3">
                        <Shield className="h-8 w-8 text-purple-600" />
                        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                    </div>
                    <p className="text-gray-600 mt-2">Last updated: January 9, 2025</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">

                    {/* Introduction */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <Eye className="h-6 w-6 text-purple-600 mr-2" />
                            Introduction
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Welcome to the Stucare Ambassador Program. This Privacy Policy explains how <strong>STUCARE INNOVATION AND CREATION PRIVATE LIMITED</strong> ("we", "us", "our", "Company") collects, uses, discloses, and safeguards your information when you visit our website{' '}
                            <a href="https://stucareambassador.com" className="text-purple-600 hover:underline">
                                https://stucareambassador.com
                            </a>{' '}
                            and use our services.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            By using our Platform, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Platform.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <Database className="h-6 w-6 text-purple-600 mr-2" />
                            Information We Collect
                        </h2>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We may collect personally identifiable information that you voluntarily provide to us when you:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                            <li>Register for an account on our Platform</li>
                            <li>Sign in using Google Authentication</li>
                            <li>Fill out forms or participate in our ambassador program</li>
                            <li>Contact us via email, phone, or other communication channels</li>
                            <li>Apply for premium membership or make payments</li>
                        </ul>

                        <p className="text-gray-700 leading-relaxed mb-3">
                            This information may include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                            <li><strong>Name</strong> - Your full name as provided during registration</li>
                            <li><strong>Email Address</strong> - Used for account verification, communication, and login</li>
                            <li><strong>Phone Number</strong> - For account recovery and important notifications</li>
                            <li><strong>College/Institution Name</strong> - To verify your student status</li>
                            <li><strong>State/Location</strong> - For regional program management</li>
                            <li><strong>Referral Code Information</strong> - To track referrals and rewards</li>
                            <li><strong>Payment Information</strong> - Processed securely through our payment partners</li>
                        </ul>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Information from Third-Party Services</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            When you sign in using Google Authentication, we receive your name, email address, and profile picture from Google. We do not receive or store your Google password.
                        </p>

                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
                        <p className="text-gray-700 leading-relaxed">
                            When you access our Platform, we may automatically collect certain information including your IP address, browser type, device information, operating system, access times, and the pages you have viewed directly before and after accessing the Platform.
                        </p>
                    </section>

                    {/* How We Use Your Information */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <UserCheck className="h-6 w-6 text-purple-600 mr-2" />
                            How We Use Your Information
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We use the information we collect for various purposes, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>To create and manage your ambassador account</li>
                            <li>To process your transactions and send related information</li>
                            <li>To track referrals, points, and rewards in our ambassador program</li>
                            <li>To send you administrative information, updates, and promotional content</li>
                            <li>To respond to your comments, questions, and provide customer support</li>
                            <li>To prevent fraudulent transactions and monitor against theft</li>
                            <li>To analyze usage patterns and improve our Platform and services</li>
                            <li>To comply with legal obligations and protect our legal rights</li>
                        </ul>
                    </section>

                    {/* Information Sharing */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <Globe className="h-6 w-6 text-purple-600 mr-2" />
                            Information Sharing and Disclosure
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li><strong>Service Providers:</strong> We may share your information with third-party vendors who perform services on our behalf, such as payment processing, email delivery, and analytics.</li>
                            <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, court order, or government regulation.</li>
                            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                            <li><strong>Protection of Rights:</strong> We may disclose information to protect the safety, rights, or property of the Company, our users, or the public.</li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <Lock className="h-6 w-6 text-purple-600 mr-2" />
                            Data Security
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Encryption of data in transit using SSL/TLS protocols</li>
                            <li>Secure password hashing using industry-standard algorithms</li>
                            <li>Regular security assessments and updates</li>
                            <li>Access controls limiting who can view your data</li>
                            <li>Secure third-party authentication (Google Sign-In)</li>
                        </ul>
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mt-4">
                            <div className="flex items-start">
                                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                                <p className="text-amber-800 text-sm">
                                    While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <Bell className="h-6 w-6 text-purple-600 mr-2" />
                            Cookies and Tracking Technologies
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use cookies and similar tracking technologies to track activity on our Platform and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We use cookies for:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li><strong>Authentication:</strong> To keep you logged in and recognize you when you return</li>
                            <li><strong>Preferences:</strong> To remember your settings and preferences</li>
                            <li><strong>Analytics:</strong> To understand how you use our Platform and improve our services</li>
                            <li><strong>Security:</strong> To detect and prevent fraudulent activity</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, if you do not accept cookies, some features of our Platform may not function properly.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <Trash2 className="h-6 w-6 text-purple-600 mr-2" />
                            Your Rights and Choices
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            You have certain rights regarding your personal information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li><strong>Access:</strong> You can request a copy of the personal information we hold about you</li>
                            <li><strong>Correction:</strong> You can update or correct your personal information through your account settings</li>
                            <li><strong>Deletion:</strong> You can request deletion of your account and associated data by contacting us</li>
                            <li><strong>Opt-out:</strong> You can opt out of promotional communications by clicking the unsubscribe link in our emails</li>
                            <li><strong>Data Portability:</strong> You can request your data in a structured, machine-readable format</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-4">
                            To exercise any of these rights, please contact us using the information provided below.
                        </p>
                    </section>

                    {/* Third Party Links */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Third-Party Links</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our Platform may contain links to third-party websites or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policy of every site you visit.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Children's Privacy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our Platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us and we will take steps to delete such information.
                        </p>
                    </section>

                    {/* Changes to Policy */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top. You are advised to review this Privacy Policy periodically for any changes. Changes are effective immediately upon posting.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Governing Law</h2>
                        <p className="text-gray-700 leading-relaxed">
                            This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes arising from this Privacy Policy shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section className="bg-purple-50 rounded-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <Mail className="h-5 w-5 text-purple-600 mr-2" />
                            Contact Us
                        </h2>
                        <p className="text-gray-700 mb-4">
                            If you have any questions about this Privacy Policy or our data practices, please contact us:
                        </p>
                        <div className="space-y-2 text-gray-700">
                            <p className="font-semibold">Stucare Innovation and Creation Pvt. Ltd.</p>
                            <p>📍 4th Floor, 108, The Platina Tanvi Complex, Next S V Road, Petrol Pump, Dahisar East, Mumbai, Maharashtra, India</p>
                            <p>📞 +91 8691909003</p>
                            <p>✉️ support@stucares.com</p>
                            <p>📱 @stucare.innovation</p>
                        </div>
                    </section>

                    {/* Related Links */}
                    <section className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Related Documents</h3>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/terms" className="text-purple-600 hover:text-purple-700 hover:underline">
                                Terms & Conditions →
                            </Link>
                            <Link to="/refund-policy" className="text-purple-600 hover:text-purple-700 hover:underline">
                                Refund Policy →
                            </Link>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
