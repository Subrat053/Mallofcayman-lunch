/**
 * Subscription API Service
 * Handles all subscription-related API calls
 */

import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';

class SubscriptionService {
  /**
   * Get early seller subscription status (free slots remaining, pricing)
   * @returns {Promise<Object>} - Subscription config status
   */
  static async getSubscriptionStatus() {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.subscriptionConfig.status}`,
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch subscription status');
      }

      return await response.json();
    } catch (error) {
      console.error('Get subscription status error:', error);
      throw error;
    }
  }

  /**
   * Get admin stats for subscription config
   * @returns {Promise<Object>} - Admin stats (totalLimit, used, remaining)
   */
  static async getAdminStats() {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.subscriptionConfig.admin}`,
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch admin stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Get admin stats error:', error);
      throw error;
    }
  }

  /**
   * Create a subscription (select plan)
   * @param {string} shopId - Shop ID
   * @param {string} plan - Plan name (free, bronze, silver, gold)
   * @param {string} billingCycle - Billing cycle (monthly, quarterly, semiannual, annual, yearly)
   * @returns {Promise<Object>} - Payment intent details or success message
   */
  static async createSubscription(shopId, plan, billingCycle) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.subscription.createSubscription}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shopId, plan, billingCycle }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Subscription creation error:', error);
      throw error;
    }
  }

  /**
   * Confirm subscription payment with payment method
   * Frontend sends payment method ID, backend confirms with secret key
   * @param {string} shopId - Shop ID
   * @param {string} stripePaymentIntentId - Payment intent ID
   * @param {string} paymentMethodId - Stripe payment method ID
   * @returns {Promise<Object>} - Subscription details or additional action required
   */
  static async confirmWithPaymentMethod(shopId, stripePaymentIntentId, paymentMethodId) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.subscription.confirmWithPaymentMethod}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shopId,
            stripePaymentIntentId,
            paymentMethodId,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Payment confirmation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment confirmation error:', error);
      throw error;
    }
  }

  /**
   * Confirm subscription payment (legacy method)
   * @param {string} shopId - Shop ID
   * @param {string} stripePaymentIntentId - Payment intent ID
   * @returns {Promise<Object>} - Subscription details
   */
  static async confirmPayment(shopId, stripePaymentIntentId) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.subscription.confirmPayment}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shopId,
            stripePaymentIntentId,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Payment confirmation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment confirmation error:', error);
      throw error;
    }
  }

  /**
   * Get current subscription for a shop
   * @param {string} shopId - Shop ID
   * @returns {Promise<Object>} - Current subscription details
   */
  static async getCurrentSubscription(shopId) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.subscription.getCurrentSubscription}?shopId=${shopId}`,
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch subscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Get subscription error:', error);
      throw error;
    }
  }

  /**
   * Upgrade subscription to a higher plan
   * @param {string} shopId - Shop ID
   * @param {string} newPlan - New plan name
   * @param {string} billingCycle - Billing cycle
   * @returns {Promise<Object>} - Payment intent for upgrade
   */
  static async upgradeSubscription(shopId, newPlan, billingCycle) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.subscription.upgrade}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shopId, newPlan, billingCycle }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upgrade failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Upgrade error:', error);
      throw error;
    }
  }

  /**
   * Downgrade subscription to a lower plan
   * @param {string} shopId - Shop ID
   * @param {string} newPlan - New plan name
   * @returns {Promise<Object>} - Downgrade confirmation
   */
  static async downgradeSubscription(shopId, newPlan) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.subscription.downgrade}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shopId, newPlan }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Downgrade failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Downgrade error:', error);
      throw error;
    }
  }

  /**
   * Cancel subscription
   * @param {string} shopId - Shop ID
   * @returns {Promise<Object>} - Cancellation confirmation
   */
  static async cancelSubscription(shopId) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.subscription.cancel}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shopId }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Cancellation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Cancellation error:', error);
      throw error;
    }
  }
}

export default SubscriptionService;
