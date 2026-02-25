const Payment = require('../Modal/PaymentModal');
const Razorpay = require('razorpay');
require('dotenv').config();

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// Create payment link
const createPaymentLink = async (req, res) => {
    try {
        const { name, phoneNumber, amount, description } = req.body;

        if (!name || !phoneNumber || !amount) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, phone number and amount"
            });
        }

        // Create payment link in Razorpay
        const paymentLink = await razorpay.paymentLink.create({
            amount: amount * 100, // Convert to paise
            currency: "INR",
            accept_partial: false,
            description: description || "AC Service Payment",
            customer: {
                name: name,
                contact: phoneNumber
            },
            notify: {
                sms: true,
                email: false
            },
            reminder_enable: true
        });

        // Calculate expiry date (default 30 days from now)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        // Save payment details in database
        const payment = await Payment.create({
            name,
            phoneNumber,
            amount,
            description: description || "AC Service Payment",
            paymentLinkId: paymentLink.id,
            shortUrl: paymentLink.short_url,
            status: 'created',
            expiresAt
        });

        res.status(201).json({
            success: true,
            message: "Payment link created successfully",
            payment,
            paymentLink: paymentLink.short_url
        });
    } catch (error) {
        console.error('Error creating payment link:', error);
        res.status(500).json({
            success: false,
            message: "Error creating payment link",
            error: error.message
        });
    }
};

// Get all payment links (Admin)
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            payments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching payments",
            error: error.message
        });
    }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await Payment.findById(id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        // Fetch latest status from Razorpay
        try {
            const razorpayLink = await razorpay.paymentLink.fetch(payment.paymentLinkId);
            
            // Update status in database
            if (razorpayLink.status === 'paid' && payment.status !== 'paid') {
                payment.status = 'paid';
                payment.paidAt = new Date();
                await payment.save();
            } else if (razorpayLink.status === 'expired') {
                payment.status = 'expired';
                await payment.save();
            }
        } catch (razorpayError) {
            console.error('Error fetching from Razorpay:', razorpayError);
        }

        res.status(200).json({
            success: true,
            payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching payment status",
            error: error.message
        });
    }
};

// Update payment status (Webhook or manual)
const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, razorpayPaymentId, razorpayOrderId } = req.body;

        const payment = await Payment.findById(id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        payment.status = status;
        if (razorpayPaymentId) payment.razorpayPaymentId = razorpayPaymentId;
        if (razorpayOrderId) payment.razorpayOrderId = razorpayOrderId;
        if (status === 'paid') payment.paidAt = new Date();

        await payment.save();

        res.status(200).json({
            success: true,
            message: "Payment status updated",
            payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating payment status",
            error: error.message
        });
    }
};

// Cancel payment link
const cancelPaymentLink = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await Payment.findById(id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        // Cancel in Razorpay
        try {
            await razorpay.paymentLink.cancel(payment.paymentLinkId);
        } catch (razorpayError) {
            console.error('Error cancelling in Razorpay:', razorpayError);
        }

        payment.status = 'cancelled';
        await payment.save();

        res.status(200).json({
            success: true,
            message: "Payment link cancelled",
            payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error cancelling payment link",
            error: error.message
        });
    }
};

// Delete payment record
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await Payment.findByIdAndDelete(id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting payment",
            error: error.message
        });
    }
};

module.exports = {
    createPaymentLink,
    getAllPayments,
    getPaymentStatus,
    updatePaymentStatus,
    cancelPaymentLink,
    deletePayment
};
