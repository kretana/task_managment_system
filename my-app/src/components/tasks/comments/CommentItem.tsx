import { TaskComment } from "../../../types/taskTypes";
import React from "react";

interface CommentItemProps {
  comment: TaskComment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-2 shadow-sm">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold mr-2">
          {comment.userName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-semibold text-sm">{comment.userName}</h4>
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-700">{comment.content}</p>
    </div>
  );
};

export default CommentItem;
