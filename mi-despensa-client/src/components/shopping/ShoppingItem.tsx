import React from 'react';
import type { ShoppingItem } from '../../types/shopping.types';
import { useShopping } from '../../hooks/useShopping';
import { Button } from '../common/Button';
import '../../styles/components.css';

interface ShoppingItemProps {
    item: ShoppingItem;
    onEdit: (item: ShoppingItem) => void;
}

export const ShoppingItemComponent: React.FC<ShoppingItemProps> = ({ item, onEdit }) => {
    const { toggleComplete, removeItem } = useShopping();

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('¿Eliminar de la lista?')) {
            removeItem(item.id);
        }
    };

    const handleToggle = () => {
        toggleComplete(item.id, item.checked);
    };

    return (
        <div
            className="card"
            style={{
                marginBottom: '0.5rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                opacity: item.checked ? 0.6 : 1,
                textDecoration: item.checked ? 'line-through' : 'none'
            }}
        >
            <input
                type="checkbox"
                checked={item.checked}
                onChange={handleToggle}
                style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
            />

            <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => onEdit(item)}>
                <div style={{ fontWeight: 500 }}>{item.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    {item.quantity}
                </div>
            </div>

            <Button variant="danger" onClick={handleDelete} style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                ✕
            </Button>
        </div>
    );
};
