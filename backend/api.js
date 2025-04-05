import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import ApiUserRoutes from './routes/apiuser.route.js';
import networkRoutes from './routes/network.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api', ApiUserRoutes); // All user routes will be prefixed with /api
app.use('/api/network', networkRoutes);

// Test root route
app.get('/', (req, res) => {
  res.send('Hello, World from env port!');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
