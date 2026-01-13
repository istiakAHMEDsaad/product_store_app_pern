import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import * as commentController from '../controllers/commentController';

const router = Router();

// POST /api/comments/:productId => post a comment to product (protected)
router.post('/:productId', requireAuth(), commentController.createComment);

// DELETE /api/comments/:commentId => deleete comment from product (protected)
router.delete('/:commentId', requireAuth(), commentController.deleteComment);

export default router;
