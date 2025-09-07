import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Product } from '../../types';

type SortKey = keyof Product | '';
type SortDirection = 'ascending' | 'descending';

const ITEMS_PER_PAGE = 10;

// Reusable modal from previous version, kept inside for encapsulation
const ProductForm: React.FC<{ product: Product | null; categories: any[]; onSave: (product: any) => void; onCancel: () => void; }> = ({ product, categories, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        category: product?.category || categories[0]?.name || '',
        imageUrl: product?.imageUrl || 'https://picsum.photos/seed/new/600/800',
        sizes: product?.sizes.join(', ') || '',
        colors: product?.colors.join(', ') || '',
        stock: product?.stock || 0,
        seoTitle: product?.seo?.title || '',
        seoDescription: product?.seo?.description || '',
        seoKeywords: product?.seo?.keywords || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { seoTitle, seoDescription, seoKeywords, ...productDetails } = formData;
        const productData = {
            ...productDetails,
            price: parseFloat(String(formData.price)),
            stock: parseInt(String(formData.stock), 10),
            sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
            colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
            seo: {
                title: seoTitle,
                description: seoDescription,
                keywords: seoKeywords,
            }
        };
        onSave(product ? { ...product, ...productData } : productData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
                <h2 className="text-2xl font-bold mb-6">{product ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="text-sm font-medium text-gray-700">Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                    <div><label className="text-sm font-medium text-gray-700">Description</label><textarea name="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 w-full border p-2 rounded-md shadow-sm"></textarea></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium text-gray-700">Price</label><input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                        <div><label className="text-sm font-medium text-gray-700">Stock</label><input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                    </div>
                    <div><label className="text-sm font-medium text-gray-700">Category</label><select name="category" value={formData.category} onChange={handleChange} className="mt-1 w-full border p-2 rounded-md shadow-sm">{categories.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
                    <div><label className="text-sm font-medium text-gray-700">Image URL</label><input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                    <div><label className="text-sm font-medium text-gray-700">Sizes (comma-separated)</label><input type="text" name="sizes" value={formData.sizes} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                    <div><label className="text-sm font-medium text-gray-700">Colors (comma-separated)</label><input type="text" name="colors" value={formData.colors} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                    <div className="border-t pt-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-800">SEO Settings</h3>
                            <div className="space-y-4 mt-4">
                            <div><label className="text-sm font-medium text-gray-700">SEO Title</label><input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleChange} className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                            <div><label className="text-sm font-medium text-gray-700">Meta Description</label><textarea name="seoDescription" value={formData.seoDescription} onChange={handleChange} rows={2} className="mt-1 w-full border p-2 rounded-md shadow-sm"></textarea></div>
                            <div><label className="text-sm font-medium text-gray-700">Meta Keywords (comma-separated)</label><input type="text" name="seoKeywords" value={formData.seoKeywords} onChange={handleChange} className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Save Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AdminProducts: React.FC = () => {
    const { products, categories, addProduct, updateProduct, deleteProduct, deleteMultipleProducts } = useAppContext();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [stockFilter, setStockFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey, direction: SortDirection }>({ key: 'name', direction: 'ascending' });
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const openModal = (product: Product | null = null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSave = (productData: any) => {
        if (editingProduct) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }
        closeModal();
    };

    const handleDelete = (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(productId);
        }
    };
    
    const handleBulkDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedProductIds.length} products?`)) {
            deleteMultipleProducts(selectedProductIds);
            setSelectedProductIds([]);
        }
    };

    const handleSort = (key: SortKey) => {
        let direction: SortDirection = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

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

    const sortedProducts = useMemo(() => {
        const sortableItems = [...filteredProducts];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key as keyof Product];
                const bValue = b[sortConfig.key as keyof Product];

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredProducts, sortConfig]);

    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = sortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleSelectProduct = (id: string) => {
        setSelectedProductIds(prev => 
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedProductIds(paginatedProducts.map(p => p.id));
        } else {
            setSelectedProductIds([]);
        }
    };

    return (
        <div>
            <style>{`
                @keyframes fade-in-scale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .animate-fade-in-scale { animation: fade-in-scale 0.3s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94); }
            `}</style>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Product Management</h1>
                <button onClick={() => openModal()} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm">Add Product</button>
            </div>
            
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

            {selectedProductIds.length > 0 && (
                <div className="bg-indigo-100 border border-indigo-200 text-indigo-800 p-3 rounded-md mb-6 flex justify-between items-center">
                    <span>{selectedProductIds.length} product(s) selected</span>
                    <button onClick={handleBulkDelete} className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600">Delete Selected</button>
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3"><input type="checkbox" onChange={handleSelectAll} checked={selectedProductIds.length === paginatedProducts.length && paginatedProducts.length > 0} /></th>
                            <th onClick={() => handleSort('name')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Product</th>
                            <th onClick={() => handleSort('category')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Category</th>
                            <th onClick={() => handleSort('price')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Price</th>
                            <th onClick={() => handleSort('stock')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Stock</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedProducts.map(product => (
                            <tr key={product.id} className={selectedProductIds.includes(product.id) ? 'bg-indigo-50' : ''}>
                                <td className="px-6 py-4"><input type="checkbox" checked={selectedProductIds.includes(product.id)} onChange={() => handleSelectProduct(product.id)} /></td>
                                <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><div className="flex-shrink-0 h-10 w-10"><img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt="" /></div><div className="ml-4"><div className="text-sm font-medium text-gray-900">{product.name}</div></div></div></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => openModal(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
                <div className="space-x-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded-md disabled:opacity-50">Previous</button>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md disabled:opacity-50">Next</button>
                </div>
            </div>

            {isModalOpen && <ProductForm product={editingProduct} categories={categories} onSave={handleSave} onCancel={closeModal} />}
        </div>
    );
};

export default AdminProducts;