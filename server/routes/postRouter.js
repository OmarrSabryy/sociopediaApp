import express from 'express';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from '../controllers/postController.js';
import { tokenVerify } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.get('/', tokenVerify, getFeedPosts);
router.get('/:userId/posts', tokenVerify, getUserPosts);
router.patch('/:postId/like', tokenVerify, likePost);

export default router;
