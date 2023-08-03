import express from 'express';
import { tokenVerify } from '../middlewares/authMiddlewares.js';
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/:userId', tokenVerify, getUser);
router.get('/:userId/friends', tokenVerify, getUserFriends);
router.patch('/:userId/:friendId', addRemoveFriend);

export default router;
