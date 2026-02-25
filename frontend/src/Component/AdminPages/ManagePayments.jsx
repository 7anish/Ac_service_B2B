import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdDelete, MdContentCopy, MdRefresh } from 'react-icons/md';
import { TbLoader3 } from 'react-icons/tb';

const ManagePayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        amount: '',
        description: 'AC Service Payment'
    });

    const getToken = () => {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('csdtpls='));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
    };

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const response = await axios.get('https://installationworld.yaytech.in/api/v1/payment/getall', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setPayments(response.data.payments);
            }
        } catch (error) {
            console.error('Error fetching payments:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch payments'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreatePaymentLink = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phoneNumber || !formData.amount) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill all required fields'
            });
            return;
        }

        // Validate phone number (10 digits)
        if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid 10-digit phone number'
            });
            return;
        }

        // Validate amount
        if (formData.amount <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Amount must be greater than 0'
            });
            return;
        }

        try {
            const token = getToken();
            const response = await axios.post(
                'https://installationworld.yaytech.in/api/v1/payment/create',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Link Created!',
                    html: `
                        <p>Payment link has been created successfully.</p>
                        <div style="margin: 15px 0; padding: 10px; background: #f0f0f0; border-radius: 5px; word-break: break-all;">
                            <strong>Link:</strong> ${response.data.paymentLink}
                        </div>
                        <p style="font-size: 12px; color: #666;">SMS has been sent to the customer.</p>
                    `,
                    confirmButtonText: 'Copy Link',
                    showCancelButton: true,
                    cancelButtonText: 'Close'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigator.clipboard.writeText(response.data.paymentLink);
                        Swal.fire({
                            icon: 'success',
                            title: 'Copied!',
                            text: 'Payment link copied to clipboard',
                            timer: 1500,
                            showConfirmButton: false
                        });
                    }
                });
                setShowModal(false);
                setFormData({
                    name: '',
                    phoneNumber: '',
                    amount: '',
                    description: 'AC Service Payment'
                });
                fetchPayments();
            }
        } catch (error) {
            console.error('Error creating payment link:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to create payment link'
            });
        }
    };

    const handleCopyLink = (link) => {
        navigator.clipboard.writeText(link);
        Swal.fire({
            icon: 'success',
            title: 'Copied!',
            text: 'Payment link copied to clipboard',
            timer: 1500,
            showConfirmButton: false
        });
    };

    const handleRefreshStatus = async (id) => {
        try {
            const token = getToken();
            const response = await axios.get(`https://installationworld.yaytech.in/api/v1/payment/status/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                fetchPayments();
                Swal.fire({
                    icon: 'info',
                    title: 'Status Updated',
                    text: `Current status: ${response.data.payment.status}`,
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error('Error refreshing status:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to refresh status'
            });
        }
    };

    const handleDeletePayment = async (id, name) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete payment record for ${name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = getToken();
                    await axios.delete(`https://installationworld.yaytech.in/api/v1/payment/delete/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Payment record has been deleted',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    fetchPayments();
                } catch (error) {
                    console.error('Error deleting payment:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to delete payment'
                    });
                }
            }
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'created':
                return 'bg-blue-100 text-blue-800';
            case 'expired':
                return 'bg-gray-100 text-gray-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="p-6 w-[80%] ml-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Manage Payment Links</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    + Create Payment Link
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <TbLoader3 className="animate-spin text-4xl text-blue-600" />
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Customer Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created At
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Link
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                            No payment links created yet
                                        </td>
                                    </tr>
                                ) : (
                                    payments.map((payment) => (
                                        <tr key={payment._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium text-gray-900">{payment.name}</div>
                                                    <div className="text-sm text-gray-500">{payment.phoneNumber}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">₹{payment.amount}</div>
                                                {payment.paidAt && (
                                                    <div className="text-xs text-green-600">
                                                        Paid: {formatDate(payment.paidAt)}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                                    {payment.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatDate(payment.createdAt)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleCopyLink(payment.shortUrl)}
                                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                                                    title="Copy payment link"
                                                >
                                                    <MdContentCopy className="text-lg" />
                                                    Copy Link
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleRefreshStatus(payment._id)}
                                                        className="text-blue-600 hover:text-blue-800 p-1"
                                                        title="Refresh status"
                                                    >
                                                        <MdRefresh className="text-xl" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePayment(payment._id, payment.name)}
                                                        className="text-red-600 hover:text-red-800 p-1"
                                                        title="Delete"
                                                    >
                                                        <MdDelete className="text-xl" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Create Payment Link Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Payment Link</h2>
                        <form onSubmit={handleCreatePaymentLink}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Customer Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter customer name"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="10-digit mobile number"
                                    pattern="[0-9]{10}"
                                    maxLength="10"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Amount (₹) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter amount"
                                    min="1"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Payment description"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Create Link
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setFormData({
                                            name: '',
                                            phoneNumber: '',
                                            amount: '',
                                            description: 'AC Service Payment'
                                        });
                                    }}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePayments;
