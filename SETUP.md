# Quick Setup Guide - Mall of Cayman

## 5-Minute Quick Start

### Prerequisites
- Node.js v18+ installed
- MongoDB Atlas account
- Stripe account (test keys)

### Step 1: Backend Setup (2 minutes)

```bash
cd Backend-lunch
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend:
```bash
npm start
```
✅ Backend runs on `http://localhost:5000`

### Step 2: Frontend Setup (2 minutes)

In another terminal:
```bash
cd ..
npm install
```

Create `.env.local` file:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key
```

Start frontend:
```bash
npm run dev
```
✅ Frontend runs on `http://localhost:5173`

### Step 3: Test Payment Flow (1 minute)

1. Navigate to http://localhost:5173
2. Register with shop details
3. Select Gold plan (monthly)
4. Use test card: `4242 4242 4242 4242`
5. Other test fields: any valid values
6. Click Pay

✅ You should see a success page

---

## Getting Test Credentials

### Stripe Test Keys
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy **Publishable key** → `VITE_STRIPE_PUBLIC_KEY`
3. Copy **Secret key** → `STRIPE_SECRET_KEY`

### MongoDB Connection
1. Go to https://cloud.mongodb.com/
2. Create free cluster
3. Create database user
4. Copy connection string
5. Replace `<password>` with actual password
6. Set as `MONGO_URI`

### Email (Gmail)
1. Enable 2FA on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Generate app password
4. Use as `EMAIL_PASS`

### Cloudinary
1. Go to https://cloudinary.com/console/settings/credentials
2. Copy credentials to `.env`

---

## Verification

### Check Backend
```bash
curl http://localhost:5000
# Should return: {"message":"Mall of Cayman API running"}
```

### Check Frontend Build
```bash
npm run build
# Should create dist/ folder
```

---

## For Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Environment configuration
- Full deployment checklist
- Security best practices
- Database setup
- Monitoring and logging

---

## Structure Overview

```
Frontend (React)        Backend (Node.js)       Database (MongoDB)
├── Services/           ├── Controllers/        ├── Shops
│  ├─ ShopService       ├── Models/             ├── Subscriptions
│  ├─ StripeService     ├── Routes/             └── Users
│  └─ SubService        └── Utils/
└─ Config/API           
```

All API calls → Service Layer → Backend → Database

No hardcoded URLs. All configured via environment variables.

---

## Common Commands

```bash
# Frontend
npm run dev              # Start development
npm run build            # Build for production
npm run preview          # Preview production build

# Backend
npm start                # Start with auto-reload (nodemon)
npm run test             # Run tests (if configured)
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check PORT not in use: `netstat -ano \| grep 5000` |
| MongoDB connection fails | Verify MONGO_URI, check IP whitelist |
| Payment fails | Use Stripe test key, not live key |
| CORS errors | Check VITE_API_BASE_URL setting |
| Module not found | Run `npm install` in affected directory |

---

## Next Steps

After successful local setup:
1. Explore the admin dashboard
2. Test upgrade/downgrade flows
3. Verify email notifications
4. Check MongoDB data structure
5. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup

