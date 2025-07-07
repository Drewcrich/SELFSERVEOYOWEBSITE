import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  User, Package, CreditCard, FileText, Settings, 
  Home, LogOut, ChevronRight, AlertCircle, CheckCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

// Dashboard overview component
const DashboardOverview = () => {
  const { currentUser, getAuthHeaders, API_URL } = useAuth();
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !currentUser) return;

        const response = await api.rentals.getUserRentals(token, currentUser.id);
        
        if (response.success) {
          setRentals(response.rentals);
        } else {
          setError('Failed to load your rentals. Please try again.');
        }
      } catch (err) {
        console.error('Error fetching rentals:', err);
        setError('An error occurred while loading your rentals.');
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [currentUser]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'expired':
        return <Badge className="bg-red-500">Expired</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Welcome back, {currentUser?.first_name}!
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Manage your storage units, payments, and account settings from your dashboard.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Storage Units</CardTitle>
            <CardDescription>
              Manage your current storage unit rentals
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : rentals.length > 0 ? (
              <div className="space-y-4">
                {rentals.map((rental) => (
                  <div key={rental.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Unit #{rental.storage_unit.unit_code}</h4>
                        <p className="text-sm text-gray-500">{rental.storage_unit.size}</p>
                      </div>
                      {getStatusBadge(rental.status)}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Monthly Rate:</span>
                        <span className="ml-1 font-medium">${rental.monthly_rate}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Plan:</span>
                        <span className="ml-1 font-medium">{rental.payment_plan}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Start Date:</span>
                        <span className="ml-1 font-medium">{new Date(rental.start_date).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Next Payment:</span>
                        <span className="ml-1 font-medium">{rental.next_payment_date ? new Date(rental.next_payment_date).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Link to={`/dashboard/rentals/${rental.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Package className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No storage units</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have any storage units rented yet.
                </p>
                <div className="mt-6">
                  <Link to="/units">
                    <Button>Browse Storage Units</Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your personal and contact information
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

              <div className="pt-4">
                <Link to="/dashboard/profile">
                  <Button variant="outline" size="sm" className="w-full">
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : rentals.length > 0 && rentals.some(r => r.payments && r.payments.length > 0) ? (
              <div className="space-y-3">
                {rentals
                  .flatMap(r => r.payments || [])
                  .sort((a, b) => new Date(b.payment_date) - new Date(a.payment_date))
                  .slice(0, 3)
                  .map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">${payment.amount.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{new Date(payment.payment_date).toLocaleDateString()}</p>
                      </div>
                      <Badge className={payment.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}>
                        {payment.status}
                      </Badge>
                    </div>
                  ))}
                <div className="pt-2">
                  <Link to="/dashboard/payments">
                    <Button variant="link" size="sm" className="w-full">
                      View All Payments
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <CreditCard className="h-8 w-8 text-gray-400 mx-auto" />
                <p className="mt-1 text-sm text-gray-500">No payment history yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : rentals.length > 0 ? (
              <div className="space-y-3">
                {rentals.some(r => r.lease_document_url) ? (
                  rentals
                    .filter(r => r.lease_document_url)
                    .map((rental) => (
                      <div key={rental.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Lease Agreement</p>
                          <p className="text-xs text-gray-500">Unit #{rental.storage_unit.unit_code}</p>
                        </div>
                        <a 
                          href={rental.lease_document_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FileText className="h-5 w-5" />
                        </a>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-4">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto" />
                    <p className="mt-1 text-sm text-gray-500">No documents available</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <FileText className="h-8 w-8 text-gray-400 mx-auto" />
                <p className="mt-1 text-sm text-gray-500">No documents available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-1">
              <Link
                to="/units"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                <Package className="mr-3 h-5 w-5 text-gray-400" />
                Browse Storage Units
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
              </Link>
              <Link
                to="/dashboard/profile"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                <User className="mr-3 h-5 w-5 text-gray-400" />
                Edit Profile
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
              </Link>
              <Link
                to="/dashboard/payments"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                <CreditCard className="mr-3 h-5 w-5 text-gray-400" />
                Payment History
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
              </Link>
              <a
                href="tel:+12175550123"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                <Phone className="mr-3 h-5 w-5 text-gray-400" />
                Contact Support
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
              </a>
            </nav>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Profile component
const ProfileSettings = () => {
  const { currentUser, updateProfile, error: authError, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.first_name || '',
        lastName: currentUser.last_name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address_line1: currentUser.address_line1 || '',
        address_line2: currentUser.address_line2 || '',
        city: currentUser.city || '',
        state: currentUser.state || '',
        zip_code: currentUser.zip_code || ''
      });
    }
  }, [currentUser]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear messages when user types
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare data for API
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2 || null,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code
      };

      // Update profile
      const result = await updateProfile(userData);
      
      if (result.success) {
        setSuccess('Profile updated successfully');
      } else {
        setError(result.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
          <p className="text-sm text-gray-500">Update your personal information</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          <Home className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {(error || authError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error || authError}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start">
          <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your name, contact information, and address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={loading || authLoading}
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={loading || authLoading}
                />
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
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                value={formData.email}
                disabled={true}
              />
              <p className="mt-1 text-xs text-gray-500">
                Email address cannot be changed. Contact support if you need to update your email.
              </p>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={loading || authLoading}
              />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Street address"
                value={formData.address_line1}
                onChange={(e) => handleInputChange('address_line1', e.target.value)}
                disabled={loading || authLoading}
              />
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
                value={formData.address_line2 || ''}
                onChange={(e) => handleInputChange('address_line2', e.target.value)}
                disabled={loading || authLoading}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  disabled={loading || authLoading}
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={loading || authLoading}
                />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ZIP"
                  value={formData.zip_code}
                  onChange={(e) => handleInputChange('zip_code', e.target.value)}
                  disabled={loading || authLoading}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/dashboard')}
                disabled={loading || authLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading || authLoading}
              >
                {loading || authLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Dashboard component with routing
const DashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/rentals/:id" element={<div>Rental Details</div>} />
            <Route path="/payments" element={<div>Payment History</div>} />
            <Route path="/documents" element={<div>Documents</div>} />
            <Route path="/settings" element={<div>Account Settings</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

