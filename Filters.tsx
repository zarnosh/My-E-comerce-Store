import React from 'react';
import { FilterSettings } from '../types';

interface FiltersProps {
  sizes: string[];
  colors: string[];
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  maxPrice: number;
  settings: FilterSettings;
}

const Filters: React.FC<FiltersProps> = ({ 
  sizes, 
  colors,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  priceRange,
  setPriceRange,
  maxPrice,
  settings
}) => {

  const handleSizeChange = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSizes);
  };
  
  const handleColorChange = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    setSelectedColors(newColors);
  };

  const hasActiveFilters = settings.price || settings.color || settings.size;

  return (
    <aside className="w-full lg:w-64 xl:w-72 p-4 space-y-6">
      <h2 className="text-xl font-semibold">Filters</h2>
      
      {!hasActiveFilters && (
        <p className="text-sm text-gray-500">No filters are currently active.</p>
      )}

      {/* Price Filter */}
      {settings.price && (
        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <input 
            type="range" 
            min="0" 
            max={maxPrice} 
            value={priceRange.max}
            onChange={e => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm mt-1">
            <span>$0</span>
            <span>${priceRange.max}</span>
          </div>
        </div>
      )}
      
      {/* Color Filter */}
      {settings.color && (
        <div>
          <h3 className="font-medium mb-2">Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <button 
                key={color} 
                onClick={() => handleColorChange(color)}
                className={`px-3 py-1 text-sm border rounded-full transition-colors ${selectedColors.includes(color) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Size Filter */}
      {settings.size && (
        <div>
          <h3 className="font-medium mb-2">Size</h3>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map(size => (
              <button 
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`p-2 border rounded-md text-center text-sm transition-colors ${selectedSizes.includes(size) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      
    </aside>
  );
};

export default Filters;
