import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { ENV } from './config/env';
import commentRoutes from './routes/commentRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import path from 'path';

const app = express();

// middleware
app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
// `credentials: true` allows the frontend to send cookies to the backend so that we can authenticate the user.
app.use(clerkMiddleware()); // auth obj will be attached to the req
app.use(express.json()); // parses JSON request bodies.
app.use(express.urlencoded({ extended: true })); // parses form data (like HTML forms).

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    message:
      'This is productify api using postgreSql, drizzle ORM & clerk auth',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      comments: '/api/comments',
    },
  });
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);

// if (ENV.NODE_ENV === 'production') {
//   const __dirname = path.resolve();

//   // serve static files from frontend/dist
//   app.use(express.static(path.join(__dirname, '../frontend/dist')));

//   // handle SPA routing - send all non-API routes to index.html - react app
//   app.get('/{*any}', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
//   });
// }

app.listen(ENV.PORT, () =>
  console.log(`Server is running on PORT: ${ENV.PORT}`)
);
