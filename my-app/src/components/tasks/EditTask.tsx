import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import {deleteTaskById, editTaskById, getTaskById} from "../../redux/slices/tasks/authTasks";
import DatePicker from "react-datepicker";
import Input from '../common/Input';
import Button from "../common/Button";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Task} from "../../redux/slices/tasks/taskSlice";
import {options} from "../../config/const";


export const EditTask: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask);
    const navigate = useNavigate();

    const [taskData, setTaskData] = useState<Task>({
        name: '',
        title: '',
        description: '',
        status: '',
        updatedAt: null,
        completedAt: null,
        createdAt: null,
        comment: '',
        file: null,
    });

    useEffect(() => {
        if (id) {
            dispatch(getTaskById(parseInt(id)));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (selectedTask) {
            setTaskData({
                ...selectedTask,
                file: null,
            });
        }
    }, [selectedTask]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTaskData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (date: Date | null, field: keyof Pick<Task, 'updatedAt' | 'completedAt' | 'createdAt'>) => {
        setTaskData(prevData => ({ ...prevData, [field]: date }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const fileInfo = JSON.stringify({
                name: file.name,
                type: file.type,
                size: file.size,
            });
            // setTaskData(prevData => ({ ...prevData, file: fileInfo }));
        } else {
            // setTaskData(prevData => ({ ...prevData, file: null }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(editTaskById(taskData)).then(() => {
            navigate("/dashboard");
        });
    };


    const handleDelete = () => {
        if (id) {
            const confirmDelete = window.confirm("Are you sure you want to delete this task?");
            if (confirmDelete) {
                dispatch(deleteTaskById(Number(taskData.id))).then(() => {
                    navigate("/dashboard");
                });
            }
        }
    };


    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl bg-white shadow-lg rounded-lg">
            <Link to="/dashboard" className="inline-block px-6 py-2 my-5 text-blue-600 hover:text-blue-800 underline font-semibold">
                Back to Dashboard
            </Link>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Edit Task</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="text"
                        useBottomBorderOnly={true}
                        label="Name"
                        name="name"
                        value={taskData.name}
                        onChange={handleInputChange}
                        placeholder="Enter task name"
                        className="rounded-md px-4 py-2"
                    />
                    <Input
                        label="Title"
                        name="title"
                        value={taskData.title}
                        onChange={handleInputChange}
                        placeholder="Enter task title"
                        useBottomBorderOnly={true}
                        className="rounded-md px-4 py-2"
                    />
                </div>

                <textarea
                    name="description"
                    value={taskData.description}
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                    rows={4}
                    className="w-full p-4 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"

                />

                <Dropdown
                    placeholder="Select an option"
                    options={options}
                    value={taskData.status}
                    onChange={(option) => setTaskData(prevData => ({ ...prevData, status: option.value }))}
                />


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['updatedAt', 'completedAt', 'createdAt'].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <DatePicker
                                selected={taskData[field]}
                                onChange={(date: Date | null) => handleDateChange(date, field as keyof Pick<Task, 'updatedAt' | 'completedAt' | 'createdAt'>)}
                                className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                                dateFormat="MMMM d, yyyy"
                                isClearable
                            />
                        </div>
                    ))}
                </div>


                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <textarea
                    name="comment"
                    value={taskData.comment}
                    onChange={handleInputChange}
                    placeholder="Enter comments..."
                    rows={2}
                    className="w-full p-4 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"

                />

                <div className="flex justify-between">
                    <Button
                        label="Delete Task"
                        type="button"
                        onClick={() => handleDelete()}
                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-lg hover:bg-red-700 transition-colors duration-300 ease-in-out"
                    />
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