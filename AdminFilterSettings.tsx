import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { FilterSettings } from '../../types';

const ToggleSwitch: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void; }> = ({ label, enabled, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b">
        <span className="text-gray-700 font-medium">{label}</span>
        <button
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);


const AdminFilterSettings: React.FC = () => {
    const { filterSettings, updateFilterSettings } = useAppContext();
    const [currentSettings, setCurrentSettings] = useState<FilterSettings>(filterSettings);

    const handleSettingChange = (key: keyof FilterSettings, value: boolean) => {
        setCurrentSettings(prev => ({ ...prev, [key]: value }));
    };
    
    const handleSaveChanges = () => {
        updateFilterSettings(currentSettings);
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Filter Settings</h1>
            <div className="bg-white shadow-md rounded-lg max-w-2xl">
                <div className="p-6">
                     <h2 className="text-lg font-semibold text-gray-800">Storefront Product Filters</h2>
                     <p className="text-sm text-gray-500 mt-1">Enable or disable the filters that customers can use to find products.</p>
                </div>
                <div className="px-6">
                    <ToggleSwitch 
                        label="Price Range Filter" 
                        enabled={currentSettings.price} 
                        onChange={(val) => handleSettingChange('price', val)} 
                    />
                    <ToggleSwitch 
                        label="Color Filter" 
                        enabled={currentSettings.color} 
                        onChange={(val) => handleSettingChange('color', val)} 
                    />
                    <ToggleSwitch 
                        label="Size Filter" 
                        enabled={currentSettings.size} 
                        onChange={(val) => handleSettingChange('size', val)} 
                    />
                </div>
                 <div className="bg-gray-50 p-6 flex justify-end">
                     <button 
                        onClick={handleSaveChanges} 
                        className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 shadow-sm"
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminFilterSettings;
