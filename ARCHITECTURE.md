# Architecture & Best Practices - Mall of Cayman

## System Design Overview

This document outlines the clean, deployment-ready architecture implemented for the Mall of Cayman application.

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (React)                           │
│                    Port: 5173 (Development)                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────────┐  ┌──────────────┐   │
│  │  Components     │  │   Service Layer     │  │ Configuration│   │
│  ├─────────────────┤  ├─────────────────────┤  ├──────────────┤   │
│  │ Register.jsx    │→ │ SubscriptionSvc     │→ │ api.config.js│   │
│  │ Store.jsx       │  │ ShopService         │  │              │   │
│  │ Other Pages     │  │ StripeService       │  │ Environment  │   │
│  └─────────────────┘  └─────────────────────┘  │ Variables    │   │
│                                                  └──────────────┘   │
│                                                                     │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ HTTP/HTTPS
                           │ (JSON)
                           ↓
┌──────────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js + Express)                      │
│                    Port: 5000 (Development)                         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────────┐   │
│  │   Routes     │  │ Controllers  │  │   Business Logic        │   │
│  ├──────────────┤  ├──────────────┤  ├─────────────────────────┤   │
│  │ shopRoutes   │→ │ shopCtrl     │→ │ Subscription Logic      │   │
│  │ stripeRoutes │  │ stripeCtrl   │  │ Payment Processing      │   │
│  │ subRoutes    │  │ subCtrl      │  │ Email Notifications     │   │
│  └──────────────┘  └──────────────┘  └─────────────────────────┘   │
│                                               │                     │
│  ┌──────────────────────────────────────────┴────────────────┐    │
│  │                  DATA LAYER                                │    │
│  ├────────────────────────────────────────────────────────────┤    │
│  │ • Shop Model  • Subscription Model  • User Authentication  │    │
│  │ • Validations • Hooks • Middleware  • Utilities             │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                ↓             ↓             ↓
        ┌──────────────┐  ┌──────────┐  ┌──────────┐
        │  MongoDB     │  │  Stripe  │  │ Email/   │
        │  (Database)  │  │(Payments)│  │Cloudinary│
        └──────────────┘  └──────────┘  └──────────┘
```

---

## Key Architectural Decisions

### 1. **Service Layer Pattern (Frontend)**

All API communication goes through dedicated service classes:

```
Component (Register.jsx)
        ↓
   SubscriptionService.confirmWithPaymentMethod()
        ↓
   API_CONFIG.baseURL + API_ENDPOINTS.subscription.confirmWithPaymentMethod
        ↓
   Backend API
```

**Benefits:**
- Centralized API logic
- Easy to mock for testing
- Single point of change for endpoints
- Separation of concerns
- Type-safe API calls

### 2. **Environment-Based Configuration**

All configuration comes from environment variables:

```javascript
// src/config/api.config.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
```

**Benefits:**
- No hardcoded URLs
- Easy deployment to different environments
- Secure credential management
- Different configs for dev/staging/production

### 3. **Secure Payment Flow**

Payment confirmation happens **on the backend** with the secret key:

```javascript
// Frontend
const paymentMethod = await stripe.createPaymentMethod({ card });
// → sends paymentMethod.id to backend

// Backend (SECRET KEY)
const intent = await stripe.paymentIntents.confirm(intentId, {
  payment_method: paymentMethodId // confirmed securely
});
```

**Security Benefits:**
- Card details never touch your server
- Backend uses secret key for confirmation
- Supports 3D Secure authentication
- PCI compliance
- Protection from client-side tampering

---

## File Structure & Responsibility

```
Frontend/
├── src/
│   ├── config/
│   │   └── api.config.js          ← All API endpoints & config
│   │
│   ├── services/                  ← All backend communication
│   │   ├── SubscriptionService.js ← Subscription API calls
│   │   ├── ShopService.js         ← Shop/Auth API calls
│   │   └── StripeService.js       ← Stripe API calls
│   │
│   ├── pages/
│   │   ├── Register.jsx           ← Uses services, no direct API calls
│   │   ├── Store.jsx
│   │   └── ...
│   │
│   ├── assets/                    ← Images, fonts, etc.
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example                   ← Template for environment vars
├── .env.local                     ← Actual values (not in git)
├── vite.config.js
└── package.json

Backend/
├── routes/
│   ├── shopRoutes.js
│   ├── stripeRoutes.js
│   └── subscriptionRoutes.js      ← All endpoint definitions
│
├── controllers/
│   ├── shopController.js          ← Business logic
│   ├── stripeController.js
│   └── subscriptionController.js
│
├── models/
│   ├── Shop.js                    ← Database schema
│   ├── Subscription.js
│   └── User.js
│
├── utils/
│   ├── emailService.js            ← Email sending
│   ├── cloudinary.js              ← File uploads
│   └── ...
│
├── index.js                       ← Server entry point
├── .env.example                   ← Template
├── .env                           ← Actual values (not in git)
└── package.json
```

---

## API Communication Flow

### Example: Subscribe to Plan

```javascript
// 1. FRONTEND - User selects plan and billing cycle
// File: src/pages/Register.jsx

const handleNextStep = async () => {
  // Business logic validates input
  await fetchPaymentIntent();
};

const fetchPaymentIntent = async () => {
  // Use StripeService (NOT direct API call)
  const data = await StripeService.createPaymentIntent(plan, cycle);
  // ↓ StripeService handles the HTTP request
};

