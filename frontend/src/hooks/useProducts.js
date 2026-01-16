import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
} from '../lib/api';
import { toast } from 'react-hot-toast';

export const useProducts = () => {
  return useQuery({ queryKey: ['products'], queryFn: getAllProducts });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create product');
    },
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id, //double bang operator (string value => boolean)
  });
};

export const useMyProducts = () => {
  return useQuery({ queryKey: ['myProducts'], queryFn: getMyProducts });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete product');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to edit product');
    },
  });
};
