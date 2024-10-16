import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    label?: string;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
                                           onClick,
                                           label,
                                           type = 'button',
                                           className = '',
                                           disabled = false,
                                       }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`mt-2 px-4 py-2 rounded-lg ${className}`}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
