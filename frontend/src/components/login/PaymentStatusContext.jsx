import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the PaymentStatus Context
const PaymentStatusContext = createContext();

export const usePaymentStatus = () => useContext(PaymentStatusContext);

export const PaymentStatusProvider = ({ children }) => {
    const [isPremium, setIsPremium] = useState(null);

    // Function to check the payment status
    const checkPaymentStatus = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsPremium(false); // User not logged in, assume not premium
            return;
        }

        // Fetch payment status from the backend
        fetch('http://localhost:3000/api/payment/check-payment-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    setIsPremium(data.paymentStatus); // Set paymentStatus as isPremium (true/false)
                } else {
                    setIsPremium(false); // Failed to get payment status, assume not premium
                }
            })
            .catch(() => {
                setIsPremium(false); // Error fetching payment status, assume not premium
            });
    };

    useEffect(() => {
        checkPaymentStatus(); // Check payment status on mount
    }, []);

    return (
        <PaymentStatusContext.Provider value={{ isPremium }}>
            {children}
        </PaymentStatusContext.Provider>
    );
};
