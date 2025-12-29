export const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
};

export const getDaysUntil = (dateString: string): number => {
    if (!dateString) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateString);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isExpiringSoon = (dateString: string, daysThreshold = 3): boolean => {
    const days = getDaysUntil(dateString);
    return days >= 0 && days <= daysThreshold;
};

export const isExpired = (dateString: string): boolean => {
    return getDaysUntil(dateString) < 0;
};
