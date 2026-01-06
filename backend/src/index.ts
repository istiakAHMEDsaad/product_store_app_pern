import express from 'express';

const app = express();

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

const port: number = 3000;
app.listen(port, () => console.log(`Server is running on ${port} port`));
