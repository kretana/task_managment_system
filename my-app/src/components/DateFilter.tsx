import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/tasks/tasksThunk";
import { AppDispatch } from "../redux/store";
import "react-datepicker/dist/react-datepicker.css";

export const DateFilter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [createdAt, setCreatedAt] = useState<Date | null>(null);
    const [completedAt, setCompletedAt] = useState<Date | null>(null);

    const refetchWithoutFilters = () => {
        dispatch(fetchTasks({}));
    };

    useEffect(() => {
        if (createdAt && completedAt) {
            dispatch(fetchTasks({
                createdAt: createdAt.toISOString(),
                completedAt: completedAt.toISOString(),
            }));
        } else if(!createdAt && !completedAt ) {
            refetchWithoutFilters();
        }
    }, [createdAt, completedAt, dispatch]);

    return (
        <div className="flex flex-row justify-end items-left space-x-4">
            <DatePicker
                selected={createdAt}
                onChange={(date) => setCreatedAt(date)}
                className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors"
                dateFormat="MMMM d, yyyy"
                placeholderText="Start Date"
                isClearable
            />
            <DatePicker
                selected={completedAt}
                onChange={(date) => setCompletedAt(date)}
                className="w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors"
                dateFormat="MMMM d, yyyy"
                placeholderText="End Date"
                isClearable
            />
        </div>
    );
};