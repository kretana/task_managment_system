import React from 'react';

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
}

const Input: React.FC<InputProps> = ({
                                         label,
                                         type = 'text',
                                         value,
                                         onChange,
                                         placeholder,
                                         className = '', // Container class
                                         labelClassName = '', // Label class
                                         inputClassName = '', // Input class
                                         required = false,
                                     }) => {
    return (
        <div className={`input-container ${className}`}>
            {label && (
                <label className={`block mb-1 font-medium text-gray-700 ${labelClassName}`}>
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 transition duration-300 ease-in-out hover:shadow-md ${inputClassName}`}
            />
        </div>
    );
};

export default Input;
