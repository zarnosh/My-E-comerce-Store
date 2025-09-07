
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Order } from '../types';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Delivered': return 'bg-green-100 text-green-800';
        case 'Shipped': return 'bg-blue-100 text-blue-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const OrderHistoryPage: React.FC = () => {
    const { orders, currentUser } = useAppContext();

    const userOrders = orders.filter(order => order.userId === currentUser?.id);

    if (userOrders.length === 0) {
        return <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">My Orders</h1>
            <p className="text-gray-600">You haven't placed any orders yet.</p>
        </div>;
    }
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>
            <div className="space-y-8">
                {userOrders.map((order: Order) => (
                    <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Order Placed</p>
                                <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="font-medium">${order.total.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Order ID</p>
                                <p className="font-medium text-gray-600 text-xs">#{order.id}</p>
                            </div>
                             <div className="text-right">
                                <p className="text-sm text-gray-500">Status</p>
                                <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-start mb-4">
                                    {/* In a real app, you would fetch the product image */}
                                    {/* <img src="" alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4"/> */}
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity} | Size: {item.size} | Color: {item.color}</p>
                                        <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
