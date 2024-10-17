import React, { useState, useImperativeHandle, forwardRef } from "react";
import Input from "../common/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown'
import {options} from "../../config/const";
import 'react-dropdown/style.css';

interface TaskFormProps {
    taskData: {
        name: string;
        title: string;
        description: string;
        createdAt: Date | null;
        completedAt: Date | null;
        estimation: string;
        comment: string;
        status:string;
    };
    setTaskData: (field: string, value: any) => void;
}

interface ValidationErrors {
    name: string;
    title: string;
    description: string;
    createdAt: string;
    completedAt: string;
}

export interface TaskFormRef {
    validateForm: () => boolean;
}

const TaskForm = forwardRef<TaskFormRef, TaskFormProps>(({ taskData, setTaskData }, ref) => {
    const [errors, setErrors] = useState<ValidationErrors>({
        name: '',
        title: '',
        description: '',
        createdAt: '',
        completedAt: '',
    });

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {
            name: '',
            title: '',
            description: '',
            createdAt: '',
            completedAt: '',
        };

        if (!taskData.name.trim()) newErrors.name = 'Name is required';
        if (!taskData.title.trim()) newErrors.title = 'Title is required';
        if (!taskData.description.trim()) newErrors.description = 'Description is required';
        if (!taskData.createdAt) newErrors.createdAt = 'Created Date is required';
        if (!taskData.completedAt) newErrors.completedAt = 'Completed Date is required';

        setErrors(newErrors);

        return Object.values(newErrors).every(error => error === '');
    };

    useImperativeHandle(ref, () => ({
        validateForm
    }));

    return (
        <div>
            <Input
                type="text"
                label="Name"
                name="name"
                placeholder="Assign task to someone"
                onChange={(e) => setTaskData('name', e.target.value)}
                value={taskData.name}
                required
                error={errors.name}
                className="mb-4"
            />

            <Input
                label="Title"
                name="title"
                placeholder="Enter task title"
                onChange={(e) => setTaskData('title', e.target.value)}
                value={taskData.title}
                required
                error={errors.title}
            />

            <textarea
                name="description"
                onChange={(e) => setTaskData('description', e.target.value)}
                placeholder="Enter task description"
                rows={4}
                value={taskData.description}
                className={`w-full p-4 mt-4 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none mb-4 ${errors.description ? 'border-red-500' : ''}`}
                required
            />
            {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description}</p>}

            <Dropdown
                placeholder="Select an option"
                options={options}
                value={taskData?.status}
                onChange={(option) => setTaskData('status',option.value)}
                className="mb-4"
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Created Date</label>
                <DatePicker
                    selected={taskData.createdAt}
                    onChange={(date: Date | null) => setTaskData('createdAt', date)}
                    maxDate={taskData.completedAt || undefined}
                    className={`w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors ${errors.createdAt ? 'border-red-500' : ''}`}
                    dateFormat="MMMM d, yyyy"
                />
                {errors.createdAt && <p className="text-red-500 text-sm mt-1">{errors.createdAt}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Completed Date</label>
                <DatePicker
                    selected={taskData.completedAt}
                    onChange={(date: Date | null) => setTaskData('completedAt', date)}
                    minDate={taskData.createdAt || undefined}
                    className={`w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors ${errors.completedAt ? 'border-red-500' : ''}`}
                    dateFormat="MMMM d, yyyy"
                />
                {errors.completedAt && <p className="text-red-500 text-sm mt-1">{errors.completedAt}</p>}
            </div>

            <div>
                <div>Estimation</div>
                <Input value={taskData.estimation} className="rounded-md py-2 mb-4"  />
            </div>

            <textarea
                name="comment"
                value={taskData.comment}
                onChange={(e) => setTaskData('comment', e.target.value)}
                placeholder="Enter comments..."
                rows={2}
                className="w-full mb-4 p-4 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                <input type="file" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
        </div>
    );
});

export default TaskForm;