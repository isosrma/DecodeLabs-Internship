import React from 'react';


import { pizzaData } from '../pizza/Data';
import Pizza from './pizza';

export default function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;

  return (
    <main className="flex flex-col items-center gap-10">
      <h2 className="text-2xl uppercase tracking-widest border-y-2 py-2">
        Our Menu
      </h2>

      {numPizzas > 0 ? (
        <>
          <p className="text-center text-sm w-4/5">
            Authentic Italian cuisine. All from our stone oven.
          </p>

          <div className="grid grid-cols-2 gap-10">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </div>
        </>
      ) : (
        <p>We're still working on our menu.</p>
      )}
    </main>
  );
}