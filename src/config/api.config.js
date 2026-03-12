/**
 * API Configuration
 * Centralized configuration for API endpoints and keys
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const STRIPE_PUBLIC_KEY =
  import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Validate required environment variables
if (!STRIPE_PUBLIC_KEY) {
  console.warn('⚠️  Stripe public key is not configured. Set VITE_STRIPE_PUBLIC_KEY or VITE_STRIPE_PUBLISHABLE_KEY.');
}

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  stripePublicKey: STRIPE_PUBLIC_KEY,
  timeout: 30000, // 30 seconds
};

export const API_ENDPOINTS = {
  // Shop endpoints
  shop: {
    register: '/api/shop/register',
    login: '/api/shop/login',
    getProfile: '/api/shop/profile',
    updateProfile: '/api/shop/update',
  },

  // Subscription endpoints
  subscription: {
    createSubscription: '/api/subscription/select-plan',
    confirmPayment: '/api/subscription/confirm-payment',
    confirmWithPaymentMethod: '/api/subscription/confirm-with-payment-method',
    getCurrentSubscription: '/api/subscription/current',
    upgrade: '/api/subscription/upgrade',
    downgrade: '/api/subscription/downgrade',
    cancel: '/api/subscription/cancel',
  },

  // Subscription config endpoints (early seller free slots)
  subscriptionConfig: {
    status: '/api/subscription-config/status',
    admin: '/api/subscription-config/admin',
  },

  // Stripe endpoints
  stripe: {
    createPaymentIntent: '/api/stripe/create-payment-intent',
  },
};

export default API_CONFIG;
