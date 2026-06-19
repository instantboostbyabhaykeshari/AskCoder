'use client';

const GlobalError = ({error, reset}) => (
  <main className='mx-auto mt-24 max-w-2xl px-6 text-center text-white'>
    <h1 className='mb-3 text-2xl font-semibold'>Something went wrong</h1>
    <p className='mb-6 text-sm text-slate-300'>
      {error?.message || 'The page could not be loaded.'}
    </p>
    <button className='s-btn s-btn__primary' onClick={reset}>
      Try again
    </button>
  </main>
);

export default GlobalError;
