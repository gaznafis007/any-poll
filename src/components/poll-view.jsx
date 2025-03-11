"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CommentSection from "./comment-section";
import { FiHeart, FiShare2, FiTrendingUp, FiThumbsUp } from "react-icons/fi";

export default function PollView({ poll }) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [reactions, setReactions] = useState(
    poll?.reactions || { trending: 0, like: 0 }
  );

  // Calculate expiration time from creation time + expiration (in seconds)
  const createdAt = new Date(poll.createdAt); // Ensure `createdAt` exists in your poll data
  const expiresAt = new Date(createdAt.getTime() + poll.expiration * 1000);
  const now = new Date();
  const timeRemaining = expiresAt - now;
  const isExpired = timeRemaining <= 0;

  // Function to format time
  const formatTimeRemaining = () => {
    if (isExpired) return "Expired";

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );

    return hours > 0
      ? `${hours}h ${minutes}m remaining`
      : `${minutes}m remaining`;
  };

  const handleVote = async () => {
    if (!selectedOption || hasVoted || isExpired) return;

    try {
      // This would normally send data to your backend
      await new Promise((resolve) => setTimeout(resolve, 500));
      setHasVoted(true);

      // If results are hidden until poll ends and poll is not expired, redirect to confirmation page
      if (poll.hideResults && !isExpired) {
        router.push(`/poll/${poll._id}/voted`);
        return;
      }

      // Otherwise, show results
      router.push(`/poll/${poll._id}/results`);
    } catch (error) {
      console.error("Error voting:", error);
      alert("Failed to submit vote. Please try again.");
    }
  };

  const handleReaction = async (type) => {
    try {
      // This would normally send data to your backend
      if(!poll.reactions){
        const newPoll = {
            ...poll,
            reactions:{
                trending: 0,
                like: 0
            }
        }
        const targetedReaction = newPoll?.reactions
        targetedReaction[type] =+ 1 
        const {_id, ...updatedPoll} = newPoll
        const res = await fetch(`/api/polls/${poll._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedPoll)
        })
        const resData = await res.json()
        console.log(resData)
      }
      else{
        const {reactions:targetedReaction} = poll
        targetedReaction[type] =+ 1
        const {_id, updatedPoll} = poll
        const res = await fetch(`/api/polls/${poll._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedPoll)
        })
        const resData = await res.json()
        console.log(resData)
      }
      
      setReactions({
        ...reactions,
        [type]: reactions[type] + 1,
      });
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  const copyLinkToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{poll.question}</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span
              className={`${
                isExpired
                  ? "text-red-500 dark:text-red-400"
                  : "text-green-500 dark:text-green-400"
              }`}
            >
              {formatTimeRemaining()}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {poll.options.map((option) => (
            <div
              key={option.text}
              onClick={() =>
                !hasVoted && !isExpired && setSelectedOption(option.text)
              }
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedOption === option.text
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              } ${hasVoted || isExpired ? "cursor-default" : ""}`}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    selectedOption === option.text
                      ? "border-purple-500 bg-purple-500 dark:border-purple-400 dark:bg-purple-400"
                      : "border-gray-300 dark:border-gray-600"
                  } mr-3 flex-shrink-0 flex items-center justify-center`}
                >
                  {selectedOption === option.text && (
                    <FiHeart size={12} className="text-white" />
                  )}
                </div>
                <span className="font-medium">{option.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={handleVote}
            disabled={!selectedOption || hasVoted || isExpired}
            className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {hasVoted ? "Voted" : isExpired ? "Poll Ended" : "Submit Vote"}
          </button>

          {(hasVoted || !poll.hideResults || isExpired) && (
            <Link
              href={`/poll/${poll._id}/results`}
              className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md shadow transition-colors text-center"
            >
              View Results
            </Link>
          )}
        </div>

        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleReaction("trending")}
              className="flex items-center space-x-1 text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400"
            >
              <FiTrendingUp size={18} />
              <span>{reactions.trending}</span>
            </button>
            <button
              onClick={() => handleReaction("like")}
              className="flex items-center space-x-1 text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400"
            >
              <FiThumbsUp size={18} />
              <span>{reactions.like}</span>
            </button>
          </div>

          <button
            onClick={copyLinkToClipboard}
            className="text-sm text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 flex items-center gap-1"
          >
            <FiShare2 size={16} /> Share Poll
          </button>
        </div>
      </div>

      <CommentSection pollId={poll._id} />
    </div>
  );
}
