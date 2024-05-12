import express from 'express'
import { createComment, editComment, getComment, likeComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create',verifyToken, createComment)
router.get('/get/comment/:postId', getComment)
router.put('/like/comment/:commentId', verifyToken, likeComment)
router.put('/edit/comment/:commentId', verifyToken, editComment)

export default router