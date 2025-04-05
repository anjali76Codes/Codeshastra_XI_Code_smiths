import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Buy plan (instead of creating an order)
export const buyPlan = async (req, res) => {
    const { planId, amount, currency, selectedFeatures } = req.body;

    // Validate the planId, amount, currency, and selectedFeatures (optional)
    if (!planId || !amount || !currency) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const options = {
            amount: amount * 100, // Razorpay expects the amount in paise
            currency: currency,
            payment_capture: 1,
            notes: {
                planId: planId, // You can add more details related to the plan here
                selectedFeatures: selectedFeatures, // Store selected features if needed
            },
        };

        const order = await razorpay.orders.create(options);

        // Sending response with order details
        res.status(201).json({
            success: true,
            orderId: order.id,
            amount: order.amount / 100, // Convert amount back to INR
            currency: order.currency,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ success: false, message: 'Failed to buy plan' });
    }
};

// Verify payment
export const verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Dummy verification: just send success response
    return res.status(200).json({ success: true, message: 'Payment verified successfully' });

    // Uncomment below code if you want to use real verification
    // const body = razorpay_order_id + "|" + razorpay_payment_id;
    // const expectedSignature = crypto
    //     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    //     .update(body.toString())
    //     .digest('hex');

    // if (expectedSignature === razorpay_signature) {
    //     return res.status(200).json({ success: true, message: 'Payment verified successfully' });
    // } else {
    //     return res.status(400).json({ success: false, message: 'Payment verification failed' });
    // }
};
