import { Router } from 'express';
import * as productController from '../controllers/productController';
import { requireAuth } from '@clerk/express';

const router = Router();

// GET /api/products => get all products
router.get('/', productController.getAllProducts);

// GET /api/products/my-products => get users all product (protected)
router.get('/my-products', requireAuth(), productController.getMyProducts);

// GET /api/products/:id => get single product by id (public)
router.get('/:id', productController.getProductById);

// POST /api/products => create new product (protected)
router.post('/', requireAuth(), productController.createProduct);

// PUT /api/products/:id => update product (protected)
router.put('/:id', requireAuth(), productController.updateProduct);

// DELETE /api/products/:id => delete product (protected)
router.delete('/:id', requireAuth(), productController.deleteProduct);

export default router;
