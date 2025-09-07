import React, { useState, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductListPage: React.FC = () => {
  const { category: categoryName } = useParams<{ category: string }>();
  const { products, filterSettings } = useAppContext();
  const query = useQuery();
  const searchQuery = query.get('search') || '';

  const categoryProducts = useMemo(() => {
    return products.filter(p => 
      (categoryName === 'all' || p.category.toLowerCase() === categoryName?.toLowerCase())
    );
  }, [products, categoryName]);
  
  const maxPrice = useMemo(() => {
    return categoryProducts.length ? Math.ceil(Math.max(...categoryProducts.map(p => p.price))) : 1000;
  }, [categoryProducts]);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: maxPrice });
  
  React.useEffect(() => {
      setPriceRange({min:0, max:maxPrice});
  }, [maxPrice]);


  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = !filterSettings.price || product.price <= priceRange.max;
      const matchesSize = !filterSettings.size || selectedSizes.length === 0 || product.sizes.some(s => selectedSizes.includes(s));
      const matchesColor = !filterSettings.color || selectedColors.length === 0 || product.colors.some(c => selectedColors.includes(c));
      return matchesSearch && matchesPrice && matchesSize && matchesColor;
    });
  }, [categoryProducts, searchQuery, priceRange, selectedSizes, selectedColors, filterSettings]);
  
  const allSizes = useMemo(() => [...new Set(categoryProducts.flatMap(p => p.sizes))], [categoryProducts]);
  const allColors = useMemo(() => [...new Set(categoryProducts.flatMap(p => p.colors))], [categoryProducts]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <Filters
        sizes={allSizes}
        colors={allColors}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        maxPrice={maxPrice}
        settings={filterSettings}
      />
      <div className="flex-1">
        <h1 className="text-3xl font-bold capitalize mb-6">{searchQuery ? `Searching for "${searchQuery}"` : `${categoryName} Collection`}</h1>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">No Products Found</h2>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
