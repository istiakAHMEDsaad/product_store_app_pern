import type { Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import * as queries from '../db/queries';

export async function syncUser(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const {email, name, imageUrl} = req.body;
  } catch (error) {}
}
