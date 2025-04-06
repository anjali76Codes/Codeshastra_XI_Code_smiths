import UserPay from "../models/paymentStore.model.js";

// Function to save payment data
const saveUserPaymentData = async (username, token, paymentHash) => {
    try {
        const user = new UserPay({
            username,
            token,
            paymentHash,
        });

        // Save the user to the database
        await user.save();
        console.log('User payment data saved successfully!');
        return user;
    } catch (error) {
        console.error('Error saving user payment data:', error);
        throw new Error('Error saving user payment data');
    }
};

// Function to check payment status
const getUserPaymentStatus = async (token) => {
    try {
        const user = await UserPay.findOne({ token });
        if (!user) {
            return null; // No user found with this token
        }
        return user.paymentHash ? true : false; // If paymentHash exists, return true, otherwise false
    } catch (error) {
        console.error('Error checking user payment status:', error);
        throw new Error('Error checking payment status');
    }
};

export { saveUserPaymentData, getUserPaymentStatus };
