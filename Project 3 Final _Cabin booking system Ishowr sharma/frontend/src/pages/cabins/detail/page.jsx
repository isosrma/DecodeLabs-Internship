import React from 'react';
import { UsersIcon, MapPinIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useSingleCabin } from '../../../services/query/cabin.query';
import { useParams } from 'react-router-dom';
import Reservation from '../../../componenet/Reservation';
import Spinner from '../../../componenet/Spinner';

function CabinDetail() {
  const { id } = useParams();
  const { cabin, isLoading } = useSingleCabin(id);

  if (isLoading) return <Spinner />;

  if (!cabin) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <Spinner />
        <p className="text-primary-300">Cabin not found</p>
      </div>
    );
  }

  const { name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Image + Info Section */}
      <div className="grid md:grid-cols-[3fr_4fr] gap-8 lg:gap-10 border border-primary-800 rounded-lg overflow-hidden bg-primary-950">
        {/* Image */}
        <div className="relative w-full aspect-16/10 md:aspect-auto md:h-full min-h-75 md:min-h-125">
          <img
            src={image}
            alt={`Cabin ${name}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Sidebar */}
        <div className="p-6 sm:p-8 flex flex-col">
          <div className="flex-1">
            <h1 className="text-accent-100 font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 leading-tight">
              Cabin {name}
            </h1>

            <p className="text-primary-300 text-base sm:text-lg leading-relaxed mb-8">
              {description}
            </p>

            {/* Features */}
            <ul className="flex flex-col gap-4 mb-10">
              <li className="flex gap-3 items-start">
                <UsersIcon className="h-6 w-6 text-primary-600 mt-0.5 shrink-0" />
                <span className="text-lg text-primary-200">
                  For up to{' '}
                  <span className="font-bold text-white">{maxCapacity}</span>{' '}
                  guests
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <MapPinIcon className="h-6 w-6 text-primary-600 mt-0.5 shrink-0" />
                <span className="text-lg text-primary-200">
                  Located in the heart of the{' '}
                  <span className="font-bold text-white">Dolomites</span>{' '}
                  (Italy)
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <EyeSlashIcon className="h-6 w-6 text-primary-600 mt-0.5 shrink-0" />
                <span className="text-lg text-primary-200">
                  Privacy <span className="font-bold text-white">100%</span>{' '}
                  guaranteed
                </span>
              </li>
            </ul>
          </div>

          {/* Price Section */}
        </div>
      </div>

      {/* Reservation Section */}
      <div className="mt-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Reservation cabin={cabin} />
      </div>
    </div>
  );
}

export default CabinDetail;
