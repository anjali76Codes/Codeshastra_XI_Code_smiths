import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import ApiUserRoutes from './routes/apiuser.route.js';
import UserRoutes from './routes/user.route.js';
import cors from 'cors';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api', ApiUserRoutes); // All user routes will be prefixed with /api
app.use('/api/auth', UserRoutes); // All user routes will be prefixed with /api

app.use('/api/payment', paymentRoutes);

// Test root route
app.get('/', (req, res) => {
    res.send('Hello, World from env port!');
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});
