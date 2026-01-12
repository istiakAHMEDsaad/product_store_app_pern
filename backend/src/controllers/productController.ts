import { Request, Response } from 'express';
import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';

// get all products
export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting all products', error);
    res.status(500).json({ error: 'Failed to get all products' });
  }
}

// get product by current user
export async function getMyProducts(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized User' });

    const products = await queries.getProductsByUserId(userId);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting user products', error);
    res.status(500).json({ error: 'Failed to get user products' });
  }
}

// get product by id
export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const product = await queries.getProductById(id);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    console.error('Product not found', error);
    res.status(500).json({ error: 'Failed to get product' });
  }
}
