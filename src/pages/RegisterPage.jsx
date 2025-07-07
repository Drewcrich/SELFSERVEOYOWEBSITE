import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, error: authError, loading } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific validation error when field is changed
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    
    // Clear general error
    setError('');
  };

  const validateForm = () => {
    const errors = {};
    
    // Required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'password', 'confirmPassword', 'address_line1', 
      'city', 'state', 'zip_code'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    // Password validation
    if (formData.password && formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms agreement
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Validate form
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for API
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2 || null,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code
      };

      // Register user
      const result = await register(userData);
      
      if (result.success) {
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Handle validation errors from API
        if (result.validation_errors) {
          setValidationErrors(result.validation_errors);
        } else {
          setError(result.error || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== '';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join thousands of satisfied customers using our storage solutions
          </p>
        </div>

        {(error || authError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error || authError}</span>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Customer Registration</CardTitle>
            <CardDescription>
              Fill out the form below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      validationErrors.firstName 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={isSubmitting || loading}
                  />
                  {validationErrors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      validationErrors.lastName 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={isSubmitting || loading}
                  />
                  {validationErrors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    validationErrors.email 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={isSubmitting || loading}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    validationErrors.phone 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={isSubmitting || loading}
                />
                {validationErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 1
                </label>
                <input
                  id="address_line1"
                  name="address_line1"
                  type="text"
                  required
                  className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    validationErrors.address_line1 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Street address"
                  value={formData.address_line1}
                  onChange={(e) => handleInputChange('address_line1', e.target.value)}
                  disabled={isSubmitting || loading}
                />
                {validationErrors.address_line1 && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.address_line1}</p>
                )}
              </div>

              <div>
                <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 2 (Optional)
                </label>
                <input
                  id="address_line2"
                  name="address_line2"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Apartment, suite, unit, etc."
                  value={formData.address_line2}
                  onChange={(e) => handleInputChange('address_line2', e.target.value)}
                  disabled={isSubmitting || loading}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      validationErrors.city 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={isSubmitting || loading}
                  />
                  {validationErrors.city && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.city}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      validationErrors.state 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    disabled={isSubmitting || loading}
                  />
                  {validationErrors.state && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.state}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    id="zip_code"
                    name="zip_code"
                    type="text"
                    required
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      validationErrors.zip_code 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="ZIP"
                    value={formData.zip_code}
                    onChange={(e) => handleInputChange('zip_code', e.target.value)}
                    disabled={isSubmitting || loading}
                  />
                  {validationErrors.zip_code && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.zip_code}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 pr-10 ${
                      validationErrors.password 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    disabled={isSubmitting || loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting || loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                )}
                {!validationErrors.password && formData.password && (
                  <p className="mt-1 text-sm text-gray-500">
                    Password must be at least 8 characters
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 pr-10 ${
                      formData.confirmPassword && passwordsMatch 
                        ? 'border-green-300 focus:ring-green-500 focus:border-green-500' 
                        : validationErrors.confirmPassword
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    disabled={isSubmitting || loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting || loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
                )}
                {formData.confirmPassword && passwordsMatch && (
                  <p className="mt-1 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Passwords match
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  className={`h-4 w-4 focus:ring-blue-500 border-gray-300 rounded ${
                    validationErrors.agreeToTerms ? 'border-red-300' : ''
                  }`}
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  disabled={isSubmitting || loading}
                />
                <label htmlFor="agreeToTerms" className={`ml-2 block text-sm ${
                  validationErrors.agreeToTerms ? 'text-red-600' : 'text-gray-900'
                }`}>
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {validationErrors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.agreeToTerms}</p>
              )}

              <div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Sign in instead
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact us at{' '}
            <a href="mailto:support@ownyourownstorage.com" className="font-medium text-blue-600 hover:text-blue-500">
              support@ownyourownstorage.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

