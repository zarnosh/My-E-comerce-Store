
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard: React.FC = () => {
    const { orders, products, users } = useAppContext();

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalCustomers = users.filter(u => u.role === 'customer').length;
    const lowStockProducts = products.filter(p => p.stock < 10).length;

    const salesData = orders.map(order => ({
        name: new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        sales: order.total,
    })).reverse();

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500">Total Revenue</h3>
                    <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500">Total Orders</h3>
                    <p className="text-3xl font-bold">{totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500">Total Customers</h3>
                    <p className="text-3xl font-bold">{totalCustomers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500">Low Stock Alerts</h3>
                    <p className="text-3xl font-bold text-red-500">{lowStockProducts}</p>
                </div>
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminDashboard;
