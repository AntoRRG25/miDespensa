import { usePantryContext } from '../context/PantryContext';
import * as api from '../api/pantry.api';
import type { CreatePantryProductDto, UpdatePantryProductDto } from '../types/pantry.types';

export const usePantry = () => {
    const { products, setProducts, setLoading, setError, loading, error } = usePantryContext();

    const refreshProducts = async () => {
        setLoading(true);
        try {
            const data = await api.getPantryProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar la despensa');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (product: CreatePantryProductDto) => {
        try {
            const newProduct = await api.createPantryProduct(product);
            setProducts([...products, newProduct]);
            return newProduct;
        } catch (err) {
            setError('Error al crear producto');
            throw err;
        }
    };

    const updateProduct = async (id: number, updates: UpdatePantryProductDto) => {
        try {
            console.log('Updating product', id, updates);
            const updated = await api.updatePantryProduct(id, updates);
            setProducts(products.map(p => p.id === id ? updated : p));
            return updated;
        } catch (err) {
            setError('Error al actualizar producto');
            throw err;
        }
    };

    const removeProduct = async (id: number) => {
        try {
            await api.deletePantryProduct(id);
            setProducts(products.filter(p => p.id !== id));
        } catch (err) {
            setError('Error al eliminar producto');
            throw err;
        }
    };

    return {
        products,
        loading,
        error,
        refreshProducts,
        addProduct,
        updateProduct,
        removeProduct,
    };
};
