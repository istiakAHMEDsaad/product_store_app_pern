import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import EditProductForm from '../components/EditProductForm';
import LoadingRing from '../components/LoadingSpinner/LoadingRing';
import { useProduct, useUpdateProduct } from '../hooks/useProducts';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();

  const { data: product, isLoading } = useProduct(id);
  const updateProduct = useUpdateProduct();

  if (isLoading) return <LoadingRing />;

  if (!product || product.userId !== userId) {
    return (
      <div className='card bg-base-300 max-w-md mx-auto'>
        <div className='card-body items-center text-center'>
          <h2 className='card-title text-error'>
            {!product ? 'Not Found' : 'Access denied'}
          </h2>
          <Link to='/' className='btn btn-primary btn-sm'>
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const editFormData = (formData) => {
    toast.promise(
      updateProduct.mutateAsync({ id, ...formData }),
      {
        loading: 'Updating product...',
        success: () => {
          navigate(`/product/${id}`);
          return 'Product update successfully ✅';
        },
      },
      { duration: 3000 }
    );
  };

  return (
    <div>
      <EditProductForm
        product={product}
        isPending={updateProduct.isPending}
        isError={updateProduct.isError}
        editFormData={editFormData}
      />
    </div>
  );
};

export default EditProductPage;
