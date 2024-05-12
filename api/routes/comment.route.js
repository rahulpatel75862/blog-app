import express from 'express'
import { createComment, deleteComment, editComment, getComments, getPostComment, likeComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create',verifyToken, createComment)
router.get('/get/comment/:postId', getPostComment)
router.get('/get/comments',verifyToken, getComments)
router.put('/like/comment/:commentId', verifyToken, likeComment)
router.put('/edit/comment/:commentId', verifyToken, editComment)
router.delete('/delete/comment/:commentId', verifyToken, deleteComment)

export default router