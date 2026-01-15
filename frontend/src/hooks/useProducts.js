import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct, getAllProducts } from '../lib/api';
import { toast } from 'react-hot-toast';

export const useProducts = () => {
  const result = useQuery({ queryKey: ['products'], queryFn: getAllProducts });
  return result;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('Product created successfully!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create product');
    },
  });
  return result;
};
