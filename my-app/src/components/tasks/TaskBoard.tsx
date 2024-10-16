import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from './Column';
import {AppDispatch, RootState} from "../../redux/store";
import {fetchTasks} from "../../redux/slices/tasks/authTasks";
import {Task} from "../../redux/slices/tasks/taskSlice";
import {columns} from "../../config/const";


export const TaskBoard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, status, error } =useSelector((state: RootState | any) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);


    const groupedTasks = useMemo(() => {
        const grouped = {} as Record<string, Task[]>;

        columns.forEach((column) => {
            grouped[column.status] = tasks.filter((task) => task.status === column.status);
        });

        return grouped;
    }, [tasks]);



    if (status === 'failed') {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Board</h1>
            <div className="grid grid-cols-4 gap-6">
                {columns.map((column) => (
                    <Column
                        key={column.columnKey}
                        status={column.status}
                        tasks={groupedTasks[column.status]}
                    />
                ))}
            </div>
        </div>
    );
};