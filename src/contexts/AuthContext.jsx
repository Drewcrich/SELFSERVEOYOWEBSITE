import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Verify token on initial load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/verify`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (data.success) {
          setCurrentUser(data.user);
        } else {
          // Token is invalid or expired
          logout();
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setError('Failed to authenticate. Please try again.');
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (data.success) {
        setCurrentUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        return { success: true, user: data.user };
      } else {
        setError(data.message || 'Registration failed');
        return { success: false, error: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = 'An error occurred during registration. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        setCurrentUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        return { success: true, user: data.user };
      } else {
        setError(data.message || 'Login failed');
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'An error occurred during login. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // Update user profile
  const updateProfile = async (userData) => {
    if (!currentUser || !token) {
      setError('You must be logged in to update your profile');
      return { success: false, error: 'You must be logged in to update your profile' };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/users/${currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (data.success) {
        setCurrentUser(data.user);
        return { success: true, user: data.user };
      } else {
        setError(data.message || 'Failed to update profile');
        return { success: false, error: data.message || 'Failed to update profile' };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = 'An error occurred while updating your profile. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    if (!currentUser || !token) {
      setError('You must be logged in to change your password');
      return { success: false, error: 'You must be logged in to change your password' };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/users/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword })
      });

      const data = await response.json();

      if (data.success) {
        return { success: true, message: data.message };
      } else {
        setError(data.message || 'Failed to change password');
        return { success: false, error: data.message || 'Failed to change password' };
      }
    } catch (error) {
      console.error('Password change error:', error);
      const errorMessage = 'An error occurred while changing your password. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get authenticated API headers
  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentUser && !!token;
  };

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.is_admin === true;
  };

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    getAuthHeaders,
    isAuthenticated,
    isAdmin,
    API_URL
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

