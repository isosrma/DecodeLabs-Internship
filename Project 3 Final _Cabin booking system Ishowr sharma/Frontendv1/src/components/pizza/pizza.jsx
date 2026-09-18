import React from 'react';
export default function Pizza({ pizzaObj }) {
  return (
    <li
      className={`flex gap-6 ${pizzaObj.soldOut ? 'opacity-60 grayscale' : ''}`}
    >
      <img
        src={pizzaObj.photoName}
        alt={pizzaObj.name}
        className="w-28 aspect-square"
      />

      <div className="flex flex-col gap-2">
        <h3 className="text-xl">{pizzaObj.name}</h3>

        <p className="text-sm italic text-gray-600">{pizzaObj.ingredients}</p>

        <span className="text-lg">
          {pizzaObj.soldOut ? 'SOLD OUT' : `$${pizzaObj.price}`}
        </span>
      </div>
    </li>
  );
}