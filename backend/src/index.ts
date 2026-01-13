import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import express from 'express';
import { ENV } from './config/env';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import commentRoutes from './routes/commentRoutes';

const app = express();

// middleware
app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
// `credentials: true` allows the frontend to send cookies to the backend so that we can authenticate the user.
app.use(clerkMiddleware()); // auth obj will be attached to the req
app.use(express.json()); // parses JSON request bodies.
app.use(express.urlencoded({ extended: true })); // parses form data (like HTML forms).

app.get('/', (req, res) => {
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

app.listen(ENV.PORT, () =>
  console.log(`Server is running on PORT: ${ENV.PORT}`)
);
