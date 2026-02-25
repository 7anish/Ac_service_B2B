import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TbLoader3 } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { MdDelete, MdEdit } from "react-icons/md";

const ManagePincodes = () => {
    const [pincodes, setPincodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentPincode, setCurrentPincode] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        pincode: '',
        city: ''
    });

    useEffect(() => {
        fetchPincodes();
    }, []);

    const fetchPincodes = async () => {
        try {
            const response = await axios.get('https://installationworld.yaytech.in/api/v1/pincode/getall');
            if (response.data.success) {
                setPincodes(response.data.pincodes);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pincodes:', error);
            Swal.fire('Error', 'Failed to fetch pincodes', 'error');
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

    const handleOpenForm = (pincode = null) => {
        if (pincode) {
            setEditMode(true);
            setCurrentPincode(pincode);
            setFormData({
                pincode: pincode.pincode,
                city: pincode.city
            });
        } else {
            setEditMode(false);
            setCurrentPincode(null);
            setFormData({
                pincode: '',
                city: ''
            });
        }
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditMode(false);
        setCurrentPincode(null);
        setFormData({
            pincode: '',
            city: ''
        });
    };

    const validatePincode = (pincode) => {
        return /^[0-9]{6}$/.test(pincode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        if (!validatePincode(formData.pincode)) {
            Swal.fire('Error', 'Please enter a valid 6-digit pincode', 'error');
            setIsProcessing(false);
            return;
        }

        try {
            const token = (document.cookie?.split('; ')?.find((ele) => {
                return ele?.split('=')[0] == "csdtpls"
            }))?.split('=')[1]
            
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            if (editMode && currentPincode) {
                const response = await axios.put(
                    `https://installationworld.yaytech.in/api/v1/pincode/update/${currentPincode._id}`,
                    formData,
                    config
                );

                if (response.data.success) {
                    Swal.fire('Success', 'Pincode updated successfully', 'success');
                    fetchPincodes();
                    handleCloseForm();
                }
            } else {
                const response = await axios.post(
                    'https://installationworld.yaytech.in/api/v1/pincode/create',
                    formData,
                    config
                );

                if (response.data.success) {
                    Swal.fire('Success', 'Pincode added successfully', 'success');
                    fetchPincodes();
                    handleCloseForm();
                }
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error', error.response?.data?.message || 'Failed to save pincode', 'error');
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
                    `https://installationworld.yaytech.in/api/v1/pincode/delete/${id}`,
                    config
                );

                if (response.data.success) {
                    Swal.fire('Deleted!', 'Pincode has been deleted.', 'success');
                    fetchPincodes();
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire('Error', 'Failed to delete pincode', 'error');
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

    // Group pincodes by city
    const pincodesByCity = pincodes.reduce((acc, pincode) => {
        if (!acc[pincode.city]) {
            acc[pincode.city] = [];
        }
        acc[pincode.city].push(pincode);
        return acc;
    }, {});

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            <div className="w-[80%] ml-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Pincodes</h1>
                    <button
                        onClick={() => handleOpenForm()}
                        className="bg-[#fb823f] text-white px-6 py-2 rounded-lg hover:bg-[#e67332] transition"
                    >
                        Add New Pincode
                    </button>
                </div>

                <div className="space-y-6">
                    {Object.keys(pincodesByCity).sort().map((city) => (
                        <div key={city} className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4 text-[#fb823f]">{city}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {pincodesByCity[city].map((pincode) => (
                                    <div
                                        key={pincode._id}
                                        className="bg-gray-50 rounded p-3 flex justify-between items-center hover:bg-gray-100 transition"
                                    >
                                        <span className="font-semibold">{pincode.pincode}</span>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleOpenForm(pincode)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <MdEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(pincode._id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <MdDelete size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {pincodes.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <p className="text-gray-600 text-lg">No pincodes added yet.</p>
                        <p className="text-gray-500 mt-2">Click "Add New Pincode" to get started.</p>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                        <button
                            onClick={handleCloseForm}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                        >
                            <RxCross2 size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6">
                            {editMode ? 'Edit Pincode' : 'Add New Pincode'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    required
                                    maxLength={6}
                                    pattern="[0-9]{6}"
                                    className="w-full border-2 border-gray-300 rounded p-2"
                                    placeholder="110001"
                                />
                                <p className="text-xs text-gray-500 mt-1">6-digit numeric code</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-2 border-gray-300 rounded p-2"
                                    placeholder="Delhi"
                                />
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
                                    editMode ? 'Update Pincode' : 'Add Pincode'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePincodes;
