import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { deleteTaskById, editTaskById, getTaskById } from "../../redux/slices/tasks/authTasks";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import TaskForm from "../common/TaskForm";
import { Task } from "../../types/taskTypes";
import useTaskEstimation from "../../hooks/useTaskEstimation";

export const EditTask= () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: any }>();
    const selectedTask = useSelector((state: RootState) => state.tasks.selectedTask);
    const navigate = useNavigate();

    const storedUser = localStorage.getItem('user');
    const role:string = storedUser ? JSON.parse(storedUser)[0].role : null;

    const [taskData, setTaskData] = useState<Task>({
        name: '',
        title: '',
        description: '',
        status: '',
        completedAt: null,
        createdAt: null,
        comment: '',
        file: null,
        estimation: "",
        assignedTo:""
    });

    const estimation = useTaskEstimation(taskData);
    useEffect(() => {
            dispatch(getTaskById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (selectedTask) {
            setTaskData({
                ...selectedTask,
            });
        }
        if(estimation){
            setTaskData(prev => ({ ...prev, estimation }));
        }
    }, [selectedTask]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(editTaskById(taskData));
        navigate("/dashboard");
    }, [taskData, dispatch, navigate]);

    const handleDelete = useCallback(async () => {
        if (id) {
            const confirmDelete = window.confirm("Are you sure you want to delete this task?");
            if (confirmDelete) {
                await dispatch(deleteTaskById(id));
                navigate("/dashboard");
            }
        }
    }, [id, dispatch, navigate]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl bg-white shadow-lg rounded-lg">
            <Link to="/dashboard" className="inline-block px-6 py-2 my-5 text-blue-600 hover:text-blue-800 underline font-semibold">Back to Dashboard</Link>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Edit Task</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <TaskForm taskData={taskData} setTaskData={(field, value) => setTaskData(prev => ({ ...prev, [field]: value }))}  />
                <div className="flex justify-between">
                    {  role !== "developer" &&
                        <Button type="button" label="Delete Task"
                             className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md shadow-lg hover:bg-red-700 transition-colors duration-300 ease-in-out"
                             onClick={handleDelete}/>
                    }
                    <Button type="submit" label="Update Task" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out" />
                </div>
            </form>
        </div>
    );
};
