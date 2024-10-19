import { URL } from "../../../config/const";
import { Task, TaskComment } from "../../../types/taskTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addComment = createAsyncThunk<
  Task,
  { taskId: string; updatedComments: TaskComment[] }
>(
  "comments/addComment",
  async ({ taskId, updatedComments }, { rejectWithValue }) => {
    try {
      const response = await axios.patch<Task>(`${URL}/tasks/${taskId}`, {
        comment: updatedComments,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
