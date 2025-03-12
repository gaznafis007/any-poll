"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";

export default function CommentSection({ pollId }) {
  const [comments, setComments] = useState([]);
//   console.log(comments)
  const getComments = async () => {
    const res = await fetch(`/api/comments?pollId=${pollId}`);
    const data = await res.json();
    setComments(data);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.comment.trim()) return;

    try {
      // This would normally send data to your backend
      const comment = {
        ...data,
        pollId: pollId,
        createdAt: new Date().toISOString(),
      };
      //   console.log(comment)
      const res = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      const resData = await res.json();
      if (resData.acknowledged) {
        getComments()
      }
      reset();
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };

  const formatCommentDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="flex items-start space-x-2">
          <div className="flex-1">
            <textarea
              {...register("comment", { required: "Comment cannot be empty" })}
              placeholder="Add an anonymous comment..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800"
              rows={2}
            />
            {errors.comment && (
              <p className="mt-1 text-sm text-red-500">
                {errors.comment.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 flex items-center gap-1"
          >
            <FiSend size={16} /> Post
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium">Anonymous {Math.floor(100000 + Math.random() * 900000)}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatCommentDate(comment.createdAt)}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
