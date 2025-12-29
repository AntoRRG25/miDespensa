import React, { type ButtonHTMLAttributes } from 'react';
import '../../styles/components.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
    return (
        <button className={`btn btn-${variant} ${className}`} {...props} />
    );
};
