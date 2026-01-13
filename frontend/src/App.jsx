import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignOutButton,
} from '@clerk/clerk-react';

const App = () => {
  return (
    <div>
      <div>
        <SignedOut>
          <SignInButton className='btn btn-primary' />
        </SignedOut>
        <SignedIn>
          <SignOutButton className='btn btn-error' />
        </SignedIn>
      </div>
    </div>
  );
};

export default App;
