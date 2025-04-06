import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Importing Routes and Handlers
import ApiUserRoutes from './routes/apiuser.route.js';
import UserRoutes from './routes/user.route.js';
import networkRoutes from './routes/network.routes.js';
import paymentRoutes from './routes/paymentRoutes.js';


// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api', ApiUserRoutes);           // User-related API routes
app.use('/api/auth', UserRoutes);         // Authentication-related API routes
app.use('/api/network', networkRoutes);  // Network-related API routes
app.use('/api/payment', paymentRoutes);  // Payment-related API routes

       

// Root route (for testing)
app.get('/', (req, res) => {
  res.send('Hello, World from env port!');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
