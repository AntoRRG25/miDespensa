import React from 'react';
import { isExpired, isExpiringSoon, getDaysUntil } from '../../utils/dates';
import { Badge } from '../common/Badge';

interface ExpiringBadgeProps {
    date?: string;
}

export const ExpiringBadge: React.FC<ExpiringBadgeProps> = ({ date }) => {
    if (!date) return null;

    if (isExpired(date)) {
        return <Badge label="Vencido" variant="danger" />;
    }

    if (isExpiringSoon(date)) {
        const days = getDaysUntil(date);
        const label = days === 0 ? 'Vence hoy' : `Vence en ${days} días`;
        return <Badge label={label} variant="warning" />;
    }

    return null;
};
