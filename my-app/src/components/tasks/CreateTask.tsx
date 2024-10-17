import React, {useEffect, useState} from "react";
import Button from "../common/Button";
import TaskForm from "../common/TaskForm";
import {Task} from "../../types/taskTypes";
import useTaskEstimation from "../../hooks/useTaskEstimation";
import {Link} from "react-router-dom";

export const CreateTask = () => {
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
        estimation:"",
    });

    const estimation = useTaskEstimation(taskData);

    useEffect(() => {
        setTaskData(prev => ({ ...prev, estimation }));
    }, [estimation]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="bg-white p-6 rounded-md shadow-md">
            <Link to="/dashboard" className="inline-block px-2 py-2 my-5 text-blue-600 hover:text-blue-800 underline font-semibold">Back to Dashboard</Link>
            <h3 className="text-2xl font-bold mb-4">Create a New Task</h3>
            <form onSubmit={handleSubmit}>
                <TaskForm taskData={taskData} setTaskData={(field, value) => setTaskData(prev => ({ ...prev, [field]: value }))} />
                <Button type="submit" label="Create New Task" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out" />
            </form>
        </div>
    );
};
