import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { editTaskById, getTaskById } from "../../redux/slices/tasks/authTasks";
import DatePicker from "react-datepicker";
import Input from '../common/Input';
import Button from "../common/Button";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { options } from "../../config/const";

export const EditTask: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask);

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
    const [completedAt, setCompletedAt] = useState<Date | null>(null);
    const [createdAt, setCreatedAt] = useState<Date | null>(null);

    useEffect(() => {
        if (id) {
            dispatch(getTaskById(parseInt(id)));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (selectedTask) {
            setName(selectedTask.name);
            setTitle(selectedTask.title);
            setDescription(selectedTask.description);
            setStatus(selectedTask.status);
            setUpdatedAt(selectedTask.updatedAt);
            setCompletedAt(selectedTask.completedAt);
            setCreatedAt(selectedTask.createdAt);
        }
    }, [selectedTask]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.target.value);
    };

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleDateChange = (date: Date | null, field: 'updatedAt' | 'completedAt' | 'createdAt') => {
        if (field === 'updatedAt') setUpdatedAt(date);
        if (field === 'completedAt') setCompletedAt(date);
        if (field === 'createdAt') setCreatedAt(date);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(editTaskById({
            id: selectedTask?.id,
            name,
            title,
            description,
            status,
            updatedAt,
            completedAt,
            createdAt,
        }));
    };

    const dropdownChange = (option: any) => {
        setStatus(option.value);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl bg-white shadow-lg rounded-lg">
            <a
                href="/dashboard"
                className="px-6 py-2 my-5 underline font-semibold"
            >
                Back to Dashboard
            </a>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Edit Task</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Name"
                        type="text"
                        value={name}
                        onChange={handleChange}
                        placeholder="Enter task name"
                        useBottomBorderOnly={true}
                        className="rounded-md px-4 py-2"
                    />
                    <Input
                        label="Title"
                        value={title}
                        onChange={handleChangeTitle}
                        placeholder="Enter task title"
                        useBottomBorderOnly={true}
                        className="rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        rows={4}
                        className="w-full p-4 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
                        placeholder="Enter task description"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="py-2">
                        <Dropdown
                            options={options}
                            onChange={dropdownChange}
                            value={status}
                            placeholder="Select an option"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Updated At</label>
                        <DatePicker
                            selected={updatedAt}
                            onChange={(date: Date | null) => handleDateChange(date, 'updatedAt')}
                            className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            dateFormat="MMMM d, yyyy"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Completed At</label>
                        <DatePicker
                            selected={completedAt}
                            onChange={(date: Date | null) => handleDateChange(date, 'completedAt')}
                            className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            dateFormat="MMMM d, yyyy"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Created At</label>
                        <DatePicker
                            selected={createdAt}
                            onChange={(date: Date | null) => handleDateChange(date, 'createdAt')}
                            className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                            dateFormat="MMMM d, yyyy"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                    <input
                        type="file"
                        // onChange={handleFileChange}
                        className="w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                    <textarea
                        name="comments"
                        // value={selectedTask}
                        onChange={handleDescriptionChange}
                        rows={2}
                        className="w-full p-4 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
                        placeholder="Enter comments..."
                    />
                </div>

                <div className="flex justify-between">
                    <div className="flex space-x-2">
                        <Button
                            label="Delete Task"
                            type="button"
                            // onClick={handleDeleteTask}
                            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-lg hover:bg-red-700 transition-colors duration-300 ease-in-out"
                        />
                    </div>

                    <Button
                        label="Save Changes"
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
                    />
                </div>
            </form>
        </div>
    );
};
