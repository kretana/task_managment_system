import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../../types/taskTypes';
import { truncateDescription } from "../../utils/truncateDescription";

interface TaskListViewProps {
    tasks: Task[];
}

export const TaskListView: React.FC<TaskListViewProps> = ({ tasks }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-gray-400 text-center py-4">
                No tasks available.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div key={task.id} className="bg-white rounded-lg shadow-md p-4 transition-all duration-200 ease-in-out">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800">{task.title}</h3>
                        <Link to={`/edit-task/${task.id}`} className="text-xs font-bold underline text-blue-800 whitespace-nowrap">
                            Edit Task
                        </Link>
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                        {truncateDescription(task.description, 3)}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">{task.name}</span>
                        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {task.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
