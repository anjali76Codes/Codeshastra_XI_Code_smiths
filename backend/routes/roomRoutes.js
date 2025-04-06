import express from 'express';
import { createRoom, joinRoom, submitResult, getRoomDetails } from '../controllers/roomController.js';

const router = express.Router();

// Routes
router.post('/create', createRoom);
router.post('/join', joinRoom);
router.post('/submit', submitResult);
router.get('/:code', getRoomDetails);

export default router;
