import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { fetchTasks, updateTask } from "../redux/slices/tasks/authTasks";
import { AppDispatch, RootState } from "../redux/store";
import {Task} from "../redux/slices/tasks/taskSlice";

const TaskItem: React.FC<{ task: Task }> = React.memo(({ task }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className={`p-4 bg-white shadow-md mb-2 rounded ${
                isDragging ? 'opacity-50' : ''
            }`}
            role="button"
            tabIndex={0}
            aria-roledescription="draggable"
        >
            {task.name}
        </div>
    );
});

const Column: React.FC<{ status: string; tasks: Task[] }> = React.memo(({ status, tasks }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item: { id: number }) => dispatch(updateTask({ id: item.id, status })),
    });

    return (
        <div ref={drop} className="w-64 bg-gray-200 p-4 rounded-lg min-h-[300px]">
            <h2 className="text-lg font-bold mb-4">{status}</h2>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
});

export const TaskBoard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, status, error } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);


    //initialized once
    const columns = useMemo(() => {
        return ['New Task', 'In Progress', 'Ready Testing', 'Closed'];
    }, []);

    const groupedTasks = useMemo(() => {
        return columns.reduce((acc, column) => {
            acc[column] = tasks.filter((task) => task.status === column);
            return acc;
        }, {} as Record<string, Task[]>);
    }, [tasks, columns]);

    if (status === 'failed') {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex space-x-4 p-4 overflow-x-auto">
            {columns.map((status) => (
                <Column
                    key={status}
                    status={status}
                    tasks={groupedTasks[status]}
                />
            ))}
        </div>
    );
};