import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { useCart } from '../hooks/useCart';
import NotFoundPage from './NotFoundPage';
import StarRating from '../components/StarRating';

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        fill={filled ? "currentColor" : "none"} 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={`transition-colors duration-200 ${filled ? 'text-red-500' : 'text-gray-800'}`}
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);


const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, currentUser, toggleWishlist, addReview, showToast } = useAppContext();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = products.find(p => p.id === productId);

  const [selectedSize, setSelectedSize] = useState<string | null>(product?.sizes[0] || null);
  const [selectedColor, setSelectedColor] = useState<string | null>(product?.colors[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!product) {
    return <NotFoundPage />;
  }
  
  const isWishlisted = currentUser?.wishlist?.includes(product.id) || false;
  
  const handleAddToCart = () => {
    if(!selectedSize || !selectedColor) {
      setError('Please select a size and color.');
      return;
    }
    setError('');
    setAddingToCart(true);
    addToCart(product, quantity, selectedSize, selectedColor);
    showToast('Added to cart!', 'success');
    
    setTimeout(() => {
        setAddingToCart(false);
        // navigate('/cart'); // Optional: redirect to cart
    }, 1000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!reviewComment.trim()){
      alert("Please enter a comment.");
      return;
    }
    addReview(product.id, { rating: reviewRating, comment: reviewComment });
    setReviewComment('');
    setReviewRating(5);
  }

  return (
    <div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-center object-cover" />
        </div>
        
        <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center">
                <StarRating rating={product.rating} />
                <span className="text-gray-600 ml-3 text-sm">{product.reviews.length} Reviews</span>
            </div>
            <p className="text-3xl text-gray-900 mt-2">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
            
            <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="flex items-center space-x-3 mt-2">
                {product.colors.map(color => (
                <button 
                    key={color} 
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 ${selectedColor === color ? 'ring-2 ring-offset-1 ring-indigo-500 border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: color.toLowerCase().replace(' ','') }}
                    title={color}
                >
                    <span className="sr-only">{color}</span>
                </button>
                ))}
            </div>
            </div>
            
            <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map(size => (
                <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${selectedSize === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                    {size}
                </button>
                ))}
            </div>
            </div>
            
            {product.stock < 10 && product.stock > 0 && <p className="text-red-500 text-sm mt-4">Only {product.stock} left in stock!</p>}
            {product.stock === 0 && <p className="text-red-500 text-lg font-semibold mt-4">Out of Stock</p>}

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            
            {product.stock > 0 && (
            <div className="mt-8 flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
                </div>
                <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-400"
                >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
                 <button onClick={() => toggleWishlist(product.id)} className="p-3 border border-gray-300 rounded-md hover:bg-gray-100">
                    <HeartIcon filled={isWishlisted} />
                </button>
            </div>
            )}
        </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 pt-10 border-t">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            {product.reviews.length > 0 ? (
                <div className="mt-6 space-y-8">
                    {product.reviews.map(review => (
                        <div key={review.id} className="border-b pb-6">
                            <div className="flex items-center mb-2">
                                <StarRating rating={review.rating} />
                                <p className="ml-4 font-semibold">{review.userName}</p>
                                <p className="ml-auto text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-4 text-gray-500">No reviews yet. Be the first to share your thoughts!</p>
            )}

            {currentUser && currentUser.role === 'customer' && (
                <div className="mt-10">
                    <h3 className="text-lg font-semibold">Write a review</h3>
                    <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4 max-w-xl">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Rating</label>
                            <div className="flex">
                               {[1, 2, 3, 4, 5].map(star => (
                                 <button type="button" key={star} onClick={() => setReviewRating(star)} className="text-2xl">
                                    <StarRating rating={1} selectedColor={star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'} />
                                 </button>
                               ))}
                            </div>
                        </div>
                        <div>
                             <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
                            <textarea id="comment" value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} rows={4} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                        </div>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Submit Review</button>
                    </form>
                </div>
            )}
        </div>
    </div>
  );
};

export default ProductDetailPage;
