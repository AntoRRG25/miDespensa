import React, { useState, useEffect } from 'react';
import { useShopping } from '../../hooks/useShopping';
import type { ShoppingItem, CreateShoppingItemDto } from '../../types/shopping.types';
import { Button } from '../common/Button';

interface ShoppingFormProps {
    initialData?: ShoppingItem | null;
    onClose: () => void;
}

export const ShoppingForm: React.FC<ShoppingFormProps> = ({ initialData, onClose }) => {
    const { addItem, updateItem } = useShopping();

    const [formData, setFormData] = useState<CreateShoppingItemDto>({
        name: '',
        quantity: 1,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                quantity: initialData.quantity,
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (initialData) {
                await updateItem(initialData.id, formData);
            } else {
                await addItem(formData);
            }
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    const inputStyle = {
        display: 'block',
        width: '100%',
        padding: '0.5rem',
        marginBottom: '1rem',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '1rem'
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <h3 style={{ marginBottom: '1rem' }}>{initialData ? 'Editar Ítem' : 'Nuevo Ítem'}</h3>

            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Nombre</label>
            <input
                style={inputStyle}
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
            />

            <div>
                <label style={{ display: 'block', marginBottom: '0.25rem' }}>Cantidad</label>
                <input
                    style={inputStyle}
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    required
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="submit" style={{ flex: 1 }}>Guardar</Button>
                <Button type="button" variant="secondary" onClick={onClose} style={{ flex: 1 }}>Cancelar</Button>
            </div>
        </form>
    );
};
