const Pincode = require('../Modal/PincodeModal');

// Get all pincodes
const getAllPincodes = async (req, res) => {
    try {
        const pincodes = await Pincode.find({ isActive: true }).sort({ pincode: 1 });
        res.status(200).json({
            success: true,
            pincodes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching pincodes",
            error: error.message
        });
    }
};

// Get unique cities
const getCities = async (req, res) => {
    try {
        const cities = await Pincode.distinct('city', { isActive: true });
        res.status(200).json({
            success: true,
            cities: cities.sort()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching cities",
            error: error.message
        });
    }
};

// Create a new pincode (Admin only)
const createPincode = async (req, res) => {
    try {
        const { pincode, city } = req.body;

        if (!pincode || !city) {
            return res.status(400).json({
                success: false,
                message: "Please provide pincode and city"
            });
        }

        // Check if pincode already exists
        const existingPincode = await Pincode.findOne({ pincode });
        if (existingPincode) {
            return res.status(400).json({
                success: false,
                message: "Pincode already exists"
            });
        }

        const newPincode = await Pincode.create({ pincode, city });

        res.status(201).json({
            success: true,
            message: "Pincode added successfully",
            pincode: newPincode
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating pincode",
            error: error.message
        });
    }
};

// Update a pincode (Admin only)
const updatePincode = async (req, res) => {
    try {
        const { id } = req.params;
        const { pincode, city, isActive } = req.body;

        const updatedPincode = await Pincode.findByIdAndUpdate(
            id,
            { pincode, city, isActive },
            { new: true, runValidators: true }
        );

        if (!updatedPincode) {
            return res.status(404).json({
                success: false,
                message: "Pincode not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Pincode updated successfully",
            pincode: updatedPincode
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating pincode",
            error: error.message
        });
    }
};

// Delete a pincode (Admin only)
const deletePincode = async (req, res) => {
    try {
        const { id } = req.params;

        const pincode = await Pincode.findByIdAndDelete(id);

        if (!pincode) {
            return res.status(404).json({
                success: false,
                message: "Pincode not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Pincode deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting pincode",
            error: error.message
        });
    }
};

module.exports = {
    getAllPincodes,
    getCities,
    createPincode,
    updatePincode,
    deletePincode
};
