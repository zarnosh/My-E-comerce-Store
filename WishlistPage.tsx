import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ProductCard from '../components/ProductCard';

const WishlistPage: React.FC = () => {
  const { currentUser, products } = useAppContext();

  if (!currentUser) {
    return null; // Or a loading spinner
  }

  const wishlistProducts = products.filter(p => currentUser.wishlist.includes(p.id));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-100 rounded-lg">
          <p className="text-xl text-gray-600">Your wishlist is empty.</p>
          <p className="text-gray-500 mt-2">Add your favorite items to your wishlist to see them here.</p>
          <Link to="/" className="mt-4 inline-block bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
