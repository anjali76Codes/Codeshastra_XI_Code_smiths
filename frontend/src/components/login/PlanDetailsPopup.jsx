import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlanDetailsPopup = ({ plan, onClose }) => {
    const navigate = useNavigate();

    // Check if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedFeatures, setSelectedFeatures] = useState([...plan.features]);
    const [price, setPrice] = useState(plan.price);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);  // Set login state based on token presence
    }, []);

    // Handle feature removal
    const handleFeatureToggle = (feature) => {
        const updatedFeatures = selectedFeatures.includes(feature)
            ? selectedFeatures.filter(item => item !== feature)
            : [...selectedFeatures, feature];

        setSelectedFeatures(updatedFeatures);

        // Update price based on selected features
        const newPrice = updatedFeatures.length === plan.features.length
            ? plan.price
            : plan.price * (updatedFeatures.length / plan.features.length);

        setPrice(newPrice);
    };

    // Handle redirect to payment if logged in
    const handleRedirectToPayment = () => {
        if (isLoggedIn) {
            // Pass the updated plan details, including selected features and new price, to the payment page
            navigate('/payment', { state: { plan, price, selectedFeatures } });
        } else {
            alert('You need to log in first!');
            navigate('/signin');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-center">{plan.name} - Details</h2>
                <p className="text-center text-gray-500 mb-6">{plan.description}</p>

                <div className="space-y-4">
                    {selectedFeatures.map((feature, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-700">{feature}</span>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleFeatureToggle(feature)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xl font-semibold text-gray-800">Price: ${price.toFixed(2)} / month</p>
                    <button
                        onClick={handleRedirectToPayment}
                        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlanDetailsPopup;
