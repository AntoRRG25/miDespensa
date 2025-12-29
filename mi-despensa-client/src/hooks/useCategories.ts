import { useEffect } from 'react';
import { usePantryContext } from '../context/PantryContext';
import * as api from '../api/category.api';

export const useCategories = () => {
    const { categories, setCategories, setError } = usePantryContext();

    const fetchCategories = async () => {
        try {
            // Don't set global loading here to avoid full page spinners for background fetches if desired,
            // but for MVP simple global loading is fine or we could have local loading.
            // We'll use local try-catch but maybe not trigger global loading if we want to be subtle.
            const data = await api.getCategories();
            setCategories(data);
        } catch (err) {
            setError('Error al cargar categorías');
            console.error(err);
        }
    };

    // Initial fetch
    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories();
        }
    }, []);

    return {
        categories,
        refreshCategories: fetchCategories,
    };
};
