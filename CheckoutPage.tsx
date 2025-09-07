import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAppContext } from '../hooks/useAppContext';
import { OrderItem } from '../types';

const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'Online' as 'COD' | 'Online',
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  if (cartItems.length === 0 && !isProcessing) {
      navigate('/');
      return null;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const orderItems: OrderItem[] = cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor
    }));
    
    const newOrder = {
        items: orderItems,
        total: cartTotal,
        status: 'Pending' as const,
        shippingAddress: {
            name: formData.name,
            address: formData.address,
            city: formData.city,
            zip: formData.zip,
        },
        paymentMethod: formData.paymentMethod,
    };
    
    addOrder(newOrder);

    // Simulate payment processing
    setTimeout(() => {
        clearCart();
        navigate('/orders');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Shipping & Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-900">Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-900">City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-900">ZIP Code</label>
                <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
            </div>
            
            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
                <div className="mt-4 space-y-4">
                    <div className="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400">
                        <input type="radio" id="online" name="paymentMethod" value="Online" checked={formData.paymentMethod === 'Online'} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                        <label htmlFor="online" className="ml-3 block text-sm font-medium text-gray-900">Online Payment (Card, UPI, etc.)</label>
                    </div>
                    <div className="flex items-center p-3 border rounded-md has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400">
                        <input type="radio" id="cod" name="paymentMethod" value="COD" checked={formData.paymentMethod === 'COD'} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                        <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-900">Cash on Delivery (COD)</label>
                    </div>
                </div>
            </div>

            <button type="submit" disabled={isProcessing} className="w-full mt-6 bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
              {isProcessing ? 'Processing...' : `Place Order - $${cartTotal.toFixed(2)}`}
            </button>
          </form>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t my-4"></div>
          <div className="flex justify-between font-bold text-lg text-gray-800">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
