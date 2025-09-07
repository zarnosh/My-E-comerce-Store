
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
