import express from 'express';
import { createUser, getAllUsers, getUserById } from '../controllers/apiuser.controllers.js';

const router = express.Router();

router.post('/users', createUser);     // Create a new user
router.get('/users', getAllUsers);     // Get all users
router.get('/users/:id', getUserById); // Get a single user by ID

export default router;
