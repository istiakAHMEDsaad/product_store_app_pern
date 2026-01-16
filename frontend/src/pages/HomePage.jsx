import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import LoadingRing from '../components/LoadingSpinner/LoadingRing';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useProducts({
    search: debouncedSearch,
    page,
  });

  if (isLoading) return <LoadingRing />;

  const { products, totalPages } = data;

  return (
    <div className='space-y-6'>
      {/* 🔍 Search */}
      <div className='flex justify-center'>
        <input
          type='text'
          placeholder='Search products...'
          className='input input-bordered w-full max-w-md'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* 🛍 Products */}
      {products.length === 0 ? (
        <div className='text-center text-base-content/60'>
          No products found
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center'>
          <div className='join'>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`join-item btn ${
                  page === i + 1 ? 'btn-primary' : ''
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
