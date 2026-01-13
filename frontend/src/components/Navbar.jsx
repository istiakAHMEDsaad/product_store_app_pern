import {
  UserButton,
  SignInButton,
  SignUpButton,
  useAuth,
} from '@clerk/clerk-react';

import { UserIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className='navbar bg-base-200'>
      <div className='max-w-5xl mx-auto w-full px-4 flex items-center justify-center'>
        {/* 👈 left sied */}
        <div className='flex-1'>
          <Link to='/' className='btn btn-ghost gap-2'>
            <div className='relative w-5 h-5'>
              <img
                src='/store.png'
                alt='store icon'
                className='absolute inset-0 w-full h-full object-cover'
              />
            </div>
            <span className='text-lg font-bold font-roboto uppercase tracking-wider'>
              Productify
            </span>
          </Link>
        </div>

        {/* 👉 right side */}
        <div className='flex gap-2 items-center font-poppins'>
          <ThemeSelector />
          {isSignedIn ? (
            <>
              <Link to='/create' className='btn btn-primary btn-sm gap-1'>
                <PlusIcon className='size-4' />
                <span className='hidden sm:inline'>New Product</span>
              </Link>
              <Link to='/profile' className='btn btn-ghost btn-sm gap-1'>
                <UserIcon className='size-4' />
                <span className='hidden sm:inline'>Profile</span>
              </Link>
            </>
          ) : (
            <>
              <SignInButton mode='modal'>
                <button className='btn btn-ghost btn-sm'>Sign in</button>
              </SignInButton>
              <SignUpButton mode='modal'>
                <button className='btn btn-primary btn-sm'>Sign Up</button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
