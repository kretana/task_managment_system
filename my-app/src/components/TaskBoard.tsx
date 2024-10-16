import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop, } from 'react-dnd';
import {fetchTasks, updateTask} from "../redux/slices/tasks/authTasks";
import {AppDispatch, RootState} from "../redux/store";

export const TaskBoard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const columns = ['New Task', 'In Progress', 'Ready Testing', 'Closed'];

    const Task = ({ task }) => {
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
            >
                {task.name}
            </div>
        );
    };

    const Column = ({ status, tasks }) => {
        const [, drop] = useDrop({
            accept: 'TASK',
            drop: (item: { id: number }) => dispatch(updateTask({ id: item.id, status })),
        });

        return (
            <div ref={drop} className="w-64 bg-gray-200 p-4 rounded-lg min-h-[300px]">
                <h2 className="text-lg font-bold mb-4">{status}</h2>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        );
    };

    return (
        <div className="flex space-x-4">
            {columns.map((status) => (
                <Column
                    key={status}
                    status={status}
                    tasks={tasks.filter((task) => task.status === status)}
                />
            ))}
        </div>
    );
};