/**
 * Shop API Service
 * Handles all shop-related API calls
 */

import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';

class ShopService {
  /**
   * Register a new shop
   * @param {Object} shopData - Shop registration data
   * @returns {Promise<Object>} - Shop details and token
   */
  static async register(shopData) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.shop.register}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(shopData),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Login shop
   * @param {string} email - Shop email
   * @param {string} password - Shop password
   * @returns {Promise<Object>} - Shop details and token
   */
  static async login(email, password) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.shop.login}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Get shop profile
   * @param {string} shopId - Shop ID
   * @param {string} token - Auth token
   * @returns {Promise<Object>} - Shop profile
   */
  static async getProfile(shopId, token) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.shop.getProfile}?shopId=${shopId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  /**
   * Update shop profile
   * @param {string} shopId - Shop ID
   * @param {Object} updateData - Data to update
   * @param {string} token - Auth token
   * @returns {Promise<Object>} - Updated shop details
   */
  static async updateProfile(shopId, updateData, token) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.shop.updateProfile}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ shopId, ...updateData }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Update failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}

export default ShopService;
