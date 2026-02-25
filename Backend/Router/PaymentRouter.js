const express = require('express');
const router = express.Router();
const {
    createPaymentLink,
    getAllPayments,
    getPaymentStatus,
    updatePaymentStatus,
    cancelPaymentLink,
    deletePayment
} = require('../Controller/PaymentController');
const { authenticate } = require('../MiddleWare/auth');

// Admin routes (protected)
router.post('/create', authenticate, createPaymentLink);
router.get('/getall', authenticate, getAllPayments);
router.get('/status/:id', authenticate, getPaymentStatus);
router.put('/update/:id', authenticate, updatePaymentStatus);
router.post('/cancel/:id', authenticate, cancelPaymentLink);
router.delete('/delete/:id', authenticate, deletePayment);

module.exports = router;
