import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import express from 'express';
import { ENV } from './config/env';

const app = express();

// middleware
app.use(cors({ origin: ENV.FRONTEND_URL }));
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

app.listen(ENV.PORT, () =>
  console.log(`Server is running on PORT: ${ENV.PORT}`)
);
