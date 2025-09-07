
import React from 'react';
import { Link } from 'react-router-dom';

const Banner: React.FC = () => {
  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://picsum.photos/seed/banner/1600/600"
          alt="Promotional Banner"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">New Arrivals are Here</h1>
        <p className="mt-6 text-xl text-indigo-100 max-w-2xl mx-auto">
          Flat 30% Off! Discover the latest trends and refresh your wardrobe with our stunning new collection.
        </p>
        <Link
          to="/category/women"
          className="mt-8 w-full inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 sm:w-auto"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Banner;
