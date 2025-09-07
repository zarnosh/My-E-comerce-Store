
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">LuxeThread</h3>
            <p className="text-gray-400">Modern fashion for the discerning individual. Quality craftsmanship and timeless style.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/category/men" className="text-gray-400 hover:text-white">Men</Link></li>
              <li><Link to="/category/women" className="text-gray-400 hover:text-white">Women</Link></li>
              <li><Link to="/category/kids" className="text-gray-400 hover:text-white">Kids</Link></li>
              <li><Link to="/category/accessories" className="text-gray-400 hover:text-white">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-400 mb-4">Sign up for our newsletter to get the latest deals.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none" />
              <button type="submit" className="bg-indigo-600 px-4 py-2 rounded-r-md hover:bg-indigo-700">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} LuxeThread. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {/* Social Icons would go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
