import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { TaskItem } from './TaskItem';
import {AppDispatch} from "../../redux/store";
import {updateTask} from "../../redux/slices/tasks/authTasks";
import {Task} from "../../redux/slices/tasks/taskSlice";

interface ColumnProps {
    status: string;
    tasks: Task[];
}

export const Column: React.FC<ColumnProps> = React.memo(({ status, tasks }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [{ isOver }, drop] = useDrop({
        accept: 'TASK',
        drop: (item: { id: number }) => dispatch(updateTask({ id: item.id, status })),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            className={`
        bg-gray-100 rounded-lg p-4 
        h-[calc(100vh-12rem)]
        flex flex-col
        transition-all duration-200
        ${isOver ? 'shadow-lg ring-2 ring-blue-300' : 'shadow'}
      `}
        >
            <h2 className="text-lg font-bold mb-4 text-gray-700 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                {status}
                <span className="ml-auto text-sm font-normal text-gray-500">{tasks.length}</span>
            </h2>
            <div className="flex-grow overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
});