import ApiUser from '../models/apiusers.model.js';

// POST /users - Create a new user
export const createUser = async (req, res) => {
    const { username, email, password, fullName, bio, profilePicture } = req.body;

    try {
        const existing = await ApiUser.findOne({ $or: [{ email }, { username }] });
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new ApiUser({
            username,
            email,
            password, // ⚠️ should be hashed in production
            fullName,
            bio,
            profilePicture
        });

        await user.save();
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /users - Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await ApiUser.find().select('-password'); // Exclude password
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /users/:id - Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await ApiUser.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
