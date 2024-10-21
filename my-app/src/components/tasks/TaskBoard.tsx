import React, { useEffect, useMemo, useState, useCallback, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from './Column';
import { TaskListView } from '../Views/TaskListView';
import { AppDispatch, RootState } from "../../redux/store";
import { fetchTasks } from "../../redux/slices/tasks/tasksThunk";
import { columns } from "../../config/const";
import { Link, useNavigate } from "react-router-dom";
import { Task } from "../../types/taskTypes";
import { Tabs } from "../common/Tabs";
import { AnaliticsReports } from "../Views/AnaliticsReports";
import Button from "../common/Button";
import { logout } from "../../redux/slices/auth/authSlices";
import { CalendarView } from "../Views/CalendarView";
import { useTranslation } from "react-i18next";
import { DateFilter } from "../DateFilter";
import { GlobalSearch } from "../GlobalSearch";

export const TaskBoard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, status, error } = useSelector((state: RootState | any) => state.tasks);
    const [activeTab, setActiveTab] = useState<'board' | 'list' | 'reports' | 'calendar'>('board');
    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser)[0] : null;
    const userName = userData?.name;
    const userRole = userData?.role;
    const userId = userData?.id;
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchTasks({}));
    }, [dispatch]);

    // Filter tasks based on user role
    const filteredTasks = useMemo(() => {
        return userRole === 'developer'
            ? tasks.filter((task) => task.assignedTo === userId)
            : tasks;
    }, [tasks, userRole, userId]);

    const groupedTasks = useMemo(() => {
        const grouped = {} as Record<string, Task[]>;
        columns.forEach((column) => {
            grouped[column.status] = filteredTasks.filter((task) => task.status === column.status);
        });
        return grouped;
    }, [filteredTasks]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    const handleTabClick = useCallback((tab: 'board' | 'list' | 'reports' | 'calendar') => {
        setActiveTab(tab);
    }, []);

    const tabs = useMemo(() => {
        const baseTabs = [
            {
                label: 'Board View',
                onClick: () => handleTabClick('board'),
                isActive: activeTab === 'board',
            },
            {
                label: 'List View',
                onClick: () => handleTabClick('list'),
                isActive: activeTab === 'list',
            },
        ];

        if (userRole === 'admin') {
            baseTabs.push(
                {
                    label: "Reports & Analitics",
                    onClick: () => handleTabClick("reports"),
                    isActive: activeTab === "reports",
                },
                {
                    label: 'Calendar View',
                    onClick: () => handleTabClick('calendar'),
                    isActive: activeTab === 'calendar',
                }
            );
        }

        return baseTabs;
    }, [activeTab, handleTabClick, userRole]);

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
        <div className="bg-gray-50 p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <div className="text-3xl font-bold">
                    {`${t('header.title')} ${userName}`}
                </div>
                <Button
                    label={"Logout"}
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition duration-300"
                />
            </div>
            <GlobalSearch />
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 mt-4">Task Management System</h1>
            <DateFilter />
            <div className="flex justify-between mb-5">
                <Tabs tabs={tabs} />
                {userRole !== "developer" && (
                    <Link
                        to="/new-task"
                        className="underline font-bold text-indigo-600 hover:text-indigo-800 transition duration-300"
                    >
                        Create a new task
                    </Link>
                )}
            </div>
            {activeTab === 'board' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {columns.map((column) => (
                        <Column key={column.columnKey} status={column.status} tasks={groupedTasks[column.status]} />
                    ))}
                </div>
            ) : activeTab === 'list' ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <TaskListView tasks={filteredTasks} />
                </Suspense>
            ) : activeTab === 'calendar' ? (
                userRole === "admin" && <Suspense fallback={<div>Loading...</div>}><CalendarView /></Suspense>
            ) : (
                userRole === 'admin' && <Suspense fallback={<div>Loading...</div>}><AnaliticsReports /></Suspense>
            )}
        </div>
    );
};


