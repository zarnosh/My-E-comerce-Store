
import React from 'react';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../hooks/useAppContext';

const HomePage: React.FC = () => {
  const { products } = useAppContext();
  const featuredProducts = products.slice(0, 8); // Display first 8 products as featured

  return (
    <div className="space-y-12">
      <Banner />
      
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Featured Products</h2>
        <p className="text-center mt-2 text-gray-500">Discover our handpicked selection of must-have items.</p>
        
        <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
