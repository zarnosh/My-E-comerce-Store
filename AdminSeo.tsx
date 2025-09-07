import React from 'react';
import { Link } from 'react-router-dom';

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);


const AdminSeo: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">SEO Management</h1>
            <p className="text-gray-600 mb-8">
                Improve your store's visibility on search engines like Google by managing the SEO settings for your products and categories.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800">Product SEO</h2>
                    <p className="mt-2 text-gray-600">
                        Control the meta title, description, and keywords for each individual product. This helps customers find your specific items through search.
                    </p>
                    <Link to="/admin/products" className="mt-4 inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800">
                        Manage Product SEO
                        <ArrowRightIcon />
                    </Link>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800">Category SEO</h2>
                    <p className="mt-2 text-gray-600">
                        Set the meta title and description for your main store categories. This is great for ranking on broader search terms like "men's clothing".
                    </p>
                    <Link to="/admin/categories" className="mt-4 inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800">
                        Manage Category SEO
                        <ArrowRightIcon />
                    </Link>
                </div>
            </div>

             <div className="mt-10 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="flex">
                    <div className="py-1">
                        <svg className="fill-current h-6 w-6 text-blue-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v4h2v-4H9zm1-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>
                    </div>
                    <div>
                        <p className="font-bold">Pro Tip:</p>
                        <p className="text-sm">
                            Write compelling titles and descriptions that include relevant keywords to attract more clicks from search results. Keep titles under 60 characters and descriptions under 160 characters for best results.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSeo;