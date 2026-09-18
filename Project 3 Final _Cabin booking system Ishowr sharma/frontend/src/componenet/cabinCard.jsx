import React from 'react';
import { UsersIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col md:flex-row border border-primary-800 overflow-hidden">
      {/* Image */}
      <img
        src={image}
        alt={`Cabin ${name}`}
        className="w-full md:w-48 h-52 md:h-full object-cover md:border-r border-primary-800"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Info */}
        <div className="pt-5 pb-4 px-6 md:px-7 bg-primary-950 flex-1">
          <h3 className="text-accent-500 font-semibold text-xl md:text-2xl mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-4">
            <UsersIcon className="h-5 w-5 text-primary-600 shrink-0" />
            <p className="text-base md:text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end items-baseline text-right">
            {discount > 0 ? (
              <>
                <span className="text-2xl md:text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600 text-lg md:text-xl">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl md:text-3xl font-[350]">
                ${regularPrice}
              </span>
            )}
            <span className="text-primary-200 text-sm md:text-base">
              / night
            </span>
          </p>
        </div>

        {/* Details Button */}
        <div className="bg-primary-950 border-t border-primary-800 mt-auto">
          <Link
            to={`/cabins/${id}`}
            className="block md:inline-block w-full md:w-auto text-center md:text-left border-t md:border-l border-primary-800 py-4 px-6 hover:bg-accent-600 transition-all hover:text-primary-900 font-medium"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
