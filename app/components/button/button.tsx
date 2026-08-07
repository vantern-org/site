// Vantern's Site
// Copyright(C) 2026 Vantern
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import './button.css';
interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    children?: React.ReactNode;
    [x: string]: any;
}

export const Button: React.FC<ButtonProps> = ({
    onClick,
    disabled = false,
    variant = 'primary',
    children,
    ...rest
}) => {
    if (variant === 'primary') {
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={'buttonPrimary flex flex-row'}
                {...rest}
            >
                {children}
            </button>
        );
    } else if (variant === 'secondary') {
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className='buttonSecondary flex flex-row'
                {...rest}
            >
                {children}
            </button>
        );
    }
};