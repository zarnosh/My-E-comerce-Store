import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Branch } from '../../types';

const AdminBranches: React.FC = () => {
    const { branches, tradeAreas, addBranch, updateBranch, deleteBranch } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

    const openModal = (branch: Branch | null = null) => {
        setEditingBranch(branch);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBranch(null);
    };

    const BranchForm: React.FC<{ branch: Branch | null; onSave: (data: any) => void; onCancel: () => void; }> = ({ branch, onSave, onCancel }) => {
        const [formData, setFormData] = useState({
            name: branch?.name || '',
            address: branch?.address || '',
            city: branch?.city || '',
            contactPhone: branch?.contactPhone || '',
            tradeAreaId: branch?.tradeAreaId || (tradeAreas.length > 0 ? tradeAreas[0].id : ''),
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };
        
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!formData.tradeAreaId) {
                alert('Please create a Trade Area first.');
                return;
            }
            onSave(branch ? { ...branch, ...formData } : formData);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-6">{branch ? 'Edit Branch' : 'Add Branch'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div><label className="text-sm font-medium text-gray-700">Branch Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                        <div><label className="text-sm font-medium text-gray-700">Address</label><input type="text" name="address" value={formData.address} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium text-gray-700">City</label><input type="text" name="city" value={formData.city} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                            <div><label className="text-sm font-medium text-gray-700">Contact Phone</label><input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} required className="mt-1 w-full border p-2 rounded-md shadow-sm" /></div>
                        </div>
                        <div><label className="text-sm font-medium text-gray-700">Trade Area</label>
                            <select name="tradeAreaId" value={formData.tradeAreaId} onChange={handleChange} className="mt-1 w-full border p-2 rounded-md shadow-sm bg-white">
                                {tradeAreas.length === 0 ? (
                                    <option>No trade areas available</option>
                                ) : (
                                    tradeAreas.map(ta => <option key={ta.id} value={ta.id}>{ta.name}</option>)
                                )}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Save Branch</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const handleSave = (data: any) => {
        if (editingBranch) {
            updateBranch(data);
        } else {
            addBranch(data);
        }
        closeModal();
    };

    const handleDelete = (branchId: string) => {
        if (window.confirm('Are you sure you want to delete this branch?')) {
            deleteBranch(branchId);
        }
    };

    const getTradeAreaName = (id: string) => tradeAreas.find(ta => ta.id === id)?.name || 'N/A';

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Manage Branches</h1>
                <button onClick={() => openModal()} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm">Add Branch</button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade Area</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {branches.map(branch => (
                            <tr key={branch.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{branch.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{branch.city}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getTradeAreaName(branch.tradeAreaId)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => openModal(branch)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDelete(branch.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && <BranchForm branch={editingBranch} onSave={handleSave} onCancel={closeModal} />}
        </div>
    );
};

export default AdminBranches;
