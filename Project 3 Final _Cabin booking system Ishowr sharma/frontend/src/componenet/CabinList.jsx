import React from 'react';
import CabinCard from './cabinCard';
import { useCabins } from '../services/query/cabin.query';
import Spinner from './Spinner';
import { useSearchParams } from 'react-router-dom';
import CabinFilterTabs from './filter';

function CabinList() {
  const [searchParams] = useSearchParams();
  const capacity = searchParams.get('capacity') || '';
  const { cabins, loading, updateFilters } = useCabins();

  React.useEffect(() => {
    updateFilters({ maxCapacity: capacity });
  }, [capacity, updateFilters]);

  if (loading) return <Spinner />;
  if (!cabins?.length) return null;

  return (
    <div>
      <CabinFilterTabs />

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {cabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    </div>
  );
}

export default CabinList;
