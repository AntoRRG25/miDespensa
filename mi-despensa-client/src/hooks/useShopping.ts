import { usePantryContext } from '../context/PantryContext';
import * as api from '../api/shopping.api';
import type { CreateShoppingItemDto, UpdateShoppingItemDto } from '../types/shopping.types';

export const useShopping = () => {
    const { shoppingItems, setShoppingItems, setLoading, setError, loading, error } = usePantryContext();

    const refreshShoppingList = async () => {
        setLoading(true);
        try {
            const data = await api.getShoppingItems();
            setShoppingItems(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar la lista de compras');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (item: CreateShoppingItemDto) => {
        try {
            const newItem = await api.createShoppingItem(item);
            setShoppingItems([...shoppingItems, newItem]);
            return newItem;
        } catch (err) {
            setError('Error al agregar ítem');
            throw err;
        }
    };

    const updateItem = async (id: number, updates: UpdateShoppingItemDto) => {
        try {
            const updated = await api.updateShoppingItems(id, updates);
            setShoppingItems(shoppingItems.map(i => i.id === id ? updated : i));
            return updated;
        } catch (err) {
            setError('Error al actualizar ítem');
            throw err;
        }
    };

    const toggleComplete = async (id: number, currentStatus: boolean) => {
         try {
            const updated = await api.updateShoppingItem(id, { checked: !currentStatus });
            setShoppingItems(shoppingItems.map(i => i.id === id ? updated : i));
            return updated;
        } catch (err) {
            setError('Error al actualizar ítem');
            throw err;
        }
    };

    const removeItem = async (id: number) => {
        try {
            await api.deleteShoppingItem(id);
            setShoppingItems(shoppingItems.filter(i => i.id !== id));
        } catch (err) {
            setError('Error al eliminar ítem');
            throw err;
        }
    };

    return {
        shoppingItems,
        loading,
        error,
        refreshShoppingList,
        addItem,
        updateItem,
        toggleComplete,
        removeItem,
    };
};
