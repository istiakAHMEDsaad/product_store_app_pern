import api from './axios';

// users api
export const syncUser = async (userData) => {
  const { data } = await api.post('/users/sync', userData);
  return data;
};

// all products api
export const getAllProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

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
