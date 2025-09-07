import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Product } from '../../types';

const AdminInventory: React.FC = () => {
    const { products, categories, updateProductStock } = useAppContext();
    const [stockFilter, setStockFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingStock, setEditingStock] = useState<{ [key: string]: string }>({});

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
            .filter(p => {
                if (stockFilter === 'all') return true;
                if (stockFilter === 'outOfStock') return p.stock === 0;
                if (stockFilter === 'lowStock') return p.stock > 0 && p.stock < 10;
                if (stockFilter === 'inStock') return p.stock >= 10;
                return true;
            });
    }, [products, searchTerm, categoryFilter, stockFilter]);

    const handleStockChange = (productId: string, value: string) => {
        setEditingStock(prev => ({ ...prev, [productId]: value }));
    };

    const handleStockUpdate = (productId: string) => {
        const newStock = parseInt(editingStock[productId], 10);
        if (!isNaN(newStock) && newStock >= 0) {
            updateProductStock(productId, newStock);
            setEditingStock(prev => {
                const { [productId]: _, ...rest } = prev;
                return rest;
            });
        }
    };

    const getStockStatus = (stock: number) => {
        if (stock === 0) return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Out of Stock</span>;
        if (stock < 10) return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Low Stock</span>;
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">In Stock</span>;
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Inventory Management</h1>
            
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="Search by name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full border p-2 rounded-md shadow-sm" />
                    <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="w-full border p-2 rounded-md shadow-sm bg-white">
                        <option value="all">All Categories</option>
                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                    <select value={stockFilter} onChange={e => setStockFilter(e.target.value)} className="w-full border p-2 rounded-md shadow-sm bg-white">
                        <option value="all">All Stock Statuses</option>
                        <option value="inStock">In Stock (>=10)</option>
                        <option value="lowStock">Low Stock (&lt;10)</option>
                        <option value="outOfStock">Out of Stock</option>
                    </select>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Update Stock</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{product.name}</div></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">{product.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{getStockStatus(product.stock)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end items-center space-x-2">
                                        <input
                                            type="number"
                                            value={editingStock[product.id] ?? product.stock}
                                            onChange={(e) => handleStockChange(product.id, e.target.value)}
                                            className="w-20 border p-1 rounded-md shadow-sm text-center"
                                        />
                                        <button
                                            onClick={() => handleStockUpdate(product.id)}
                                            className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-md hover:bg-indigo-700"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminInventory;