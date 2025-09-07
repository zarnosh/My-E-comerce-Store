import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={`transition-colors duration-200 ${filled ? 'text-red-500' : 'text-gray-400'}`}
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { currentUser, toggleWishlist } = useAppContext();
  const isWishlisted = currentUser?.wishlist?.includes(product.id) || false;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    e.stopPropagation();
    toggleWishlist(product.id);
  };
  
  return (
    <div className="group relative border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8 relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-center object-cover group-hover:opacity-80 transition-opacity duration-300"
          />
           <button onClick={handleWishlistClick} className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
              <HeartIcon filled={isWishlisted} />
           </button>
        </div>
        <div className="p-4 bg-white">
            <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-700 truncate pr-2">{product.name}</h3>
                <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </div>
            <div className="mt-2 flex items-center">
                 <StarRating rating={product.rating} />
                 <span className="text-xs text-gray-500 ml-2">({product.reviews.length})</span>
            </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
