import React, { useState } from 'react';

interface InputProps {
    label?: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    labelClassName?: string;
    inputClassName?: string;
    required?: boolean;
    name?: string;
    useBottomBorderOnly?: boolean;
}

const Input: React.FC<InputProps> = ({
                                         label,
                                         type = 'text',
                                         value,
                                         onChange,
                                         placeholder,
                                         className = '',
                                         labelClassName = '',
                                         inputClassName = '',
                                         required = false,
                                         name,
                                         useBottomBorderOnly = false,
                                     }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const getInputClassName = () => {
        if (useBottomBorderOnly) {
            return `
                w-full px-3 py-2 text-gray-700
                border-b 
                ${isFocused ? 'border-indigo-500' : 'border-gray-300'}
                focus:outline-none focus:border-indigo-500
                transition-colors bg-transparent
                ${inputClassName}
            `;
        } else {
            return `
                border border-gray-300
                ${inputClassName}
                w-full px-4 py-3 transition duration-300 ease-in-out
            `;
        }
    };

    return (
        <div className={`input-container ${className}`}>
            {label && (
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required={required}
                name={name}
                className={getInputClassName()}
            />
        </div>
    );
};

export default Input;
