import React, { useState } from 'react';
import { PRODUCT_CATEGORIES } from '../constants';
import { Product, SelectedProductInfo } from '../types';

interface ProductSelectorProps {
    selectedProducts: SelectedProductInfo[];
    customProducts: Product[];
    onProductToggle: (info: SelectedProductInfo) => void;
    onAddCustomClick: (category: string, subCategory: string) => void;
}

const CheckmarkIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
    </svg>
);

const AddIcon = () => (
    <svg className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProducts, customProducts, onProductToggle, onAddCustomClick }) => {
    const [activeCategory, setActiveCategory] = useState(Object.keys(PRODUCT_CATEGORIES)[0]);

    const isSelected = (product: Product) => {
        return selectedProducts.some(p => p.product.name === product.name);
    };

    const renderProductItem = (product: Product, subCategory: string, category: string) => {
        const selected = isSelected(product);

        const handleSelect = () => {
            onProductToggle({ product, category, subCategory });
        };
        
        return (
            <div key={product.name} onClick={handleSelect} className="flex flex-col items-center cursor-pointer group" title={product.name}>
                <div className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-md border-2 overflow-hidden ${selected ? 'border-[var(--color-accent)]' : 'border-transparent'}`}>
                    {product.type === 'color' && (
                        <div className="w-full h-full rounded-full" style={{ backgroundColor: product.value }}></div>
                    )}
                    {(product.type === 'style' || (product.type === 'image' && !product.imageUrl)) && (
                       <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-center p-1">
                          <span className="text-gray-600 text-[10px] font-bold leading-tight">{product.name}</span>
                       </div>
                    )}
                    {product.type === 'image' && product.imageUrl && (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover"/>
                    )}
                    {selected && (
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                            <CheckmarkIcon />
                        </div>
                    )}
                </div>
                <p className={`mt-2 text-xs font-medium text-center transition-colors duration-300 truncate w-16 ${selected ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]'}`}>{product.name}</p>
            </div>
        );
    };

    return (
        <div className="w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-4">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                {Object.entries(PRODUCT_CATEGORIES).map(([key, category]) => (
                    <button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`flex-1 flex items-center justify-center p-3 text-sm font-semibold transition-colors duration-300 focus:outline-none ${activeCategory === key ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                    >
                        <category.icon className="w-5 h-5 mr-2" />
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="mt-4 space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {Object.entries(PRODUCT_CATEGORIES[activeCategory].items).map(([subCategory, products]) => {
                    const relevantCustomProducts = customProducts.filter(p => 
                        (p as any).category === PRODUCT_CATEGORIES[activeCategory].name && 
                        (p as any).subCategory === subCategory
                    );

                    return (
                        <div key={subCategory}>
                            <h4 className="text-md font-bold text-[var(--color-header)] mb-3">{subCategory}</h4>
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                                {products.map(p => renderProductItem(p, subCategory, PRODUCT_CATEGORIES[activeCategory].name))}
                                {relevantCustomProducts.map(p => renderProductItem(p, subCategory, PRODUCT_CATEGORIES[activeCategory].name))}
                                <div onClick={() => onAddCustomClick(PRODUCT_CATEGORIES[activeCategory].name, subCategory)} className="flex flex-col items-center cursor-pointer group" title="Add your own">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600">
                                        <AddIcon />
                                    </div>
                                    <p className="mt-2 text-xs font-medium text-center text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]">Add your own</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductSelector;
