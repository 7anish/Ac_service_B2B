const express = require('express');
const router = express.Router();
const {
    getAllServices,
    createService,
    updateService,
    deleteService
} = require('../Controller/ServiceController');
const { authenticate } = require('../MiddleWare/auth');

// Public routes
router.get('/getall', getAllServices);

// Admin routes (protected)
router.post('/create', authenticate, createService);
router.put('/update/:id', authenticate, updateService);
router.delete('/delete/:id', authenticate, deleteService);

module.exports = router;
