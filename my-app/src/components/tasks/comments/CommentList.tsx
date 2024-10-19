import { TaskComment } from "../../../types/taskTypes";
import CommentItem from "./CommentItem";
import React from "react";

interface CommentListProps {
  comments: TaskComment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <p className="text-gray-500 text-sm italic mb-4">No comments yet.</p>
    );
  }

  return (
    <div className="mb-4 max-h-60 overflow-y-auto">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
