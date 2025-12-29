import React from 'react';
import '../../styles/components.css';

interface BadgeProps {
    label: string;
    variant?: 'success' | 'warning' | 'danger';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'success' }) => {
    return (
        <span className={`badge badge-${variant}`}>
            {label}
        </span>
    );
};
