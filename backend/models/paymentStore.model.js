import mongoose from 'mongoose';

const paymentStoreSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,  // Assuming each token is unique
    },
    paymentHash: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const UserPay = mongoose.model('UserPay', paymentStoreSchema);

export default UserPay;
