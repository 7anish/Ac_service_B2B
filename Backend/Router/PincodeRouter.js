const express = require('express');
const router = express.Router();
const {
    getAllPincodes,
    getCities,
    createPincode,
    updatePincode,
    deletePincode
} = require('../Controller/PincodeController');
const { authenticate } = require('../MiddleWare/auth');

// Public routes
router.get('/getall', getAllPincodes);
router.get('/cities', getCities);

// Admin routes (protected)
router.post('/create', authenticate, createPincode);
router.put('/update/:id', authenticate, updatePincode);
router.delete('/delete/:id', authenticate, deletePincode);

module.exports = router;
