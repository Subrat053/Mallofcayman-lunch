# Mall of Cayman - Deployment Guide

## System Architecture

The application is structured with clear separation of concerns:

```
Frontend (React + Vite)  →  API Calls  →  Backend (Node.js + Express)  →  MongoDB
   (Port 5173)          (HTTP/HTTPS)     (Port 5000)                    (Cloud)
```

- **Frontend**: React SPA with Stripe payment integration
- **Backend**: Express API server handling business logic and payments
- **Database**: MongoDB for persistent data storage
- **Payment**: Stripe for secure payment processing

---

## Prerequisites

- **Node.js** v18+ (download from https://nodejs.org/)
- **MongoDB Atlas** account (free tier available at https://www.mongodb.com/cloud/atlas)
- **Stripe Account** (create at https://stripe.com)
- **Cloudinary Account** (free tier at https://cloudinary.com)
- **Gmail/SMTP** credentials for email notifications
- **Git** for version control

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository_url>
cd Caymall-lunch
```

### 2. Backend Setup

```bash
cd Backend-lunch

# Install dependencies
npm install

# Create .env file with your credentials
cp .env.example .env
# Edit .env and fill in your actual values

# Start the backend server (with auto-reload via nodemon)
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ..

# Install dependencies
npm install

# Create .env.local file with your configuration
cp .env.example .env.local
# Edit .env.local with your API endpoint and Stripe key

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## Environment Variables

### Frontend (.env.local)

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key_here
```

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## API Architecture

### Service Layer (Frontend)

All API calls go through dedicated service classes in `src/services/`:

- **SubscriptionService**: Subscription CRUD operations
- **ShopService**: Shop registration and profile management
- **StripeService**: Stripe payment intent creation

Example usage:
```javascript
import SubscriptionService from '../services/SubscriptionService';

const result = await SubscriptionService.createSubscription(shopId, plan, billingCycle);
```

### API Configuration

Centralized in `src/config/api.config.js`:
- All endpoints defined in one place
- Easy to update for different environments
- Type-safe API calls

---

## Stripe Payment Flow

### Correct Implementation (Current)

1. **Backend** creates PaymentIntent with `confirmation_method: "manual"`
2. **Frontend** creates PaymentMethod using Stripe.js (publishable key)
3. **Frontend** sends PaymentMethod ID to backend
4. **Backend** confirms PaymentIntent using secret key
5. **Backend** returns subscription details

This ensures:
- Card details never touch your server
- Secure confirmation with secret key
- Support for 3D Secure authentication

---

## Deployment Checklist

### Before Going Live

- [ ] All environment variables configured
- [ ] MongoDB credentials secured and whitelisted
- [ ] Stripe keys switched to live keys
- [ ] CORS configured to accept only your domain
- [ ] HTTPS enabled
- [ ] Email configuration working
- [ ] Cloudinary credentials updated
- [ ] Frontend API URL points to production backend
- [ ] All API calls use service layer (no hardcoded URLs)
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Database backups automated

### Production Environment Setup

#### Frontend Deployment (Vercel/Netlify)

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Environment variables on platform:
```
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_STRIPE_PUBLIC_KEY=pk_live_... (never pk_test_)
```

#### Backend Deployment (Heroku/Railway/DigitalOcean)

```bash
# Ensure all dependencies are in .env
# Build is automatic for Node.js

# Important environment variables
NODE_ENV=production
PORT=5000  (or assigned by platform)
```

---

## Database Setup

### MongoDB Atlas (Recommended)

1. Create cluster at https://cloud.mongodb.com
2. Create database user with strong password
3. Whitelist your IP addresses
4. Copy connection string to MONGO_URI in .env
5. Use this format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

---

## Security Best Practices

### Environment Variables

- **Never commit .env files** to Git
- **Never expose secrets** in frontend code
- **Use service layer** for all API calls
- **Validate all inputs** on backend
- **Implement rate limiting** on API
- **Use HTTPS only** in production

### Stripe Security

- Store secret key in backend only
- Frontend uses publishable key only
- Implement webhook signature verification
- Keep Stripe.js library updated

### CORS Configuration

```javascript
// Backend: Allow only your domains
app.use(cors({
  origin: ['https://yourdomain.com', 'https://app.yourdomain.com']
}));
```

---

## Monitoring & Logging

### Backend Logs

Monitor these in production:
- Payment confirmation successes/failures
- Database connection status
- Email sending failures
- Webhook events from Stripe

### Stripe Dashboard

- Monitor payment succeeded/failed events
- Set up webhook endpoints
- Test payment processing with test keys first

---

## Troubleshooting

### Common Issues

**"Cannot find module 'jsonwebtoken'"**
```bash
npm install jsonwebtoken
```

**Payment Intent confirmation fails**
- Verify `confirmation_method: "manual"` in backend
- Check payment method is created on frontend
- Ensure backend uses secret key for confirmation

**CORS errors**
- Update CORS_ORIGIN in backend .env
- Ensure frontend API_BASE_URL is correct

**Database connection fails**
- Check MONGO_URI is correct
- Verify IP whitelist in MongoDB Atlas
- Test connection: `mongosh <connection_string>`

---

## File Structure

```
Caymall-lunch/
├── Backend-lunch/              # Node.js Express server
│   ├── controllers/             # Business logic
│   ├── models/                  # MongoDB schemas
│   ├── routes/                  # API endpoints
│   ├── services/                # Business logic
│   ├── utils/                   # Utilities (email, cloudinary)
│   ├── index.js                 # App entry point
│   └── .env.example             # Environment template
│
├── src/                         # React frontend
│   ├── config/                  # Configuration files
│   │   └── api.config.js        # API configuration
│   ├── services/                # API services
│   │   ├── SubscriptionService.js
│   │   ├── ShopService.js
│   │   └── StripeService.js
│   ├── pages/                   # React components
│   │   └── Register.jsx         # Registration flow
│   ├── assets/                  # Images, fonts, etc.
│   ├── App.jsx                  # Main App component
│   └── main.jsx                 # App entry point
│
├── package.json                 # Frontend dependencies
├── vite.config.js               # Vite configuration
└── .env.example                 # Frontend environment template
```

---

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Vite Guide](https://vitejs.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)

---

## Support

For issues or questions:
1. Check the Stripe dashboard for webhook events
2. Review backend logs for errors
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

