# Razorpay Payment Link Integration - Setup Guide

## Overview
This integration allows admins to create and manage Razorpay payment links for AC service B2B customers.

## Features
- ✅ Create payment links with customer details (name, phone, amount)
- ✅ Automatic SMS notification to customers
- ✅ Real-time payment status tracking
- ✅ Copy payment links to clipboard
- ✅ Refresh payment status from Razorpay
- ✅ View all payment records in admin dashboard
- ✅ Delete payment records

## Installation Steps

### 1. Install Razorpay Package
Navigate to the Backend directory and install Razorpay:
```bash
cd Backend
npm install razorpay
```

### 2. Get Razorpay Credentials
1. Sign up for a Razorpay account at https://razorpay.com/
2. Go to Dashboard → Settings → API Keys
3. Generate API Keys (you'll get Key ID and Key Secret)
4. **Important**: Use TEST mode keys for development

### 3. Configure Environment Variables
Add the following to your `Backend/.env` file:
```env
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

**Example:**
```env
RAZORPAY_KEY_ID=rzp_test_abcdefghijklmn
RAZORPAY_KEY_SECRET=your_secret_key_here
```

### 4. Restart Backend Server
After adding environment variables, restart your backend server:
```bash
cd Backend
npm start
# or
nodemon
```

## Usage Guide

### Admin Dashboard
1. Login to admin dashboard
2. Click on "Manage Payments" in the sidebar
3. Click "+ Create Payment Link" button
4. Fill in customer details:
   - **Name**: Customer's full name
   - **Phone Number**: 10-digit mobile number (required for SMS notification)
   - **Amount**: Payment amount in INR
   - **Description**: Optional description (default: "AC Service Payment")
5. Click "Create Link"
6. Copy the generated payment link and send it to the customer

### Payment Link Features
- **Automatic SMS**: Razorpay sends SMS with payment link to customer's phone
- **Secure Payment**: Customer pays through Razorpay's secure payment gateway
- **Payment Tracking**: View status (created, paid, expired, cancelled) in dashboard
- **Refresh Status**: Click refresh icon to sync latest status from Razorpay
- **Copy Link**: Click copy button to copy payment link to clipboard

### Payment Status
- **Created**: Payment link generated but not paid yet
- **Paid**: Customer has completed payment
- **Expired**: Payment link has expired (30 days from creation)
- **Cancelled**: Payment link cancelled by admin

## API Endpoints

### Admin Routes (Requires Authentication)
```
POST   /api/v1/payment/create         - Create payment link
GET    /api/v1/payment/getall         - Get all payment records
GET    /api/v1/payment/status/:id     - Refresh payment status
PUT    /api/v1/payment/update/:id     - Update payment status
POST   /api/v1/payment/cancel/:id     - Cancel payment link
DELETE /api/v1/payment/delete/:id     - Delete payment record
```

## Database Schema

### Payment Model
```javascript
{
  name: String (required),
  phoneNumber: String (required),
  amount: Number (required),
  description: String,
  paymentLinkId: String (Razorpay link ID),
  shortUrl: String (Razorpay short URL),
  status: String (created, paid, expired, cancelled),
  razorpayOrderId: String,
  razorpayPaymentId: String,
  paidAt: Date,
  expiresAt: Date,
  createdAt: Date
}
```

## Testing

### Test Mode (Development)
1. Use Razorpay TEST mode credentials (keys starting with `rzp_test_`)
2. Use test card numbers provided by Razorpay:
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date
3. No actual money is charged in test mode

### Live Mode (Production)
1. Complete KYC verification in Razorpay dashboard
2. Switch to LIVE mode credentials (keys starting with `rzp_live_`)
3. Update `.env` file with live credentials
4. Real payments will be processed

## Important Notes

⚠️ **Security**
- Never commit `.env` file to version control
- Keep Razorpay secret keys secure
- Use environment variables for all credentials

⚠️ **SMS Charges**
- Razorpay charges for SMS sent to customers
- Check your Razorpay pricing plan

⚠️ **Payment Link Expiry**
- Default expiry: 30 days from creation
- Expired links cannot be used for payment
- Create new link if expired

## Troubleshooting

### Common Issues

**1. "Error creating payment link"**
- Check if Razorpay credentials are correct in `.env`
- Verify Razorpay account is active
- Check if test/live mode matches your credentials

**2. SMS not received**
- Verify phone number format (10 digits, no +91)
- Check Razorpay dashboard for SMS delivery status
- Ensure SMS is enabled in Razorpay settings

**3. Payment status not updating**
- Click refresh icon to manually sync status
- Check network connectivity
- Verify Razorpay API is accessible

**4. Authorization errors**
- Ensure admin is logged in
- Check if JWT token is valid
- Verify authentication middleware is working

## Support
For Razorpay specific issues, refer to:
- Razorpay Documentation: https://razorpay.com/docs/
- Razorpay Support: https://razorpay.com/support/

## Files Created
- `Backend/Modal/PaymentModal.js` - Payment database schema
- `Backend/Controller/PaymentController.js` - Payment business logic
- `Backend/Router/PaymentRouter.js` - Payment API routes
- `frontend/src/Component/AdminPages/ManagePayments.jsx` - Admin UI
