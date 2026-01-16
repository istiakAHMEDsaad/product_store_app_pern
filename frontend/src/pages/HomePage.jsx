import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import LoadingRing from '../components/LoadingSpinner/LoadingRing';
import ProductCard from '../components/ProductCard';
import { SignInButton, useAuth } from '@clerk/clerk-react';
import { Link } from 'react-router';
import { SparklesIcon } from 'lucide-react';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useProducts({
    search: debouncedSearch,
    page,
  });

  const { isSignedIn } = useAuth();

  if (isLoading) return <LoadingRing />;

  const { products, totalPages } = data;

  return (
    <div className='space-y-10'>
      {/* Heros */}
      <div className='hero bg-linear-to-br from-base-300 via-base-200 to-base-300 rounded-box overflow-hidden'>
        <div className='hero-content flex-col lg:flex-row-reverse gap-10 py-10'>
          <div className='relative'>
            <div className='absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110' />
            <img
              src='/image.png'
              alt='Creator'
              className='relative h-64 lg:h-72 rounded-2xl shadow-2xl'
            />
          </div>
          <div className='text-center lg:text-left'>
            <h1 className='text-4xl lg:text-5xl font-bold leading-tight'>
              Share Your <span className='text-primary'>Products</span>
            </h1>
            <p className='py-4 text-base-content/60'>
              Upload, discover, and connect with creators.
            </p>
            {isSignedIn ? (
              <Link to='/create'>
                <button className='btn btn-primary'>
                  <SparklesIcon className='size-4' />
                  Start Selling
                </button>
              </Link>
            ) : (
              <SignInButton mode='modal'>
                <button className='btn btn-primary'>
                  <SparklesIcon className='size-4' />
                  Start Selling
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>

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
