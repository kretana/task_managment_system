import React, { useState, useRef, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchTasks } from '../redux/slices/tasks/tasksThunk';

export const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const toggleInput = () => {
        setIsOpen(!isOpen);
    };

    const debouncedSearch = useCallback(
        _.debounce((value: string) => {
            if (!value) {
                dispatch(fetchTasks({}));
            } else if (filter) {
                const filterParam = filter === "name" ? "nameFilter" : "statusFilter";
                dispatch(fetchTasks({ [filterParam]: value }));
            } else {
                dispatch(fetchTasks({ searchTerm: value }));
            }
        }, 500),
        [dispatch, filter]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleFilterSelect = (filterType: string) => {
        !filterType.length  && dispatch(fetchTasks({}));
        setFilter(filterType);
        setSearchTerm('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.paddingLeft = filter ? '100px' : '8px';
        }
    }, [filter]);

    return (
        <div className="relative">
            <button
                onClick={toggleInput}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg focus:outline-none transition duration-200 hover:bg-blue-700"
            >
                {isOpen ? 'Close Search' : 'Open Search'}
            </button>
            {isOpen && (
                <div className="mt-2 w-full flex items-center space-x-2">
                    <div className="flex-1 relative">
                        {filter && (
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 py-1 rounded text-sm">
                                {filter === 'name' ? 'Name:' : 'Status:'}
                            </span>
                        )}
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            placeholder={filter ? `Search by ${filter}...` : "Search..."}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={filter}
                            onChange={(e) => handleFilterSelect(e.target.value)}
                            className="p-2 w-32 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        >
                            <option value="">All</option>
                            <option value="name">Find by Name</option>
                            <option value="status">Find by Status</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}