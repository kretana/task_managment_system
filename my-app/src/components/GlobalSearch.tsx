import { useState } from 'react';
import _ from 'lodash';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../redux/store";
import {fetchTasks} from "../redux/slices/tasks/tasksThunk";

export const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const toggleInput = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = _.debounce((e) => {
        const searchTerm = e.target.value
        if (!searchTerm) dispatch(fetchTasks({}));

        dispatch(fetchTasks({searchTerm}))
    }, 500);

    return (
        <div className="relative">
            <button
                onClick={toggleInput}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg focus:outline-none transition duration-200 hover:bg-blue-700"
            >
                {isOpen ? 'Close Search' : 'Open Search'}
            </button>
            {isOpen && (
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleChange}
                    className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
            )}
        </div>
    );
};

