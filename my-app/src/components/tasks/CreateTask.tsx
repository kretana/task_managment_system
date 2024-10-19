import useTaskEstimation from "../../hooks/useTaskEstimation";
import { createTask } from "../../redux/slices/tasks/authTasks";
import { AppDispatch } from "../../redux/store";
import { Task } from "../../types/taskTypes";
import Button from "../common/Button";
import TaskForm from "../common/TaskForm";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const CreateTask = () => {
  const [taskData, setTaskData] = useState<Task>({
    name: "",
    title: "",
    description: "",
    status: "",
    completedAt: null,
    createdAt: null,
    comment: [],
    file: null,
    estimation: "",
    assignedTo: "",
  });

  const estimation = useTaskEstimation(taskData);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setTaskData((prev) => ({ ...prev, estimation }));
  }, [estimation]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await dispatch(createTask(taskData)).unwrap();
        navigate("/dashboard");
      } catch (err) {
        console.error("Failed to create task", err);
      }
    },
    [dispatch, taskData, navigate]
  );

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <Link
        to="/dashboard"
        className="inline-block px-2 py-2 my-5 text-blue-600 hover:text-blue-800 underline font-semibold"
      >
        Back to Dashboard
      </Link>
      <h3 className="text-2xl font-bold mb-4">Create a New Task</h3>
      <form onSubmit={handleSubmit}>
        <TaskForm
          taskData={taskData}
          setTaskData={(field, value) =>
            setTaskData((prev) => ({ ...prev, [field]: value }))
          }
        />
        <Button
          type="submit"
          label="Create New Task"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
        />
      </form>
    </div>
  );
};
