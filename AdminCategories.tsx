import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Category } from '../../types';

const AdminCategories: React.FC = () => {
    const { categories, products, addCategory, updateCategory, deleteCategory } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
    });

    const openModal = (category: Category | null = null) => {
        setEditingCategory(category);
        setFormData({
            name: category?.name || '',
            seoTitle: category?.seo?.title || '',
            seoDescription: category?.seo?.description || '',
            seoKeywords: category?.seo?.keywords || '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({ name: '', seoTitle: '', seoDescription: '', seoKeywords: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        if (!formData.name.trim()) return;

        const { name, seoTitle, seoDescription, seoKeywords } = formData;
        const categoryData = {
            name,
            seo: {
                title: seoTitle,
                description: seoDescription,
                keywords: seoKeywords,
            }
        };

        if (editingCategory) {
            updateCategory({ ...editingCategory, ...categoryData });
        } else {
            addCategory(categoryData);
        }
        closeModal();
    };

    const handleDelete = (categoryId: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteCategory(categoryId);
        }
    };
    
    const getProductCount = (categoryName: string) => {
        return products.filter(p => p.category === categoryName).length;
    }

    const CategoryModal = () => (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
                <div className="space-y-4">
                    <div><label className="text-sm font-medium text-gray-700">Category Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full border p-2 rounded-md shadow-sm" placeholder="e.g., Mens Shirts" /></div>
                    
                    <div className="border-t pt-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-800">SEO Settings</h3>
                        <div className="space-y-4 mt-4">
                             <div><label className="text-sm font-medium text-gray-700">SEO Title</label><input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleChange} className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                             <div><label className="text-sm font-medium text-gray-700">Meta Description</label><textarea name="seoDescription" value={formData.seoDescription} onChange={handleChange} rows={2} className="mt-1 w-full border p-2 rounded-md shadow-sm"></textarea></div>
                             <div><label className="text-sm font-medium text-gray-700">Meta Keywords (comma-separated)</label><input type="text" name="seoKeywords" value={formData.seoKeywords} onChange={handleChange} className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                    <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save</button>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Manage Categories</h1>
                <button onClick={() => openModal()} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add Category</button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Count</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getProductCount(category.name)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => openModal(category)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <CategoryModal />}
        </div>
    );
};

export default AdminCategories;