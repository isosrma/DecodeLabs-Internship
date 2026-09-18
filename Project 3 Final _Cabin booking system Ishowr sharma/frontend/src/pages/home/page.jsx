import React from 'react';
import { useCabins } from '../../services/query/cabin.query';

export default function HomePage() {
  const { cabins, isLoading } = useCabins();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/bg.png')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Badge / Tagline */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
            <span className="text-accent-400 text-sm font-medium tracking-widest">
              THE WILD OASIS
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white leading-none tracking-tighter">
            Welcome to
            <br />
            <span className="text-accent-400 font-medium">Paradise</span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-primary-200 font-light leading-relaxed">
            Luxury cabins nestled in the heart of the Italian Dolomites.
            <br />
            Where nature meets comfort and unforgettable memories are made.
          </p>

          {/* Stats */}
          {!isLoading && cabins && (
            <div className="flex justify-center gap-10 md:gap-16 text-primary-300 mt-12">
              <div>
                <div className="text-4xl font-semibold text-white">
                  {cabins.length}
                </div>
                <div className="text-sm tracking-widest uppercase mt-1">
                  Luxury Cabins
                </div>
              </div>
              <div>
                <div className="text-4xl font-semibold text-white">1962</div>
                <div className="text-sm tracking-widest uppercase mt-1">
                  Est. Since
                </div>
              </div>
              <div>
                <div className="text-4xl font-semibold text-white">100%</div>
                <div className="text-sm tracking-widest uppercase mt-1">
                  Satisfaction
                </div>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="pt-8">
            <a
              href="/cabins"
              className="group inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-600 
                       text-primary-950 font-semibold text-lg px-12 py-5 rounded-2xl 
                       transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              Explore Our Cabins
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-primary-400 text-sm">
            <span>Scroll to discover</span>
            <div className="w-px h-12 bg-linear-to-b from-transparent via-primary-400 to-transparent" />
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-primary-950 to-transparent" />
    </div>
  );
}
