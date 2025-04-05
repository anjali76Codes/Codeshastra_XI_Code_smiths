import React, { useState } from 'react';
import PlanDetailsPopup from './PlanDetailsPopup'; // Import the PlanDetailsPopup component

const SubscriptionPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Function to open the popup with the selected plan
    const openPopup = (plan) => {
        setSelectedPlan(plan);
        setIsPopupOpen(true);
    };

    // Function to close the popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // Plan data
    const plans = [
        {
            name: 'Free Plan',
            description: 'Basic tools for everyday users',
            features: [
                'Access to essential tools',
                'No login required',
                'Limited features',
                'Text Formatter (JSON/XML/YAML Validator)',
                'Basic image editing tools (Resizing, Cropping)',
                'Network tools (Ping, Traceroute)',
            ],
            price: 0
        },
        {
            name: 'Base Plan',
            description: 'For users who need extended features',
            features: [
                'All Free Plan features',
                'Full access to core utilities',
                'Advanced text formatting (Markdown Editor)',
                'CSV/Excel tools (Conversion & Editing)',
                'Basic image converters (JPG, PNG)',
                'Password generator and security tools',
                'API Tools (REST API Client & Request Builder)',
                'Priority support',
            ],
            price: 9.99
        },
        {
            name: 'Premium Plan',
            description: 'For power users & developers',
            features: [
                'All Base Plan features',
                'Full suite of data conversion tools (CSV, Excel, SQL)',
                'Advanced code formatting (HTML, CSS, JS)',
                'Full image & graphic converters (QR Code, Barcode, SVG)',
                'Cloud & networking tools (File uploaders, Hosting)',
                'Enhanced security & privacy tools (AES Encryption, JWT Decoder)',
                'Priority support & custom tool requests',
                'Analytics & SEO tools (Keyword analyzer, Meta tag generator)',
                'Advanced productivity tools (Timers, Counters, Unit Converters)',
            ],
            price: 19.99
        },
        {
            name: 'Students Plan',
            description: 'For students who need essential tools at discounted prices',
            features: [
                'Access to all Free Plan features',
                'Discounted pricing on core tools',
                'Enhanced educational tools (Mock Data Generators, SQL Tools)',
                'Priority access to new features',
                'Cloud storage integration for educational files',
            ],
            price: 4.99
        }
    ];

    return (
        <div className="bg-gray-100 font-sans py-16">
            {/* Title Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800">Choose Your Plan</h1>
                <p className="text-lg text-gray-600">Our platform provides a variety of tools to boost your productivity. Choose the best plan for you!</p>
            </div>

            {/* Plans Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto px-4 max-w-7xl">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className="bg-white p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                        <h3 className="text-xl font-bold text-gray-800 text-center">{plan.name}</h3>
                        <p className="text-center text-gray-500 mt-2">{plan.description}</p>
                        <div className="mt-6">
                            <ul className="space-y-4 text-sm text-gray-600">
                                {plan.features.map((feature, index) => (
                                    <li key={index}>✔ {feature}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-6 text-center">
                            <span className="text-3xl font-semibold text-gray-800">${plan.price.toFixed(2)} / month</span>
                        </div>
                        <button
                            onClick={() => openPopup(plan)}
                            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="text-center py-6 bg-gray-900 text-white mt-12">
                <p>© 2025 Our Platform. All rights reserved.</p>
            </footer>

            {/* Popup */}
            {isPopupOpen && <PlanDetailsPopup plan={selectedPlan} onClose={closePopup} />}
        </div>
    );
};

export default SubscriptionPage;
    