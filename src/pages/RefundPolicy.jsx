import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCcw, Shield, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <RefreshCcw className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Refund & Cancellation Policy</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Effective Date: December 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          
          {/* Introduction */}
          <div>
            <p className="text-gray-700 leading-relaxed">
              At <strong>Stucare Innovation and Creation Pvt. Ltd.</strong>, we strive to provide the best experience for our users. 
              Please review our refund and cancellation policy carefully before making any purchases.
            </p>
          </div>

          {/* Alert Box */}
          <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded-r-lg">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-purple-900">Important Notice</h3>
                <p className="text-sm text-purple-800 mt-1">
                  You have <strong>7 days</strong> from the date of purchase to request a cancellation or refund.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Eligibility for Refund */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 rounded-full p-2">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">1. Eligibility for Refund</h2>
            </div>
            <div className="pl-14 space-y-3 text-gray-700">
              <p>Refunds are available under the following conditions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The refund request is made <strong>within 7 days</strong> of the purchase date.</li>
                <li>The product or service has not been fully utilized or consumed.</li>
                <li>You provide valid proof of purchase (transaction ID or receipt).</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Non-Refundable Items */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 rounded-full p-2">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">2. Non-Refundable Items</h2>
            </div>
            <div className="pl-14 space-y-3 text-gray-700">
              <p>The following items are <strong>not eligible</strong> for a refund:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Purchases made <strong>more than 7 days ago</strong>.</li>
                <li>Services or digital products that have been fully utilized or accessed.</li>
                <li>Promotional or discounted products explicitly marked as non-refundable.</li>
              </ul>
            </div>
          </div>

          {/* Section 3: Cancellation Policy */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 rounded-full p-2">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">3. Cancellation Policy</h2>
            </div>
            <div className="pl-14 space-y-3 text-gray-700">
              <p>You may cancel your purchase or subscription under the following terms:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cancellations must be requested <strong>within 7 days</strong> of the purchase date.</li>
                <li>To cancel, contact us via email at <a href="mailto:support@stucares.com" className="text-purple-600 hover:underline font-semibold">support@stucares.com</a> or call <a href="tel:+918691909003" className="text-purple-600 hover:underline font-semibold">+91-8691909003</a>.</li>
                <li>Once the cancellation is confirmed, a refund will be processed within <strong>7-10 business days</strong>.</li>
              </ul>
            </div>
          </div>

          {/* Section 4: Refund Process */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">4. Refund Process</h2>
            </div>
            <div className="pl-14 space-y-3 text-gray-700">
              <p>To request a refund:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Send an email to <a href="mailto:support@stucares.com" className="text-purple-600 hover:underline font-semibold">support@stucares.com</a> with your transaction details.</li>
                <li>Include your name, contact information, and reason for the refund request.</li>
                <li>Our team will review your request and respond within <strong>3-5 business days</strong>.</li>
                <li>If approved, the refund will be credited to your original payment method within <strong>7-10 business days</strong>.</li>
              </ol>
            </div>
          </div>

          {/* Section 5: Payment Gateway Charges */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 rounded-full p-2">
                <RefreshCcw className="h-6 w-6 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">5. Payment Gateway Charges</h2>
            </div>
            <div className="pl-14 space-y-3 text-gray-700">
              <p>
                Please note that payment gateway or transaction fees (if any) are <strong>non-refundable</strong> and will be deducted 
                from the refund amount as applicable.
              </p>
            </div>
          </div>

          {/* Section 6: Amendments */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 rounded-full p-2">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">6. Amendments</h2>
            </div>
            <div className="pl-14 space-y-3 text-gray-700">
              <p>
                We reserve the right to update or modify this Refund & Cancellation Policy at any time. 
                Changes will be effective immediately upon posting on our website.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-t pt-6 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 space-y-3">
              <p className="text-gray-700">
                If you have any questions or concerns about our Refund & Cancellation Policy, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-800">
                  <strong>Email:</strong> <a href="mailto:support@stucares.com" className="text-purple-600 hover:underline">support@stucares.com</a>
                </p>
                <p className="text-gray-800">
                  <strong>Phone:</strong> <a href="tel:+918691909003" className="text-purple-600 hover:underline">+91-8691909003</a>
                </p>
                <p className="text-gray-800">
                  <strong>Address:</strong> Stucare Innovation and Creation Pvt. Ltd.<br />
                  4th Floor, 108, The Platina Tanvi Complex, Next S V Road, Petrol Pump,<br />
                  Dahisar East, Mumbai, Maharashtra, India
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
