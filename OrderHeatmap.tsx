import React, { useMemo } from 'react';
import { Order } from '../../types';

interface OrderHeatmapProps {
    orders: Order[];
}

const OrderHeatmap: React.FC<OrderHeatmapProps> = ({ orders }) => {
    const cityOrderData = useMemo(() => {
        const cityMap: { [key: string]: { count: number; totalValue: number } } = {};
        
        orders.forEach(order => {
            const city = order.shippingAddress.city;
            if (!cityMap[city]) {
                cityMap[city] = { count: 0, totalValue: 0 };
            }
            cityMap[city].count += 1;
            cityMap[city].totalValue += order.total;
        });

        return Object.entries(cityMap)
            .map(([city, data]) => ({ city, ...data }))
            .sort((a, b) => b.count - a.count);
    }, [orders]);

    const maxOrders = useMemo(() => {
        return Math.max(...cityOrderData.map(c => c.count), 0);
    }, [cityOrderData]);

    const getColor = (count: number) => {
        if (maxOrders === 0) return 'bg-red-100';
        const intensity = Math.round((count / maxOrders) * 4) + 1; // Scale from 1 to 5
        return `bg-red-${intensity * 100 + 100}`; // bg-red-200 to bg-red-600
    };

    if (cityOrderData.length === 0) {
        return <p className="text-gray-500">No order data available to generate a heatmap.</p>
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Orders</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heat</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {cityOrderData.map(({ city, count, totalValue }) => (
                        <tr key={city}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{city}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{count}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${totalValue.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className={`h-6 w-24 rounded ${getColor(count)}`}></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHeatmap;