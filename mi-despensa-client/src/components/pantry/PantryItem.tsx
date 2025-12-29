import React from 'react';
import type { PantryProduct } from '../../types/pantry.types';
import { usePantry } from '../../hooks/usePantry';
import { useCategories } from '../../hooks/useCategories';
import { formatDate } from '../../utils/dates';
import { Button } from '../common/Button';
import { ExpiringBadge } from './ExpiringBadge';
import '../../styles/components.css';

interface PantryItemProps {
    product: PantryProduct;
    onEdit: (product: PantryProduct) => void;
}

export const PantryItem: React.FC<PantryItemProps> = ({ product, onEdit }) => {
    const { removeProduct } = usePantry();
      const { categories } = useCategories();

    const handleDelete = () => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            removeProduct(product.id);
        }
    };
    const category = categories.find(c => c.id === product.categoryId);
    const customCategoryColor = category ? category.color : 'var(--text-light)';
    console.log('Product categoryId:', product.categoryId);
    console.log('Category for product', product.name, ':', category?.color);
    return (
        <div className="card" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' , backgroundColor:`${customCategoryColor}`}}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem'}}>
                    <p>{category?.icon}</p>
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{product.name}</h3>
                    <ExpiringBadge date={product.expiresAt ?? undefined} />
                </div>
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                    <span>{product.quantity}</span>
                    {product.expiresAt && (
                        <span style={{ marginLeft: '1rem' }}>Vence: {formatDate(product.expiresAt)}</span>
                    )}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="secondary" onClick={() => onEdit(product)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                    Editar
                </Button>
                <Button variant="danger" onClick={handleDelete} style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                    ✕
                </Button>
            </div>
        </div>
    );
};
