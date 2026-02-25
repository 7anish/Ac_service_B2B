const Service = require('../Modal/ServiceModal');

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ createdAt: 1 });
        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching services",
            error: error.message
        });
    }
};

// Create a new service (Admin only)
const createService = async (req, res) => {
    try {
        const { name, image, backgroundColor, features } = req.body;

        if (!name || !image) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        const service = await Service.create({
            name,
            image,
            backgroundColor: backgroundColor || "#f0f0ff",
            features: features || []
        });

        res.status(201).json({
            success: true,
            message: "Service created successfully",
            service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating service",
            error: error.message
        });
    }
};

// Update a service (Admin only)
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, backgroundColor, features, isActive } = req.body;

        const service = await Service.findByIdAndUpdate(
            id,
            { name, image, backgroundColor, features, isActive },
            { new: true, runValidators: true }
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Service updated successfully",
            service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating service",
            error: error.message
        });
    }
};

// Delete a service (Admin only)
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findByIdAndDelete(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Service deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting service",
            error: error.message
        });
    }
};

module.exports = {
    getAllServices,
    createService,
    updateService,
    deleteService
};
