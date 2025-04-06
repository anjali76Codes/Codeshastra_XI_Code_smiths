import React, { useState } from 'react';
import PlanDetailsPopup from './PlanDetailsPopup'; // Make sure this is styled similarly too

const SubscriptionPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const openPopup = (plan) => {
        setSelectedPlan(plan);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

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
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-500 to-black text-white py-16 px-4">
            {/* Title Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-purple-200">Choose Your Plan</h1>
                <p className="text-lg text-purple-100 mt-2">Boost your productivity with the perfect plan tailored for you.</p>
            </div>

            {/* Plans Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto border border-purple-50 p-8 rounded-3xl backdrop-blur-3xl shadow-lg shadow-purple-50">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className="bg-purple-950/30 backdrop-blur-sm p-6 rounded-3xl border border-purple-300 shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                        <h3 className="text-xl font-bold text-purple-100 text-center">{plan.name}</h3>
                        <p className="text-center text-purple-200 mt-2">{plan.description}</p>
                        <ul className="mt-6 space-y-3 text-sm text-purple-100">
                            {plan.features.map((feature, index) => (
                                <li key={index}>✔ {feature}</li>
                            ))}
                        </ul>
                        <div className="mt-6 text-center">
                            <span className="text-3xl font-semibold text-white">${plan.price.toFixed(2)} <span className="text-base">/ month</span></span>
                        </div>
                        <button
                            onClick={() => openPopup(plan)}
                            className="mt-6 w-full bg-purple-700 text-white py-2 rounded-2xl hover:bg-purple-600 transition duration-300"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="text-center py-6 mt-16 text-purple-200">
                <p>© 2025 Our Platform. All rights reserved.</p>
            </footer>

            {/* Popup */}
            {isPopupOpen && <PlanDetailsPopup plan={selectedPlan} onClose={closePopup} />}
        </div>
    );
};

export default SubscriptionPage;
