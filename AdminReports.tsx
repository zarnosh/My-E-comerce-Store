import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import OrderHeatmap from './OrderHeatmap';

const AdminReports: React.FC = () => {
    const { orders } = useAppContext();
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Reports & Analytics</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500">Total Orders</h3>
                    <p className="text-3xl font-bold">{orders.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500">Total Revenue</h3>
                    <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-500">Average Order Value</h3>
                    <p className="text-3xl font-bold">${(totalRevenue / (orders.length || 1)).toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Heatmap by City</h2>
                <p className="text-sm text-gray-500 mb-4">
                    This report shows the concentration of orders across different cities, helping you identify your hottest markets.
                </p>
                <OrderHeatmap orders={orders} />
            </div>

            {/* Future reports can be added here */}
        </div>
    );
};

export default AdminReports;