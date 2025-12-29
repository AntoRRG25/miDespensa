import React, { useState } from 'react';
import { usePantry } from '../../hooks/usePantry';
import { PantryItem } from './PantryItem';
import { PantryForm } from './PantryForm';
import { Button } from '../common/Button';
import { Loader } from '../common/Loader';
import { EmptyState } from '../common/EmptyState';
import type { PantryProduct } from '../../types/pantry.types';

export const PantryList: React.FC = () => {
    const { products, loading, refreshProducts } = usePantry();
  
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState<PantryProduct | null>(null);

    // Initial load handled by hook or page? 
    // Let's rely on page or context/hook to init, but we can also useEffect here if needed.
    // The hook implies manual refresh logic, but we might want auto-load.
    // For now let's assume the user calls refresh elsewhere or we add it here.
    React.useEffect(() => {
        refreshProducts();
    }, []);

    const handleCreate = () => {
        setEditingProduct(null);
        setIsEditing(true);
    };

    const handleEdit = (product: PantryProduct) => {
        setEditingProduct(product);
        setIsEditing(true);
    };

    if (loading && products.length === 0) return <Loader />;

    if (isEditing) {
        return (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <PantryForm
                    initialData={editingProduct}
                    onClose={() => setIsEditing(false)}
                />
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>Mi Despensa</h2>
                <Button onClick={handleCreate}>+ Agregar</Button>
            </div>

            {products.length === 0 ? (
                <EmptyState
                    message="No tienes productos en tu despensa."
                    actionLabel="Agregar Producto"
                    onAction={handleCreate}
                />
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {products.map(product => (
                        <PantryItem key={product.id} product={product} onEdit={handleEdit} />
                    ))}
                </div>
            )}
        </div>
    );
};
