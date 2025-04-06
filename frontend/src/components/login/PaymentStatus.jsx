import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { usePaymentStatus } from './PaymentStatusContext';

const PaymentStatus = () => {
    const { isPremium } = usePaymentStatus();

    if (isPremium === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex items-center space-x-2">
                    <div className="animate-spin border-t-4 border-blue-500 border-8 rounded-full w-8 h-8"></div>
                    <p className="text-lg">Checking payment status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-center">Payment Status</h1>
            <div className="text-center mt-6">
                {isPremium ? (
                    <div className="text-green-500">
                        <FaCheckCircle size={50} />
                        <p className="mt-2 text-lg">Your payment was successful!</p>
                    </div>
                ) : (
                    <div className="text-red-500">
                        <FaTimesCircle size={50} />
                        <p className="mt-2 text-lg">Your payment was not successful.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentStatus;
