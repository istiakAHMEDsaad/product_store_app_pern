function LoadingRing() {
  return (
    <div className='flex flex-col items-center justify-center py-20 font-poppins'>
      <span className='loading loading-ring loading-xl text-primary size-20'></span>
      <p className='text-sm text-base-content/50'>Loading...</p>
    </div>
  );
}

export default LoadingRing;
