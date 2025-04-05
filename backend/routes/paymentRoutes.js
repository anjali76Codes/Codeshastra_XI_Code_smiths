import express from 'express';
import { buyPlan, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

// Route to create an order for the plan
router.post('/buy-plan', buyPlan);

// Route to verify the payment
router.post('/verify-payment', verifyPayment);

export default router;
