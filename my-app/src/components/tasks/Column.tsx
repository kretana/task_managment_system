import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { TaskItem } from './TaskItem';
import {AppDispatch} from "../../redux/store";
import {updateTask} from "../../redux/slices/tasks/authTasks";
import {Task} from "../../types/taskTypes";


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
            className={`
        rounded-lg shadow-md overflow-hidden
        h-[calc(100vh-3rem)] min-w-[250px]
        flex flex-col
        transition-all duration-200
        ${isOver ? 'ring-2 ring-blue-400 shadow-lg' : ''}
      `}
        >
            <h2 className="text-lg font-bold p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                {status}
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{tasks.length}</span>
            </h2>
            <div
                ref={drop}
                className={`
          flex-grow overflow-y-auto p-4 space-y-3 
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
          ${isOver ? 'bg-blue-50' : ''}
        `}
            >
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
                {tasks.length === 0 && (
                    <div className="text-gray-400 text-center py-4">
                        No tasks in this column
                    </div>
                )}
            </div>
        </div>
    );
});