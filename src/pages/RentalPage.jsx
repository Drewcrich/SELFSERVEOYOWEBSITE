import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Package, Check, AlertCircle, CreditCard, Calendar, 
  FileText, ArrowLeft, CheckCircle, ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const RentalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, getAuthHeaders } = useAuth();
  
  const [unit, setUnit] = useState(location.state?.unit || null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [rentalData, setRentalData] = useState({
    paymentPlan: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    agreeToTerms: false
  });
  const [rental, setRental] = useState(null);

  // Redirect to units page if no unit is selected
  useEffect(() => {
    if (!unit && !location.state?.unit) {
      navigate('/units');
    }
  }, [unit, location.state, navigate]);

  // Fetch unit details if only ID is provided
  useEffect(() => {
    const fetchUnitDetails = async () => {
      if (location.state?.unitId && !unit) {
        try {
          setLoading(true);
          const response = await api.storageUnits.getById(location.state.unitId);
          
          if (response.success) {
            setUnit(response.unit);
          } else {
            setError('Failed to load storage unit details. Please try again.');
            setTimeout(() => navigate('/units'), 3000);
          }
        } catch (err) {
          console.error('Error fetching unit details:', err);
          setError('An error occurred while loading unit details.');
          setTimeout(() => navigate('/units'), 3000);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUnitDetails();
  }, [location.state, navigate, unit]);

  const handleInputChange = (field, value) => {
    setRentalData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user types
    setError(null);
  };

  const calculateTotalAmount = () => {
    if (!unit) return 0;
    
    switch (rentalData.paymentPlan) {
      case 'monthly':
        return unit.monthly_rate;
      case '3-month':
        return unit.monthly_rate * 3;
      case '6-month':
        return unit.monthly_rate * 6;
      default:
        return unit.monthly_rate;
    }
  };

  const calculateDiscount = () => {
    if (!unit) return 0;
    
    switch (rentalData.paymentPlan) {
      case '3-month':
        return unit.monthly_rate * 3 * 0.05; // 5% discount
      case '6-month':
        return unit.monthly_rate * 6 * 0.1; // 10% discount
      default:
        return 0;
    }
  };

  const calculateFinalAmount = () => {
    return calculateTotalAmount() - calculateDiscount();
  };

  const validateStep1 = () => {
    if (!isAuthenticated()) {
      setError('Please sign in or create an account to continue.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!rentalData.paymentPlan) {
      setError('Please select a payment plan.');
      return false;
    }
    if (!rentalData.startDate) {
      setError('Please select a start date.');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!rentalData.paymentMethod) {
      setError('Please select a payment method.');
      return false;
    }
    
    if (rentalData.paymentMethod === 'credit_card') {
      if (!rentalData.cardNumber || rentalData.cardNumber.length < 16) {
        setError('Please enter a valid card number.');
        return false;
      }
      if (!rentalData.cardExpiry || !rentalData.cardExpiry.match(/^\d{2}\/\d{2}$/)) {
        setError('Please enter a valid expiration date (MM/YY).');
        return false;
      }
      if (!rentalData.cardCvc || rentalData.cardCvc.length < 3) {
        setError('Please enter a valid CVC code.');
        return false;
      }
    }
    
    if (!rentalData.agreeToTerms) {
      setError('You must agree to the terms and conditions.');
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    setError(null);
    
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    
    if (step === 3) {
      handleSubmitRental();
    } else {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleSubmitRental = async () => {
    if (!isAuthenticated()) {
      navigate('/login', { 
        state: { 
          from: location.pathname,
          message: 'Please sign in to complete your rental.' 
        } 
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      // Prepare rental data
      const rentalPayload = {
        storage_unit_id: unit.id,
        payment_plan: rentalData.paymentPlan,
        start_date: rentalData.startDate,
        payment_method: rentalData.paymentMethod,
        payment_details: {
          card_number: rentalData.cardNumber,
          card_expiry: rentalData.cardExpiry,
          card_cvc: rentalData.cardCvc
        }
      };

      // Create rental
      const response = await api.rentals.create(token, rentalPayload);
      
      if (response.success) {
        setRental(response.rental);
        setSuccess('Your rental has been successfully processed!');
        setStep(4);
      } else {
        setError(response.message || 'Failed to process rental. Please try again.');
      }
    } catch (err) {
      console.error('Rental submission error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderUnitDetails = () => {
    if (!unit) return null;
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Unit #{unit.unit_code}</CardTitle>
            <Badge className="bg-green-500">Available</Badge>
          </div>
          <CardDescription>{unit.size}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-2xl font-bold text-gray-900">${unit.monthly_rate}/mo</p>
            <p className="text-sm text-gray-500">{unit.square_feet} sq ft</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
            <ul className="space-y-1">
              {unit.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {unit.description && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description:</h4>
              <p className="text-gray-600">{unit.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Step 1: Account Information
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                You need to be signed in to rent a storage unit.
              </p>
            </div>
          </div>
        </div>

        {isAuthenticated() ? (
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                You are signed in as {currentUser?.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Personal Information</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-sm text-gray-500">Name:</span>
                      <p className="font-medium">{currentUser?.first_name} {currentUser?.last_name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="font-medium">{currentUser?.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone:</span>
                      <p className="font-medium">{currentUser?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <div className="mt-2">
                    <p className="font-medium">{currentUser?.address_line1}</p>
                    {currentUser?.address_line2 && <p className="font-medium">{currentUser.address_line2}</p>}
                    <p className="font-medium">
                      {currentUser?.city}, {currentUser?.state} {currentUser?.zip_code}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/units')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Units
              </Button>
              <Button onClick={handleNextStep}>
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>
                Please sign in or create an account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <User className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Not signed in</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You need to be signed in to rent a storage unit.
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                <Link to="/login" className="w-full">
                  <Button className="w-full">Sign In</Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button variant="outline" className="w-full">Create Account</Button>
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" onClick={() => navigate('/units')} className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Units
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    );
  };

  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Step 2: Rental Details
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Choose your payment plan and rental start date.
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Plan</CardTitle>
            <CardDescription>
              Select a payment plan that works for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a payment plan:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      rentalData.paymentPlan === 'monthly' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                    onClick={() => handleInputChange('paymentPlan', 'monthly')}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Monthly</h4>
                      {rentalData.paymentPlan === 'monthly' && (
                        <Check className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-2xl font-bold">${unit?.monthly_rate}/mo</p>
                    <p className="text-sm text-gray-500">Billed monthly</p>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      rentalData.paymentPlan === '3-month' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                    onClick={() => handleInputChange('paymentPlan', '3-month')}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">3-Month</h4>
                      {rentalData.paymentPlan === '3-month' && (
                        <Check className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-2xl font-bold">${(unit?.monthly_rate * 3 * 0.95).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Save 5% with quarterly billing</p>
                    <Badge className="mt-2 bg-green-500">5% Discount</Badge>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${
                      rentalData.paymentPlan === '6-month' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                    onClick={() => handleInputChange('paymentPlan', '6-month')}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">6-Month</h4>
                      {rentalData.paymentPlan === '6-month' && (
                        <Check className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-2xl font-bold">${(unit?.monthly_rate * 6 * 0.9).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Save 10% with semi-annual billing</p>
                    <Badge className="mt-2 bg-green-500">10% Discount</Badge>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Rental Start Date:
                </label>
                <div className="relative">
                  <input
                    id="startDate"
                    type="date"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min={new Date().toISOString().split('T')[0]}
                    value={rentalData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Your rental will begin on this date. You can access your unit starting from this date.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleNextStep}>
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Step 3: Payment Information
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Enter your payment details to complete your rental.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Enter your payment information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Payment Method:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer ${
                        rentalData.paymentMethod === 'credit_card' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                      onClick={() => handleInputChange('paymentMethod', 'credit_card')}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                          <h4 className="font-medium">Credit Card</h4>
                        </div>
                        {rentalData.paymentMethod === 'credit_card' && (
                          <Check className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer ${
                        rentalData.paymentMethod === 'bank_transfer' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                      onClick={() => handleInputChange('paymentMethod', 'bank_transfer')}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Building className="h-5 w-5 mr-2 text-gray-500" />
                          <h4 className="font-medium">Bank Transfer</h4>
                        </div>
                        {rentalData.paymentMethod === 'bank_transfer' && (
                          <Check className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {rentalData.paymentMethod === 'credit_card' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number:
                      </label>
                      <input
                        id="cardNumber"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1234 5678 9012 3456"
                        value={rentalData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-2">
                          Expiration Date:
                        </label>
                        <input
                          id="cardExpiry"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="MM/YY"
                          value={rentalData.cardExpiry}
                          onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-2">
                          CVC:
                        </label>
                        <input
                          id="cardCvc"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123"
                          value={rentalData.cardCvc}
                          onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {rentalData.paymentMethod === 'bank_transfer' && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      You'll receive instructions for completing the bank transfer after submitting your rental request.
                    </p>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={rentalData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Review your rental details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium">Unit #{unit?.unit_code}</h4>
                    <p className="text-sm text-gray-500">{unit?.size}</p>
                  </div>
                  <p className="font-medium">${unit?.monthly_rate}/mo</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-500">Payment Plan:</p>
                    <p className="font-medium">{rentalData.paymentPlan}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Start Date:</p>
                    <p className="font-medium">{new Date(rentalData.startDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Subtotal:</p>
                    <p className="font-medium">${calculateTotalAmount().toFixed(2)}</p>
                  </div>
                  {calculateDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Discount:</p>
                      <p className="font-medium">-${calculateDiscount().toFixed(2)}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <p className="text-lg font-bold">Total:</p>
                  <p className="text-lg font-bold">${calculateFinalAmount().toFixed(2)}</p>
                </div>
                
                <div className="pt-4 text-sm text-gray-500">
                  <p>
                    By completing this rental, you agree to our terms and conditions. Your payment will be processed immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevStep} disabled={loading}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleNextStep} disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <>
                Complete Rental
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start">
          <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{success || 'Your rental has been successfully processed!'}</span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rental Confirmation</CardTitle>
            <CardDescription>
              Your storage unit rental is confirmed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Thank You for Your Rental!</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your rental has been confirmed and your storage unit is ready for use.
                </p>
              </div>
              
              <div className="border-t border-b border-gray-200 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Rental ID:</p>
                    <p className="font-medium">#{rental?.id || 'Processing'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Unit Number:</p>
                    <p className="font-medium">#{unit?.unit_code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date:</p>
                    <p className="font-medium">{new Date(rentalData.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Plan:</p>
                    <p className="font-medium">{rentalData.paymentPlan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Monthly Rate:</p>
                    <p className="font-medium">${unit?.monthly_rate}/month</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Paid:</p>
                    <p className="font-medium">${calculateFinalAmount().toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Next Steps:</h4>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Check your email for a confirmation and receipt.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">Your access codes will be available in your dashboard.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">You can access your unit starting on your rental start date.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Link to="/dashboard">
              <Button>
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/units">
              <Button variant="outline">
                Browse More Units
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  };

  if (loading && !unit) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Rent Your Storage Unit
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Complete your rental in just a few easy steps
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className={`h-2 ${step >= 1 ? 'bg-blue-500' : 'bg-gray-200'} rounded-l-full`}></div>
            </div>
            <div className="flex-1">
              <div className={`h-2 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex-1">
              <div className={`h-2 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex-1">
              <div className={`h-2 ${step >= 4 ? 'bg-blue-500' : 'bg-gray-200'} rounded-r-full`}></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <div className={step >= 1 ? 'text-blue-600 font-medium' : ''}>Account</div>
            <div className={step >= 2 ? 'text-blue-600 font-medium' : ''}>Rental Details</div>
            <div className={step >= 3 ? 'text-blue-600 font-medium' : ''}>Payment</div>
            <div className={step >= 4 ? 'text-blue-600 font-medium' : ''}>Confirmation</div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
            </div>
            <div className="md:col-span-1">
              {renderUnitDetails()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalPage;

