import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlanDetailsPopup = ({ plan, onClose }) => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedFeatures, setSelectedFeatures] = useState([...plan.features]);
    const [price, setPrice] = useState(plan.price);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleFeatureToggle = (feature) => {
        const updatedFeatures = selectedFeatures.includes(feature)
            ? selectedFeatures.filter(item => item !== feature)
            : [...selectedFeatures, feature];

        setSelectedFeatures(updatedFeatures);

        const newPrice = updatedFeatures.length === plan.features.length
            ? plan.price
            : plan.price * (updatedFeatures.length / plan.features.length);

        setPrice(newPrice);
    };

    const handleRedirectToPayment = () => {
        if (isLoggedIn) {
            navigate('/payment', { state: { plan, price, selectedFeatures } });
        } else {
            alert('You need to log in first!');
            navigate('/signin');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="relative bg-purple-950/50 backdrop-blur-lg border border-purple-400 text-white p-6 rounded-3xl shadow-2xl w-full max-w-lg mx-4">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-purple-300 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-purple-100 mb-2">{plan.name} - Details</h2>
                <p className="text-center text-purple-200 mb-6">{plan.description}</p>

                {/* Features */}
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {selectedFeatures.map((feature, index) => (
                        <div key={index} className="flex justify-between items-center bg-purple-800/40 px-4 py-2 rounded-xl">
                            <span className="text-sm">{feature}</span>
                            <button
                                onClick={() => handleFeatureToggle(feature)}
                                className="text-red-300 hover:text-red-500 text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Price & CTA */}
                <div className="mt-6 text-center">
                    <p className="text-xl font-semibold text-white">Price: ${price.toFixed(2)} / month</p>
                    <button
                        onClick={handleRedirectToPayment}
                        className="mt-4 bg-purple-700 hover:bg-purple-600 transition-colors px-6 py-2 rounded-full text-white font-semibold"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlanDetailsPopup;
