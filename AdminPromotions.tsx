import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Promotion } from '../../types';

const AdminPromotions: React.FC = () => {
    const { promotions, addPromotion, updatePromotion, deletePromotion } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

    const openModal = (promo: Promotion | null = null) => {
        setEditingPromotion(promo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPromotion(null);
    };

    const PromotionForm: React.FC<{ promo: Promotion | null; onSave: (data: any) => void; onCancel: () => void; }> = ({ promo, onSave, onCancel }) => {
        const [formData, setFormData] = useState({
            code: promo?.code || '',
            discountPercent: promo?.discountPercent || 0,
            isActive: promo?.isActive ?? true,
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, type, checked } = e.target;
            setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        };
        
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const promoData = {
                ...formData,
                discountPercent: parseInt(String(formData.discountPercent), 10),
            };
            onSave(promo ? { ...promo, ...promoData } : promoData);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-6">{promo ? 'Edit Promotion' : 'Add Promotion'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div><label className="text-sm font-medium text-gray-700">Discount Code</label><input type="text" name="code" value={formData.code} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                        <div><label className="text-sm font-medium text-gray-700">Discount (%)</label><input type="number" name="discountPercent" value={formData.discountPercent} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                        <div className="flex items-center"><input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /><label className="ml-2 text-sm font-medium text-gray-700">Active</label></div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Save Promotion</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
    
    const handleSave = (data: any) => {
        if (editingPromotion) {
            updatePromotion(data);
        } else {
            addPromotion(data);
        }
        closeModal();
    };

    const handleDelete = (promoId: string) => {
        if (window.confirm('Are you sure you want to delete this promotion?')) {
            deletePromotion(promoId);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Manage Promotions</h1>
                <button onClick={() => openModal()} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm">Add Promotion</button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {promotions.map(promo => (
                            <tr key={promo.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{promo.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{promo.discountPercent}%</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${promo.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {promo.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => openModal(promo)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(promo.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <PromotionForm promo={editingPromotion} onSave={handleSave} onCancel={closeModal} />}
        </div>
    );
};

export default AdminPromotions;
