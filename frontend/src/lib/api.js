import api from './axios';

//========== 1️⃣ User API ==========\\

// users api
export const syncUser = async (userData) => {
  const { data } = await api.post('/users/sync', userData);
  return data;
};

//========== 2️⃣ Product API ==========\\

// all products api
export const getAllProducts = async ({ search, page }) => {
  const { data } = await api.get('/products', {
    params: {
      search,
      page,
      limit: 9,
    },
  });
  return data;
};
/*
export const getAllProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};
*/

// single product api
export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

// get all my posted products api
export const getMyProducts = async () => {
  const { data } = await api.get('/products/my-products');
  return data;
};

// create product api
export const createProduct = async (productData) => {
  const { data } = await api.post('/products', productData);
  return data;
};

// update product api
export const updateProduct = async ({ id, ...productData }) => {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
};

// delete product api
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

//========== 3️⃣ Comment API ==========\\

// create comment api
export const createComment = async ({ productId, content }) => {
  const { data } = await api.post(`/comments/${productId}`, { content });
  return data;
};

// delete comment api
export const deleteComment = async ({ commentId }) => {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
};
