import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TbLoader3 } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { MdEdit, MdDelete } from "react-icons/md";

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        backgroundColor: '#f0f0ff',
        features: ''
    });

    const colorOptions = [
        '#f0f0ff', '#fffaf0', '#f0fff4', '#f9f0ff', '#f0f8ff', '#fff0f5', '#f0ffff'
    ];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('https://installationworld.yaytech.in/api/v1/service/getall');
            if (response.data.success) {
                setServices(response.data.services);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching services:', error);
            Swal.fire('Error', 'Failed to fetch services', 'error');
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOpenForm = (service = null) => {
        if (service) {
            setEditMode(true);
            setCurrentService(service);
            setFormData({
                name: service.name,
                image: service.image,
                backgroundColor: service.backgroundColor,
                features: service.features ? service.features.join(', ') : ''
            });
        } else {
            setEditMode(false);
            setCurrentService(null);
            setFormData({
                name: '',
                image: '',
                backgroundColor: '#f0f0ff',
                features: ''
            });
        }
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditMode(false);
        setCurrentService(null);
        setFormData({
            name: '',
            image: '',
            backgroundColor: '#f0f0ff',
            features: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const token = (document.cookie?.split('; ')?.find((ele) => {
                return ele?.split('=')[0] == "csdtpls"
            }))?.split('=')[1]

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            // Convert comma-separated features to array
            const dataToSend = {
                ...formData,
                features: formData.features ? formData.features.split(',').map(f => f.trim()).filter(f => f) : []
            };

            if (editMode && currentService) {
                const response = await axios.put(
                    `https://installationworld.yaytech.in/api/v1/service/update/${currentService._id}`,
                    dataToSend,
                    config
                );

                if (response.data.success) {
                    Swal.fire('Success', 'Service updated successfully', 'success');
                    fetchServices();
                    handleCloseForm();
                }
            } else {
                const response = await axios.post(
                    'https://installationworld.yaytech.in/api/v1/service/create',
                    dataToSend,
                    config
                );

                if (response.data.success) {
                    Swal.fire('Success', 'Service created successfully', 'success');
                    fetchServices();
                    handleCloseForm();
                }
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', error.response?.data?.message || 'Failed to save service', 'error');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const token = (document.cookie?.split('; ')?.find((ele) => {
                    return ele?.split('=')[0] == "csdtpls"
                }))?.split('=')[1]

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const response = await axios.delete(
                    `https://installationworld.yaytech.in/api/v1/service/delete/${id}`,
                    config
                );

                if (response.data.success) {
                    Swal.fire('Deleted!', 'Service has been deleted.', 'success');
                    fetchServices();
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire('Error', 'Failed to delete service', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <TbLoader3 className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            <div className="w-[80%] ml-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Services</h1>
                    <button
                        onClick={() => handleOpenForm()}
                        className="bg-[#fb823f] text-white px-6 py-2 rounded-lg hover:bg-[#e67332] transition"
                    >
                        Add New Service
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div
                                    className="w-full h-full rounded-lg flex items-center justify-center"

                                >
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex gap-2 justify-end mb-2 pb-2 border-b-2 ">
                                    <button
                                        onClick={() => handleOpenForm(service)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <MdEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <MdDelete size={20} />
                                    </button>
                                </div>
                            
                            <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                            {service.features && service.features.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-xs text-gray-500 mb-1">Features:</p>
                                    <ul className="text-xs text-gray-600 space-y-1">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-1">
                                                <span className="text-[#fb823f]">✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={handleCloseForm}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                        >
                            <RxCross2 size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6">
                            {editMode ? 'Edit Service' : 'Add New Service'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Service Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-2 border-gray-300 rounded p-2"
                                    placeholder="e.g., Window AC @499"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-2 border-gray-300 rounded p-2"
                                    placeholder="https://example.com/image.png"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Background Color</label>
                                <div className="flex gap-2 mb-2">
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, backgroundColor: color }))}
                                            className={`w-8 h-8 rounded border-2 ${formData.backgroundColor === color ? 'border-black' : 'border-gray-300'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    name="backgroundColor"
                                    value={formData.backgroundColor}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-gray-300 rounded p-2"
                                    placeholder="#f0f0ff"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Features (comma-separated)</label>
                                <textarea
                                    name="features"
                                    value={formData.features}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full border-2 border-gray-300 rounded p-2"
                                    placeholder="e.g., Complete AC Cleaning, Performance Checkup, Cooling Issue Fix"
                                />
                                <p className="text-xs text-gray-500 mt-1">Separate each feature with a comma</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-[#fb823f] text-white py-2 rounded-lg hover:bg-[#e67332] transition"
                            >
                                {isProcessing ? (
                                    <div className="flex justify-center">
                                        <TbLoader3 className="animate-spin" size={24} />
                                    </div>
                                ) : (
                                    editMode ? 'Update Service' : 'Create Service'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageServices;
