import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, deleteComment } from '../lib/api';
import toast from 'react-hot-toast';

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['product', variables.productId],
      });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create comment!');
    },
  });
};

export const useDeleteComment = (productId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed delete comment!');
    },
  });
};
