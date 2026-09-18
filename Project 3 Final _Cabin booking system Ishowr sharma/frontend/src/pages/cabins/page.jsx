import React, { Suspense, lazy } from 'react';
import Spinner from '../../componenet/Spinner';

const CabinList = lazy(() => import('../../componenet/CabinList'));

function CabinPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl mb-5 text-accent-400 font-medium text-center py-4">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <Suspense fallback={<Spinner />}>
        <CabinList />
      </Suspense>
    </div>
  );
}

export default CabinPage;
