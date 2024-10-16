import React from 'react';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import {Task} from "../../redux/slices/tasks/taskSlice";
import {truncateDescription} from "../../utils/truncateDescription";

interface TaskItemProps {
    task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = React.memo(({ task }) => {
    const [, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            className="bg-white rounded-lg shadow-md mb-4 transform transition-all duration-200 ease-in-out"
            role="button"
            tabIndex={0}
            aria-roledescription="draggable"
        >
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
                <Link to={`/edit-task/${task.id}`} className="text-xs font-bold underline text-blue-800 whitespace-nowrap	">
                    Edit Task
                </Link>
            </div>
            <div className="px-4 py-1 font-medium text-sm">
                {truncateDescription(task.description, 3)}
            </div>
            <div className="px-4 py-2 flex justify-between items-center">
                <span className="text-sm text-gray-500">{task.name}</span>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {task.status}
                </span>
            </div>
        </div>
    );
});