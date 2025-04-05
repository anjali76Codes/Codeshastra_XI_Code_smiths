import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: false,
            trim: true,
        },
        profilePicture: {
            type: String, // URL to profile image
            default: "",
        },
        bio: {
            type: String,
            maxlength: 300,
            default: "",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
        }
    },
    { timestamps: true }
);

const ApiUser = mongoose.model("ApiUser", userSchema);
export default ApiUser;
