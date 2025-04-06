import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import bcrypt from 'bcryptjs'; // Import bcryptjs

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { plan, price, selectedFeatures } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(null);

    // If no plan or price details, show an error
    if (!plan || !price || !selectedFeatures) {
        return <div className="text-center text-xl font-bold">No plan details found. Please try again.</div>;
    }

    // Simulate generating a 32-bit hash based on the username from the token
    const generateHash = async (username) => {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate hash from the username
        const hash = await bcrypt.hash(username, salt);
        return hash.substring(0, 32); // Take the first 32 characters to simulate a 32-bit hash
    };

    const handlePayment = () => {
        setLoading(true);

        // Get the username from the token
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, user is not logged in.');
            setError('User is not logged in. Please log in first.');
            setLoading(false);
            return;
        }

        const username = token; // Assuming the token is the username for simulation
        generateHash(username).then((userHash) => {
            console.log(`Generated user hash: ${userHash}`);

            // Simulate a delay for payment processing
            setTimeout(() => {
                const isPaymentSuccessful = Math.random() > 0.5; // Simulate success or failure randomly

                setLoading(false);
                setPaymentSuccessful(isPaymentSuccessful);
                setModalOpen(true);

                if (!isPaymentSuccessful) {
                    setError('There was an issue with your payment. Please try again.');
                    console.error('Payment failed for user:', username);
                } else {
                    console.log('Payment successful for user:', username);

                    // Now call the backend API to store the payment data
                    fetch('http://localhost:3000/api/payment/save-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username,
                            token,
                            paymentHash: userHash,
                        }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Payment data saved:', data);
                        })
                        .catch(error => {
                            console.error('Error saving payment data:', error);
                        });
                }
            }, 2000); // Simulate a 2-second delay for payment processing
        });
    };


    useEffect(() => {
        if (price) {
            handlePayment(); // Trigger payment when page loads
        }
    }, [price]);

    const handleModalClose = () => {
        setModalOpen(false);
        navigate('/'); // Redirect to home after closing the modal
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex items-center space-x-2">
                    <div className="animate-spin border-t-4 border-blue-500 border-8 rounded-full w-8 h-8"></div>
                    <p className="text-lg">Processing payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-center">Payment for {plan.name}</h1>
            <p className="text-xl text-center">Price: ₹{price.toFixed(2)}</p>

            <h3 className="text-2xl mt-6">Selected Features:</h3>
            <ul className="list-disc pl-6 mt-4">
                {selectedFeatures.map((feature, index) => (
                    <li key={index} className="text-lg">{feature}</li>
                ))}
            </ul>

            {/* Payment Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">
                                {paymentSuccessful ? 'Payment Successful' : 'Payment Failed'}
                            </h2>
                            <button onClick={handleModalClose} className="text-gray-600">
                                <FaTimesCircle size={20} />
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            {paymentSuccessful ? (
                                <div className="text-green-500">
                                    <FaCheckCircle size={50} />
                                    <p className="mt-2">Your payment was successful!</p>
                                </div>
                            ) : (
                                <div className="text-red-500">
                                    <FaTimesCircle size={50} />
                                    <p className="mt-2">{error || 'There was an issue with your payment. Please try again.'}</p>
                                </div>
                            )}
                        </div>
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={handleModalClose}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Error message */}
            {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        </div>
    );
};

export default PaymentPage;
