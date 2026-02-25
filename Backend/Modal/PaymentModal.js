const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: 'AC Service Payment'
    },
    paymentLinkId: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['created', 'paid', 'expired', 'cancelled'],
        default: 'created'
    },
    razorpayOrderId: {
        type: String
    },
    razorpayPaymentId: {
        type: String
    },
    paidAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);
