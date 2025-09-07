
import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Order, OrderStatus } from '../../types';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const AdminOrders: React.FC = () => {
    const { orders, updateOrderStatus, users } = useAppContext();
    const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

    const handleStatusChange = (orderId: string, status: OrderStatus) => {
        updateOrderStatus(orderId, status);
    };
    
    const getUserEmail = (userId: string) => {
        return users.find(u => u.id === userId)?.email || 'Unknown User';
    };
    
    const OrderDetailsModal: React.FC<{ order: Order; onClose: () => void; }> = ({ order, onClose }) => {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl">
                    <h2 className="text-2xl font-bold mb-4">Order Details #{order.id}</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <p><strong>Customer:</strong> {getUserEmail(order.userId)}</p>
                        <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold">Shipping Address</h3>
                        <p>{order.shippingAddress.name}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                    </div>
                    <h3 className="font-semibold mb-2">Items</h3>
                    <div className="border rounded-lg max-h-64 overflow-y-auto">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between p-2 border-b">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-6">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Close</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Manage Orders</h1>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getUserEmail(order.userId)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                        className={`text-sm font-semibold px-2.5 py-1 rounded-full border-0 focus:ring-0 ${getStatusColor(order.status)}`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => setViewingOrder(order)} className="text-indigo-600 hover:text-indigo-900">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {viewingOrder && <OrderDetailsModal order={viewingOrder} onClose={() => setViewingOrder(null)} />}
        </div>
    );
};

export default AdminOrders;