// 2. STRIPE SERVICE - Abstracts API call
// File: src/services/StripeService.js

static async createPaymentIntent(selectedPlan, billingCycle) {
  const response = await fetch(
    `${API_CONFIG.baseURL}${API_ENDPOINTS.stripe.createPaymentIntent}`,
    { method: 'POST', body: JSON.stringify({...}) }
  );
  return await response.json();
}
// ↓ Uses env vars for URL, never hardcoded

// 3. BACKEND - Processes request with business logic
// File: Backend-lunch/controllers/stripeController.js

exports.createPaymentIntent = async (req, res) => {
  try {
    const stripe = getStripe(); // Uses STRIPE_SECRET_KEY
    const paymentIntent = await stripe.paymentIntents.create({...});
    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// ↓ All business logic on server
```

### Benefits of This Pattern
- **No hardcoded URLs** - Uses environment variables
- **Testable** - Can mock StripeService in tests
- **Maintainable** - Change endpoint in one place
- **Secure** - Credentials never in frontend
- **Scalable** - Easy to add new services

---

## Environment Variables

### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:5000          # Backend URL
VITE_STRIPE_PUBLIC_KEY=pk_test_...               # Stripe publishable key
```

### Backend (.env)
```env
PORT=5000                                          # Server port
NODE_ENV=development                               # Environment
MONGO_URI=mongodb+srv://...                        # Database
STRIPE_SECRET_KEY=sk_test_...                      # SECRET - never in frontend!
STRIPE_WEBHOOK_SECRET=whsec_...
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CORS_ORIGIN=http://localhost:5173,https://domain  # For security
```

---

## Deployment Ready Features

### ✅ Implemented
- [x] Environment-based configuration
- [x] No hardcoded secrets
- [x] Service layer for all API calls
- [x] Centralized endpoint management
- [x] Error handling throughout
- [x] Proper CORS setup
- [x] Backend business logic
- [x] Secure payment processing
- [x] Email validation
- [x] Input sanitization

### 🚀 Ready for Production
- [x] Code separation of concerns
- [x] Configuration templates (.env.example)
- [x] Deployment guide (DEPLOYMENT.md)
- [x] Setup guide (SETUP.md)
- [x] Security best practices
- [x] Database models
- [x] API documentation (via code)

---

## Common Patterns

### Making an API Call
```javascript
// ❌ DON'T - Hardcoded URL
const response = await fetch('http://localhost:5000/api/shop/register', {...});

// ✅ DO - Use service layer
import ShopService from '../services/ShopService';
const response = await ShopService.register(shopData);

// ✅ Inside service - Uses config
const response = await fetch(
  `${API_CONFIG.baseURL}${API_ENDPOINTS.shop.register}`,
  {...}
);
```

### Adding a New Endpoint
1. Add to `src/config/api.config.js`:
   ```javascript
   export const API_ENDPOINTS = {
     shop: {
       newEndpoint: '/api/shop/new-endpoint',
     }
   };
   ```

2. Add to service:
   ```javascript
   // src/services/ShopService.js
   static async newEndpoint(data) {
     const response = await fetch(
       `${API_CONFIG.baseURL}${API_ENDPOINTS.shop.newEndpoint}`,
       { method: 'POST', body: JSON.stringify(data) }
     );
     return await response.json();
   }
   ```

3. Use in component:
   ```javascript
   // src/pages/SomePage.jsx
   const result = await ShopService.newEndpoint(data);
   ```

---

## Testing

### Frontend API Testing
```javascript
// Mock SubscriptionService
jest.mock('../services/SubscriptionService', () => ({
  createSubscription: jest.fn().mockResolvedValue({
    success: true,
    clientSecret: 'pi_test_...'
  })
}));

// Test component behavior
it('should create subscription', async () => {
  const result = await SubscriptionService.createSubscription(...);
  expect(result.success).toBe(true);
});
```

### Backend API Testing
```javascript
// Use actual Stripe test keys
// Use MongoDB test database
// Mock email service
// Write integration tests
```

---

## Security Checklist

- [x] No hardcoded secrets in code
- [x] Environment variables for all credentials
- [x] .env files not in git (add to .gitignore)
- [x] Secret keys only on backend
- [x] CORS configured
- [x] Input validation on backend
- [x] Error messages don't leak sensitive info
- [x] HTTPS ready (works with ssl)
- [x] Stripe webhook signature verification
- [x] Database access controlled

---

## Next Steps for Production

1. **Obtain Production Credentials**
   - Stripe live keys
   - MongoDB production database
   - Email service credentials
   - Cloudinary production account

2. **Update Configuration**
   - Replace .env values with production keys
   - Update CORS_ORIGIN
   - Set NODE_ENV=production

3. **Deploy Backend**
   - Choose platform (Heroku, Railway, DigitalOcean)
   - Configure environment variables
   - Set up automatic backups
   - Monitor error logs

4. **Deploy Frontend**
   - Build: `npm run build`
   - Deploy dist/ folder
   - Update VITE_API_BASE_URL to production API
   - Enable caching

5. **Monitoring**
   - Set up error tracking
   - Monitor Stripe webhooks
   - Monitor email delivery
   - Monitor database performance

---

## References

- [Stripe Documentation](https://stripe.com/docs)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Best Practices](https://react.dev/learn)
- [MongoDB Security](https://docs.mongodb.com/manual/security/)
- [Environment Variables](https://vitejs.dev/config/)

