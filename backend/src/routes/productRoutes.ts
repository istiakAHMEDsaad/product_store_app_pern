import { Router } from 'express';
import * as productController from '../controllers/productController';
import { requireAuth } from '@clerk/express';

const router = Router();

// GET /api/products => get all products
router.post('/', productController.getAllProducts);
export default router;
