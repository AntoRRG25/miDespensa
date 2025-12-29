import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
    message: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, actionLabel, onAction }) => {
    return (
        <div style={{
            padding: '3rem 1rem',
            textAlign: 'center',
            color: 'var(--text-light)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
        }}>
            <p>{message}</p>
            {actionLabel && onAction && (
                <Button variant="secondary" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};
