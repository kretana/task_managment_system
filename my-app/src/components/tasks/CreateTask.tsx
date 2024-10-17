import Input from "../common/Input";
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../common/Button";

export const CreateTask = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [createdDate, setCreatedDate] = useState<Date | null>(null);
    const [updatedDate, setUpdatedDate] = useState<Date | null>(null);
    const [completedDate, setCompletedDate] = useState<Date | null>(null);


    const [estimation, setEstimation] = useState('');

    useEffect(() => {
        if (createdDate && completedDate) {
            const diffTime = completedDate.getTime() - createdDate.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setEstimation(diffDays > 0 ? `${diffDays} day(s)` : '');
        } else {
            setEstimation('');
        }
    }, [createdDate, completedDate]);
    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold mb-4">Create a New Task</h3>
            <Input
                type="text"
                label="Name"
                name="name"
                placeholder="Assign task to someone"
                className="rounded-md  py-2 mb-4"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <Input
                label="Title"
                name="title"
                placeholder="Enter task title"
                className="rounded-md  py-2 mb-4"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <textarea
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                rows={4}
                value={description}
                className="w-full p-4 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none mb-4"
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Created Date</label>
                <DatePicker
                    selected={createdDate}
                    onChange={(date: Date | null) => setCreatedDate(date)}
                    className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors"
                    dateFormat="MMMM d, yyyy"
                    isClearable
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Updated Date</label>
                <DatePicker
                    selected={updatedDate}
                    onChange={(date: Date | null) => setUpdatedDate(date)}
                    className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors"
                    dateFormat="MMMM d, yyyy"
                    isClearable
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Completed Date</label>
                <DatePicker
                    selected={completedDate}
                    onChange={(date: Date | null) => setCompletedDate(date)}
                    className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors"
                    dateFormat="MMMM d, yyyy"
                    isClearable
                />
            </div>
            <div>
                <div>Estimation</div>
                <Input value={estimation}  className="rounded-md py-2 mb-4"   />
            </div>

            <Button type="submit" label="Create New Task"  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
            />
        </div>
    );
};
