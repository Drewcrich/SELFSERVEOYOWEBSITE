/**
 * API Service for OwnYourOwnStorage
 * Handles all API requests to the backend
 */

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get the authentication headers
 * @param {string} token - JWT token
 * @returns {Object} Headers object with Authorization
 */
const getAuthHeaders = (token) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

/**
 * Handle API response
 * @param {Response} response - Fetch response object
 * @returns {Promise} Promise that resolves to the response data
 */
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // If the response contains validation errors, include them in the error
    if (data.validation_errors) {
      throw {
        message: data.message || 'An error occurred',
        validation_errors: data.validation_errors,
        status: response.status
      };
    }
    
    throw {
      message: data.message || 'An error occurred',
      status: response.status
    };
  }
  
  return data;
};

/**
 * API service object
 */
const api = {
  // Auth endpoints
  auth: {
    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Promise} Promise that resolves to the response data
     */
    register: async (userData) => {
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    
    /**
     * Login a user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} Promise that resolves to the response data
     */
    login: async (email, password) => {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    
    /**
     * Verify a token
     * @param {string} token - JWT token
     * @returns {Promise} Promise that resolves to the response data
     */
    verifyToken: async (token) => {
      try {
        const response = await fetch(`${API_URL}/auth/verify`, {
          method: 'GET',
          headers: getAuthHeaders(token)
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error('Token verification error:', error);
        throw error;
      }
    }
  },
  
  // User endpoints
  users: {
    /**
     * Get user profile
     * @param {string} token - JWT token
     * @returns {Promise} Promise that resolves to the response data
     */
    getProfile: async (token) => {
      try {
        const response = await fetch(`${API_URL}/users/profile`, {
          method: 'GET',
          headers: getAuthHeaders(token)
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error('Get profile error:', error);
        throw error;
      }
    },
    
    /**
     * Update user profile
     * @param {string} token - JWT token
     * @param {number} userId - User ID
     * @param {Object} userData - User data to update
     * @returns {Promise} Promise that resolves to the response data
     */
    updateProfile: async (token, userId, userData) => {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
          method: 'PUT',
          headers: getAuthHeaders(token),
          body: JSON.stringify(userData)
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error('Update profile error:', error);
        throw error;
      }
    },
    
    /**
     * Change user password
     * @param {string} token - JWT token
     * @param {string} currentPassword - Current password
     * @param {string} newPassword - New password
     * @returns {Promise} Promise that resolves to the response data
     */
    changePassword: async (token, currentPassword, newPassword) => {
      try {
        const response = await fetch(`${API_URL}/users/change-password`, {
          method: 'POST',
          headers: getAuthHeaders(token),
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword
          })
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error('Change password error:', error);
        throw error;
      }
    }
  },
  
  // Storage unit endpoints
  storageUnits: {
    /**
     * Get all storage units
     * @returns {Promise} Promise that resolves to the response data
     */
    getAll: async () => {
      try {
        const response = await fetch(`${API_URL}/storage-units`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error('Get storage units error:', error);
        throw error;
      }
    },
    
    /**
     * Get available storage units
     * @returns {Promise} Promise that resolves to the response data
     */
    getAvailable: async () => {
      try {
        const response = await fetch(`${API_URL}/storage-units/available`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error('Get available storage units error:', error);
        throw error;
      }
    },
    
    /**
     * Get a specific storage unit
     * @param {number} unitId - Storage unit ID
     * @returns {Promise} Promise that resolves to the response data
     */
    getById: async (unitId) => {
      try {
        const response = await fetch(`${API_URL}/storage-units/${unitId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error(`Get storage unit ${unitId} error:`, error);
        throw error;
      }
    },
    
    /**
     * Get access codes for a storage unit (authenticated)
     * @param {string} token - JWT token
     * @param {number} unitId - Storage unit ID
     * @returns {Promise} Promise that resolves to the response data
     */
    getAccessCodes: async (token, unitId) => {
      try {
        const response = await fetch(`${API_URL}/storage-units/${unitId}/access-codes`, {
          method: 'GET',
          headers: getAuthHeaders(token)
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error(`Get access codes for unit ${unitId} error:`, error);
        throw error;
      }
    }
  },
  
  // Rental endpoints
  rentals: {
    /**
     * Create a new rental
     * @param {string} token - JWT token
     * @param {Object} rentalData - Rental data
     * @returns {Promise} Promise that resolves to the response data
     */
    create: async (token, rentalData) => {
      try {
        const response = await fetch(`${API_URL}/rentals`, {
          method: 'POST',
          headers: getAuthHeaders(token),
          body: JSON.stringify(rentalData)
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error('Create rental error:', error);
        throw error;
      }
    },
    
    /**
     * Get a specific rental
     * @param {string} token - JWT token
     * @param {number} rentalId - Rental ID
     * @returns {Promise} Promise that resolves to the response data
     */
    getById: async (token, rentalId) => {
      try {
        const response = await fetch(`${API_URL}/rentals/${rentalId}`, {
          method: 'GET',
          headers: getAuthHeaders(token)
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error(`Get rental ${rentalId} error:`, error);
        throw error;
      }
    },
    
    /**
     * Get all rentals for a user
     * @param {string} token - JWT token
     * @param {number} userId - User ID
     * @returns {Promise} Promise that resolves to the response data
     */
    getUserRentals: async (token, userId) => {
      try {
        const response = await fetch(`${API_URL}/users/${userId}/rentals`, {
          method: 'GET',
          headers: getAuthHeaders(token)
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error(`Get rentals for user ${userId} error:`, error);
        throw error;
      }
    },
    
    /**
     * Process a payment for a rental
     * @param {string} token - JWT token
     * @param {number} rentalId - Rental ID
     * @param {Object} paymentData - Payment data
     * @returns {Promise} Promise that resolves to the response data
     */
    processPayment: async (token, rentalId, paymentData) => {
      try {
        const response = await fetch(`${API_URL}/rentals/${rentalId}/payment`, {
          method: 'POST',
          headers: getAuthHeaders(token),
          body: JSON.stringify(paymentData)
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error(`Process payment for rental ${rentalId} error:`, error);
        throw error;
      }
    },
    
    /**
     * Generate a lease agreement for a rental
     * @param {string} token - JWT token
     * @param {number} rentalId - Rental ID
     * @returns {Promise} Promise that resolves to the response data
     */
    generateLease: async (token, rentalId) => {
      try {
        const response = await fetch(`${API_URL}/rentals/${rentalId}/lease`, {
          method: 'POST',
          headers: getAuthHeaders(token)
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error(`Generate lease for rental ${rentalId} error:`, error);
        throw error;
      }
    },
    
    /**
     * Cancel a rental
     * @param {string} token - JWT token
     * @param {number} rentalId - Rental ID
     * @returns {Promise} Promise that resolves to the response data
     */
    cancel: async (token, rentalId) => {
      try {
        const response = await fetch(`${API_URL}/rentals/${rentalId}/cancel`, {
          method: 'POST',
          headers: getAuthHeaders(token)
        });
        
        return handleResponse(response);
      } catch (error) {
        console.error(`Cancel rental ${rentalId} error:`, error);
        throw error;
      }
    }
  }
};

export default api;

