import React, { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';

interface AdminLayoutProps {
    children: ReactNode;
}

const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Users', path: '/admin/users' },
];

const catalogNavItems = [
    { name: 'Product Management', path: '/admin/products' },
    { name: 'Inventory', path: '/admin/inventory' },
    { name: 'Categories', path: '/admin/categories' },
]

const marketingNavItems = [
    { name: 'Promotions', path: '/admin/promotions' },
    { name: 'SEO Management', path: '/admin/seo'},
]

const operationalNavItems = [
    { name: 'Trade Areas', path: '/admin/trade-areas' },
    { name: 'Branches', path: '/admin/branches' },
]

const reportsNavItems = [
    { name: 'Reports', path: '/admin/reports' },
]

const settingsNavItems = [
     { name: 'Filter Settings', path: '/admin/filter-settings' },
]

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const { logout } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const renderNavLinks = (items: {name: string, path: string}[]) => items.map(item => (
        <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
                `block py-2.5 px-4 rounded-md mx-2 transition duration-200 hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`
            }
        >
            {item.name}
        </NavLink>
    ));

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="h-20 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
                    Admin Panel
                </div>
                <nav className="flex-grow overflow-y-auto py-4 space-y-4">
                    <div>
                        {renderNavLinks(navItems)}
                    </div>

                    <div>
                        <div className="px-4 mt-4 mb-2 text-xs uppercase text-gray-400 tracking-wider">Catalog</div>
                        {renderNavLinks(catalogNavItems)}
                    </div>
                    
                    <div>
                        <div className="px-4 mt-4 mb-2 text-xs uppercase text-gray-400 tracking-wider">Marketing</div>
                        {renderNavLinks(marketingNavItems)}
                    </div>

                    <div>
                        <div className="px-4 mt-4 mb-2 text-xs uppercase text-gray-400 tracking-wider">Operations</div>
                        {renderNavLinks(operationalNavItems)}
                    </div>

                    <div>
                        <div className="px-4 mt-4 mb-2 text-xs uppercase text-gray-400 tracking-wider">Analytics</div>
                        {renderNavLinks(reportsNavItems)}
                    </div>

                    <div>
                        <div className="px-4 mt-4 mb-2 text-xs uppercase text-gray-400 tracking-wider">Settings</div>
                        {renderNavLinks(settingsNavItems)}
                    </div>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button 
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </aside>
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 bg-white shadow-md flex items-center px-6 justify-between">
                   <h1 className="text-xl font-semibold text-gray-700">LuxeThread Admin</h1>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;