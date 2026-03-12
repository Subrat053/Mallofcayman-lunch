/**
 * Stripe API Service
 * Handles all Stripe-related API calls
 */

import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';

class StripeService {
  /**
   * Create a payment intent for the selected plan and billing cycle
   * @param {string} selectedPlan - Plan name (free, bronze, silver, gold)
   * @param {string} billingCycle - Billing cycle (monthly, quarterly, semiannual, annual, yearly)
   * @returns {Promise<Object>} - Payment intent details with client secret
   */
  static async createPaymentIntent(selectedPlan, billingCycle) {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ENDPOINTS.stripe.createPaymentIntent}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            selectedPlan,
            billingCycle,
          }),
        },
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create payment intent');
      }

      return await response.json();
    } catch (error) {
      console.error('Create payment intent error:', error);
      throw error;
    }
  }
}

export default StripeService;
