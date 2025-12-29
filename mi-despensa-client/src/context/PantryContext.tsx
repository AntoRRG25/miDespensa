import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { PantryProduct } from '../types/pantry.types';
import type { ShoppingItem } from '../types/shopping.types';
import type { Category } from '../types/category.types';

interface PantryState {
    products: PantryProduct[];
    shoppingItems: ShoppingItem[];
    categories: Category[];
    loading: boolean;
    error: string | null;
}

interface PantryContextType extends PantryState {
    setProducts: (products: PantryProduct[]) => void;
    setShoppingItems: (items: ShoppingItem[]) => void;
    setCategories: (categories: Category[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export const PantryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<PantryProduct[]>([]);
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const value = {
        products,
        shoppingItems,
        categories,
        loading,
        error,
        setProducts,
        setShoppingItems,
        setCategories,
        setLoading,
        setError,
    };

    return (
        <PantryContext.Provider value={value}>
            {children}
        </PantryContext.Provider>
    );
};

export const usePantryContext = () => {
    const context = useContext(PantryContext);
    if (!context) {
        throw new Error('usePantryContext must be used within a PantryProvider');
    }
    return context;
};
