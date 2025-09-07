import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { TradeArea } from '../../types';

const AdminTradeAreas: React.FC = () => {
    const { tradeAreas, addTradeArea, updateTradeArea, deleteTradeArea } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArea, setEditingArea] = useState<TradeArea | null>(null);

    const openModal = (area: TradeArea | null = null) => {
        setEditingArea(area);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingArea(null);
    };

    const TradeAreaForm: React.FC<{ area: TradeArea | null; onSave: (data: any) => void; onCancel: () => void; }> = ({ area, onSave, onCancel }) => {
        const [formData, setFormData] = useState({
            name: area?.name || '',
            cities: area?.cities.join(', ') || '',
            deliveryRadiusKm: area?.deliveryRadiusKm || 0,
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };
        
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            const areaData = {
                ...formData,
                deliveryRadiusKm: parseInt(String(formData.deliveryRadiusKm), 10),
                cities: formData.cities.split(',').map(s => s.trim()),
            };
            onSave(area ? { ...area, ...areaData } : areaData);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-6">{area ? 'Edit Trade Area' : 'Add Trade Area'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div><label className="text-sm font-medium text-gray-700">Area Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                        <div><label className="text-sm font-medium text-gray-700">Cities (comma-separated)</label><input type="text" name="cities" value={formData.cities} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                        <div><label className="text-sm font-medium text-gray-700">Delivery Radius (km)</label><input type="number" name="deliveryRadiusKm" value={formData.deliveryRadiusKm} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Save Area</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const handleSave = (data: any) => {
        if (editingArea) {
            updateTradeArea(data);
        } else {
            addTradeArea(data);
        }
        closeModal();
    };

    const handleDelete = (areaId: string) => {
        if (window.confirm('Are you sure? Deleting an area will also remove associated branches.')) {
            deleteTradeArea(areaId);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Manage Trade Areas</h1>
                <button onClick={() => openModal()} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm">Add Trade Area</button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cities</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Radius (km)</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tradeAreas.map(area => (
                            <tr key={area.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{area.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{area.cities.join(', ')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{area.deliveryRadiusKm}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => openModal(area)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(area.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <TradeAreaForm area={editingArea} onSave={handleSave} onCancel={closeModal} />}
        </div>
    );
};

export default AdminTradeAreas;
