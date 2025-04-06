import express from 'express';
import { saveUserPaymentData, getUserPaymentStatus } from '../controllers/paymentStore.controllers.js';

const router = express.Router();

// Route to handle saving payment data
router.post('/save-payment', async (req, res) => {
    const { username, token, paymentHash } = req.body;

    if (!username || !token || !paymentHash) {
        return res.status(400).json({ message: 'Username, token, and payment hash are required.' });
    }

    try {
        const user = await saveUserPaymentData(username, token, paymentHash);
        res.status(201).json({ message: 'User payment data saved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save payment data', error: error.message });
    }
});

// Route to check payment status
router.post('/check-payment-status', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token is required to check payment status.' });
    }

    try {
        const paymentStatus = await getUserPaymentStatus(token);
        if (paymentStatus) {
            res.status(200).json({ status: 'success', paymentStatus: true });
        } else {
            res.status(200).json({ status: 'success', paymentStatus: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to check payment status', error: error.message });
    }
});

export default router;
