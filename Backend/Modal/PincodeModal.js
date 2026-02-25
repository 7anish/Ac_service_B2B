const mongoose = require('mongoose');

const PincodeSchema = new mongoose.Schema({
    pincode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[0-9]{6}$/
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pincode', PincodeSchema);
