import Input from "../common/Input";
import React, { useImperativeHandle, forwardRef, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { options } from "../../config/const";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { getAllUsers } from "../../redux/slices/auth/authThunk";
import { AppDispatch } from "../../redux/store";
import {Task} from "../../types/taskTypes";
import CommentList from "../tasks/comments/CommentList";
import { MentionsInput, Mention } from "react-mentions";
import { useDispatch, useSelector } from "react-redux";
import AttachmentsSection from "../tasks/file/Files";

interface TaskFormProps {
    taskData: Task;
    setTaskData: (field: string, value: any) => void;
    handleCommentSubmit?: (e: any) => void;
    currentComment?: string;
    setCurrentComment?: (string) => void;
    isCreating: boolean;
}

export interface TaskFormRef {
    validateForm: () => boolean;
}

const TaskForm = forwardRef<TaskFormRef, TaskFormProps>(
    ({ taskData, setTaskData, handleCommentSubmit, currentComment, setCurrentComment, isCreating }, ref) => {
        const dispatch = useDispatch<AppDispatch>();
        const developers = useSelector((state: any) => state.auth.developers);


        const errors = {
            name: "",
            title: "",
            description: "",
            createdAt: "",
            completedAt: "",
        };

        useEffect(() => {
            dispatch(getAllUsers());
        }, [dispatch]);

        useImperativeHandle(ref, () => ({
            validateForm: () => {
                const hasErrors = [
                    !taskData.name && (errors.name = "Name is required"),
                    !taskData.title && (errors.title = "Title is required"),
                    !taskData.description && (errors.description = "Description is required"),

                ].some((e) => e);

                return !hasErrors; 
            },
        }));



        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const { name, value } = e.target;
                setTaskData(name, value);
            },
            [setTaskData]
        );

        const handleDateChange = useCallback(
            (field: string, date: Date | null) => {
                setTaskData(field, date);
            },
            [setTaskData]
        );

        const handleAssignChange = useCallback(
            (option) => {
                setTaskData("name", option.label);
                setTaskData("assignedTo", option.value);
            },
            [setTaskData]
        );

        const handleAddAttachment = useCallback(
            (newAttachment: any) => {
                setTaskData("file", newAttachment);
            },
            [setTaskData]
        );

        const members = developers.map((dev) => ({
            value: dev.id,
            label: dev.name,
        }));

        return (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign Task to:</label>
                <Dropdown options={members} value={taskData.name} onChange={handleAssignChange} />

                <Input
                    label="Title"
                    name="title"
                    placeholder="Enter task title"
                    onChange={handleInputChange}
                    value={taskData.title}
                    useBottomBorderOnly={true}
                    required
                    error={errors.title}
                />


                <textarea
                    name="description"
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                    rows={4}
                    value={taskData.description}
                    className={`w-full p-4 mt-4 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none mb-4 ${
                        errors.description ? "border-red-500" : ""
                    }`}
                    required
                />


                <Dropdown
                    placeholder="Select an option"
                    options={options}
                    value={taskData?.status}
                    onChange={(option) => setTaskData("status", option.value)}
                    className="mb-4"
                />


                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Created Date</label>
                    <DatePicker
                        selected={taskData.createdAt}
                        onChange={(date) => handleDateChange("createdAt", date)}
                        maxDate={taskData.completedAt || undefined}
                        className={`w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors ${
                            errors.createdAt ? "border-red-500" : ""
                        }`}
                        dateFormat="MMMM d, yyyy"
                    />
                </div>


                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Completed Date</label>
                    <DatePicker
                        selected={taskData.completedAt}
                        onChange={(date) => handleDateChange("completedAt", date)}
                        minDate={taskData.createdAt || undefined}
                        className={`w-full px-4 py-2 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors ${
                            errors.completedAt ? "border-red-500" : ""
                        }`}                        dateFormat="MMMM d, yyyy"
                    />
                </div>


                <div>
                    <div>Estimation</div>
                    <Input
                        useBottomBorderOnly={true}
                        value={taskData.estimation}
                        className="rounded-md py-2 mb-3"
                        onChange={handleInputChange}
                    />
                </div>


                {!isCreating && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                        <CommentList comments={taskData?.comment || []} />
                        <div className="relative">
                            <MentionsInput
                                value={currentComment}
                                onChange={(event, newValue, newPlainTextValue) => setCurrentComment(newPlainTextValue)}
                                className="w-full p-4 mb-2 text-gray-700 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
                                placeholder="Add a new comment or mention someone..."
                            >
                                <Mention
                                    trigger="@"
                                    data={developers.map((dev) => ({
                                        id: dev.id,
                                        display: dev.name,
                                    }))}
                                    markup="@[__id__](__display__)"
                                />
                            </MentionsInput>
                            <button
                                onClick={handleCommentSubmit}
                                className="absolute right-2 bottom-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add Comment
                            </button>
                        </div>
                    </div>
                )}


                <div className="mb-4">
                    <AttachmentsSection attachments={taskData.file || []} addAttachments={handleAddAttachment} />
                </div>
            </div>
        );
    }
);

export default React.memo(TaskForm);