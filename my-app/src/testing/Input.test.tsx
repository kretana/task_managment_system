import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Input from "../components/common/Input";

const renderInput = (props = {}) => {
    const defaultProps = {
        label: 'Test Label',
        value: '',
        onChange: jest.fn(),
        placeholder: 'Enter text...',
        required: false,
        useBottomBorderOnly: false,
        error: '',
        ...props,
    };
    return render(<Input {...defaultProps} />);
};

describe('Input Component', () => {

    it('should render the input with a label', () => {
        renderInput();

        const labelElement = screen.getByText('Test Label');
        const inputElement = screen.getByPlaceholderText('Enter text...');

        expect(labelElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
    });


    it('should show an error message if error prop is passed', () => {
        renderInput({ error: 'Required field' });

        const errorMessage = screen.getByText('Required field');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveClass('text-red-500');
    });


    it('should apply bottom border style when useBottomBorderOnly is true', () => {
        renderInput({ useBottomBorderOnly: true });

        const inputElement = screen.getByPlaceholderText('Enter text...');
        expect(inputElement).toHaveClass('border-b');
    });


});
