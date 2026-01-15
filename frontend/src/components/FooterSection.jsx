import { Link } from 'react-router';
import { Facebook, Github, Gitlab } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className='footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10'>
      {/* footer routing */}
      <nav className='grid grid-flow-col gap-4'>
        <Link to='/' className='link link-hover'>
          Home
        </Link>
        <Link to='/create' className='link link-hover'>
          Add Product
        </Link>
        <Link to='/profile' className='link link-hover'>
          Profile
        </Link>
        <Link to='/about' className='link link-hover'>
          About
        </Link>
      </nav>

      {/* icon container */}
      <nav>
        <div className='grid grid-flow-col gap-4'>
          {/* logo 1 - github */}
          <Link to='https://github.com/istiakAHMEDsaad/' target='_blank'>
            <Github fill='white' stroke='white' />
          </Link>

          {/* logo 2 - gitlab */}
          <Link to='https://gitlab.com/istiakAHMEDsaad/' target='_blank'>
            <Gitlab fill='white' stroke='white' />
          </Link>

          {/* logo 3 - facebook */}
          <Link to='https://www.facebook.com/istikahamed.saad/' target='_blank'>
            <Facebook fill='white' stroke='white' />
          </Link>
        </div>
      </nav>

      {/* copyright */}
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Istiak
          Ahmed Saad
        </p>
      </aside>
    </footer>
  );
};

export default FooterSection;
