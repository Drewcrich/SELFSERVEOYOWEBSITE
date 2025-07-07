import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';

const TourConfirmationPage = () => {
  const location = useLocation();
  const { customerName, customerEmail, customerPhone } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ✅ Tour Booked Successfully!
            </h1>
            <p className="text-xl text-gray-600">
              {customerName ? `Hi ${customerName}, your` : 'Your'} tour request has been received!
            </p>
          </div>

          {/* Confirmation Details */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">📋 Confirmation Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {customerEmail && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Confirmation sent to:</p>
                    <p className="text-gray-600">{customerEmail}</p>
                  </div>
                </div>
              )}

              {customerPhone && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">We'll text you at:</p>
                    <p className="text-gray-600">{customerPhone}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Response Time */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-green-800">⏰ Expected Response Time: Within 30 minutes</p>
                  <p className="text-green-700 text-sm">We'll text you the exact container location (with photo), container number, and lock combination</p>
                </div>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">📍 What to Expect</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Container location and number</p>
                    <p className="text-gray-600 text-sm">Exact container and easy-to-find location</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Lock access instructions</p>
                    <p className="text-gray-600 text-sm">Combination code or key location</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Directions to facility</p>
                    <p className="text-gray-600 text-sm">Clear directions and parking info</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Your direct contact info</p>
                    <p className="text-gray-600 text-sm">Text us with questions or to rent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Facility Info */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">🏢 Facility Information</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📍 Address</h3>
                <p className="text-gray-700 mb-4">
                  1502 Airport Road<br />
                  Urbana, IL 61802
                </p>
                
                <h3 className="font-semibold text-gray-900 mb-3">🕐 Tour Availability</h3>
                <p className="text-gray-700">
                  Self-service tours available 24/7<br />
                  Response time: Within 30 minutes<br />
                  (8am-8pm daily)
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">📦 Container Details</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• 320 sq ft of secure storage space</li>
                  <li>• 40ft × 8ft × 10ft secure container</li>
                  <li>• Weather-protected storage</li>
                  <li>• Easy drive-up access</li>
                  <li>• 24/7 access to your belongings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <Link 
              to="/"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              ← Back to Home
            </Link>
            
            <p className="text-gray-600">
              Questions? Email us at{' '}
              <a href="mailto:Drewcrichardson1999@gmail.com" className="text-green-600 hover:underline">
                Drewcrichardson1999@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TourConfirmationPage;

