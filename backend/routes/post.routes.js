import express from 'express';
import { createPost, getAllPosts, likePost, commentOnPost } from '../controllers/post.controllers.js';

const router = express.Router();

router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.patch('/posts/:postId/like', likePost);
router.post('/posts/:postId/comment', commentOnPost);

export default router;
