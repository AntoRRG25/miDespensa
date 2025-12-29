import React, { useState, useEffect } from 'react';
import { useShopping } from '../../hooks/useShopping';
import { ShoppingItemComponent } from './ShoppingItem';
import { ShoppingForm } from './ShoppingForm';
import { Button } from '../common/Button';
import { Loader } from '../common/Loader';
import { EmptyState } from '../common/EmptyState';
import type { ShoppingItem } from '../../types/shopping.types';

export const ShoppingList: React.FC = () => {
    const { shoppingItems, loading, refreshShoppingList } = useShopping();
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

    useEffect(() => {
        refreshShoppingList();
    }, []);

    const handleCreate = () => {
        setEditingItem(null);
        setIsEditing(true);
    };

    const handleEdit = (item: ShoppingItem) => {
        setEditingItem(item);
        setIsEditing(true);
    };

    if (loading && shoppingItems.length === 0) return <Loader />;

    if (isEditing) {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <ShoppingForm
                    initialData={editingItem}
                    onClose={() => setIsEditing(false)}
                />
            </div>
        );
    }

    const pendingItems = shoppingItems.filter(i => !i.checked);
    const completedItems = shoppingItems.filter(i => i.checked);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>Lista de Compras</h2>
                <Button onClick={handleCreate}>+ Agregar</Button>
            </div>

            {shoppingItems.length === 0 ? (
                <EmptyState
                    message="Tu lista de compras está vacía."
                    actionLabel="Agregar Ítem"
                    onAction={handleCreate}
                />
            ) : (
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {pendingItems.map(item => (
                        <ShoppingItemComponent key={item.id} item={item} onEdit={handleEdit} />
                    ))}

                    {completedItems.length > 0 && (
                        <>
                            <h4 style={{ marginTop: '1rem', color: 'var(--text-light)' }}>Completados</h4>
                            {completedItems.map(item => (
                                <ShoppingItemComponent key={item.id} item={item} onEdit={handleEdit} />
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
