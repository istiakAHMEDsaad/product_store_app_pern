import { Request, Response } from 'express';
import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';

// create comment (protected)
export async function createComment(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized User' });

    const { productId } = req.params;
    const { content } = req.body;

    if (!content)
      return res.status(400).json({ error: 'Empty comment not allowed' });

    const productExist = await queries.getProductById(productId);
    if (!productExist)
      return res.status(404).json({ error: 'Product not found' });

    const comment = await queries.createComment({
      content,
      userId,
      productId,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error posting comment', error);
    res.status(500).json({ error: 'Failed to post comment' });
  }
}

// delete comment (protected)
export async function deleteComment(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized User' });

    const { commentId } = req.params;

    const existingComment = await queries.getCommentById(commentId);
    if (!existingComment)
      return res.status(404).json({ error: 'Comment not found' });

    if (existingComment.userId !== userId) {
      res.status(403).json({ error: 'You can only delete your own comment' });
      return;
    }

    await queries.deleteComment(commentId);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
}
