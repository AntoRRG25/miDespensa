import React, { useState, useEffect } from 'react';
import { usePantry } from '../../hooks/usePantry';
import { useCategories } from '../../hooks/useCategories';
import type { PantryProduct, CreatePantryProductDto } from '../../types/pantry.types';
import { Button } from '../common/Button';

interface PantryFormProps {
    initialData?: PantryProduct | null;
    onClose: () => void;
}

export const PantryForm: React.FC<PantryFormProps> = ({ initialData, onClose }) => {
    const { addProduct, updateProduct } = usePantry();
    const { categories } = useCategories();

    const [formData, setFormData] = useState<CreatePantryProductDto>({
        name: '',
        quantity: 1,
        categoryId: 0,
        expiresAt: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                quantity: initialData.quantity,
                categoryId: initialData.categoryId,
                expiresAt: initialData.expiresAt ? initialData.expiresAt.split('T')[0] : ''
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (initialData) {
                await updateProduct(initialData.id, formData);
            } else {
                await addProduct(formData);
            }
            onClose();
        } catch (error) {
            console.error(error);
            // Error handling is managed by context/hook globally for now
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
            <h3 style={{ marginBottom: '1rem' }}>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h3>

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

            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Categoría</label>
            <select
                style={inputStyle}
                value={formData.categoryId}
                onChange={e => setFormData({ ...formData, categoryId: Number(e.target.value) })}
                required
            >
                <option value="">Seleccionar...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.icon ||c.name}</option>)}
            </select>

            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Vencimiento (Opcional)</label>
            <input
                style={inputStyle}
                type="date"
                value={formData.expiresAt}
                onChange={e => setFormData({ ...formData, expiresAt: e.target.value })}
            />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="submit" style={{ flex: 1 }}>Guardar</Button>
                <Button type="button" variant="secondary" onClick={onClose} style={{ flex: 1 }}>Cancelar</Button>
            </div>
        </form>
    );
};
