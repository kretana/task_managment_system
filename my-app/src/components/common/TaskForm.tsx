import React from "react";
import Input from "../common/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TaskFormProps {
    taskData: {
        name: string;
        title: string;
        description: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        completedAt: Date | null;
        estimation: string;
        comment: string;
    };
    setTaskData: (field: string, value: any) => void;
}


const TaskForm: React.FC<TaskFormProps> = ({ taskData, setTaskData }) => {

    return (
        <div>
            <Input
                type="text"
                label="Name"
                name="name"
                placeholder="Assign task to someone"
                className="rounded-md py-2 mb-4"
                onChange={(e) => setTaskData('name', e.target.value)}
                value={taskData.name}
            />
            <Input
                label="Title"
                name="title"
                placeholder="Enter task title"
                className="rounded-md py-2 mb-4"
                onChange={(e) => setTaskData('title', e.target.value)}
                value={taskData.title}
            />
            <textarea
                name="description"
                onChange={(e) => setTaskData('description', e.target.value)}
                placeholder="Enter task description"
                rows={4}
                value={taskData.description}
                className="w-full p-4 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none mb-4"
            />
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Created Date</label>
                <DatePicker
                    selected={taskData.createdAt}
                    onChange={(date) => setTaskData('createdAt', date)}
                    className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors"
                    dateFormat="MMMM d, yyyy"
                    isClearable
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Updated Date</label>
                <DatePicker
                    selected={taskData.updatedAt}
                    onChange={(date) => setTaskData('updatedAt', date)}
                    className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors"
                    dateFormat="MMMM d, yyyy"
                    isClearable
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Completed Date</label>
                <DatePicker
                    selected={taskData.completedAt}
                    onChange={(date) => setTaskData('completedAt', date)}
                    className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors"
                    dateFormat="MMMM d, yyyy"
                    isClearable
                />
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
};

export default TaskForm;
