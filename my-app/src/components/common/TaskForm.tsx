import React, { useImperativeHandle, forwardRef, useEffect} from "react";
import Input from "../common/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown'
import {options} from "../../config/const";
import 'react-dropdown/style.css';
import { MentionsInput, Mention } from 'react-mentions';
import {getAllUsers} from "../../redux/slices/auth/authThunk";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";

interface TaskFormProps {
    taskData: {
        name: string;
        title: string;
        description: string;
        createdAt: Date | null;
        completedAt: Date | null;
        estimation: string;
        comment: string;
        status:string;
        assignedTo:string;
    };
    setTaskData: (field: string, value: any) => void;
}

export interface TaskFormRef {
    validateForm: () => boolean;
}

const TaskForm = forwardRef<TaskFormRef, TaskFormProps>(({ taskData, setTaskData }, ref) => {
    const errors = {
        name: '',
        title: '',
        description: '',
        createdAt: '',
        completedAt: '',
    }
    const dispatch = useDispatch<AppDispatch>();
    const developers = useSelector((state: any) => state.auth.developers);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const validateForm = (): boolean => {
        return Object.values(errors).every(error => error === '');
    };

    useImperativeHandle(ref, () => ({
        validateForm
    }));

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Task to:</label>
            <MentionsInput
                value={taskData.name}
                onChange={(event, newValue, newPlainTextValue, mentions) => {
                    const strippedValue = newPlainTextValue;
                    if (mentions.length > 0) {
                        const developerId = mentions[0].id;
                        setTaskData('name', strippedValue);
                        setTaskData('assignedTo', developerId);
                    } else {
                        setTaskData('name', strippedValue);
                        setTaskData('assignedTo', null);
                    }
                }}
                className={`w-full px-4 py-3 mb-4 ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                placeholder="Assign task to someone"
            >
                <Mention
                    trigger="@"
                    data={developers.map(dev => ({
                        id: dev.id,
                        display: dev.name
                    }))}
                    markup="@[__id__](__display__)"
                />
            </MentionsInput>

            <Input
                label="Title"
                name="title"
                placeholder="Enter task title"
                onChange={(e) => setTaskData('title', e.target.value)}
                value={taskData.title}
                useBottomBorderOnly={true}
                required
                error={errors.title}
            />

            <textarea
                name="description"
                onChange={(e) => setTaskData('description', e.target.value)}
                placeholder="Enter task description"
                rows={4}
                value={taskData.description}
                className={`w-full p-4 mt-4 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none mb-4 ${errors.description ? 'border-red-500' : ''}`}
                required
            />

            <Dropdown
                placeholder="Select an option"
                options={options}
                value={taskData?.status}
                onChange={(option) => setTaskData('status',option.value)}
                className="mb-4"
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Created Date</label>
                <DatePicker
                    selected={taskData.createdAt}
                    onChange={(date: Date | null) => setTaskData('createdAt', date)}
                    maxDate={taskData.completedAt || undefined}
                    className={`w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors ${errors.createdAt ? 'border-red-500' : ''}`}
                    dateFormat="MMMM d, yyyy"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Completed Date</label>
                <DatePicker
                    selected={taskData.completedAt}
                    onChange={(date: Date | null) => setTaskData('completedAt', date)}
                    minDate={taskData.createdAt || undefined}
                    className={`w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors ${errors.completedAt ? 'border-red-500' : ''}`}
                    dateFormat="MMMM d, yyyy"
                />
            </div>

            <div>
                <div>Estimation</div>
                <Input    useBottomBorderOnly={true}
                    value={taskData.estimation} className="rounded-md py-2 mb-3"  />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                <MentionsInput
                    value={taskData.comment}
                    onChange={(event, newValue, newPlainTextValue) => {
                        setTaskData('comment', newPlainTextValue);
                    }}
                    className="w-full p-4 mb-4  text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
                    placeholder="Add comments or mention someone..."
                >
                    <Mention
                        trigger="@"
                        data={developers.map(dev => ({
                            id: dev.id,
                            display: dev.name
                        }))}
                        markup="@[__id__](__display__)"
                    />
                </MentionsInput>
            </div>


            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                <input type="file" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
        </div>
    );
});

export default TaskForm;