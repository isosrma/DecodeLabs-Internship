import React from 'react';
import Spinner from '../../componenet/Spinner'; // Make sure path is correct
import { useCabins } from '../../services/query/cabin.query';

function About() {
  const { cabins, isLoading } = useCabins(); 

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-16 gap-y-16 lg:gap-y-24 items-center">
        {/* First Section - Text + Image */}
        <div className="lg:col-span-7 space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-accent-400 leading-tight">
            Welcome to The Wild Oasis
          </h1>

          <div className="space-y-6 text-lg text-primary-200 leading-relaxed">
            <p>
              Where nature&apos;s beauty and comfortable living blend
              seamlessly. Hidden away in the heart of the Italian Dolomites,
              this is your paradise away from home.
            </p>
            <p>
              But it&apos;s not just about the luxury cabins. It&apos;s about
              the experience of reconnecting with nature and enjoying simple
              pleasures with family.
            </p>
            <p>
              Our {cabins?.length || 0} luxury cabins provide a cozy base, but
              the real freedom and peace you&apos;ll find is in the surrounding
              mountains. Wander through lush forests, breathe in the fresh air,
              and watch the stars twinkle above from the warmth of a campfire or
              your hot tub.
            </p>
          </div>
        </div>

        {/* First Image */}
        <div className="lg:col-span-5">
          <img
            src="/about-1.jpg"
            alt="Family sitting around a fire pit in front of cabin"
            className="w-full h-auto rounded-2xl shadow-xl object-cover aspect-4/3"
          />
        </div>

        {/* Second Image */}
        <div className="lg:col-span-5">
          <div className="relative aspect-square lg:aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/about-2.jpg"
              alt="Family that manages The Wild Oasis"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Second Text Section */}
        <div className="lg:col-span-7 space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-accent-400 leading-tight">
            Managed by our family since 1962
          </h1>

          <div className="space-y-6 text-lg text-primary-200 leading-relaxed">
            <p>
              Since 1962, The Wild Oasis has been a cherished family-run
              retreat. Started by our grandparents, this haven has been nurtured
              with love and care, passing down through our family as a testament
              to our dedication to creating a warm, welcoming environment.
            </p>
            <p>
              Over the years, we&apos;ve maintained the essence of The Wild
              Oasis, blending the timeless beauty of the mountains with the
              personal touch only a family business can offer. Here, you&apos;re
              not just a guest; you&apos;re part of our extended family.
            </p>
          </div>

          <div className="pt-4">
            <a
              href="/cabins"
              className="inline-block bg-accent-500 hover:bg-accent-600 transition-all 
                       text-primary-900 font-semibold px-10 py-4 text-lg rounded-2xl"
            >
              Explore our luxury cabins →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
