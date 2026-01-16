import { Request, Response } from 'express';
import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';

// get all products (public)
/*
export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting all products', error);
    res.status(500).json({ error: 'Failed to get all products' });
  }
}
*/

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;

    const { products, total } = await queries.getAllProducts({
      search,
      page,
      limit,
    });

    res.status(200).json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// get product by current user (protected)
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

// get product by id (public)
export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    console.error('Product not found', error);
    res.status(500).json({ error: 'Failed to get product' });
  }
}

// create product (protected)
export async function createProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized User' });

    const { title, description, imageUrl } = req.body;
    if (!title || !description || !imageUrl) {
      res
        .status(400)
        .json({ error: 'Title, description & imageUrl are required' });

      return;
    }

    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product', error);
    res.status(500).json('Failed to create product');
  }
}

// update the product (protected)
export async function updateProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized User' });

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: 'You can only update your own products' });
      return;
    }

    const product = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product', error);
    res.status(500).json({ error: 'Failed to update the product' });
  }
}

// delete produc (protected)
export async function deleteProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized User' });

    const { id } = req.params;

    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: 'You can only delete your own products' });
      return;
    }

    await queries.deleteProduct(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product', error);
    res.status(500).json({ error: 'Failed to delete prodcut' });
  }
}
