"use client"

import { useState } from "react"
import Link from "next/link"
import CommentSection from "./comment-section"
import { FiShare2, FiTrendingUp, FiThumbsUp, FiHome } from "react-icons/fi"

export default function PollResults({ poll }) {
  const [reactions, setReactions] = useState(poll?.reactions || { trending: 0, like: 0 })

  // Calculate time remaining
  const expiresAt = new Date(poll.expiresAt)
  const now = new Date()
  const timeRemaining = expiresAt - now
  const isExpired = timeRemaining <= 0

  const formatTimeRemaining = () => {
    if (isExpired) return "Poll ended"

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60))
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`
    }
    return `${minutes}m remaining`
  }

  const handleReaction = async (type) => {
    try {
      // This would normally send data to your backend
      await new Promise((resolve) => setTimeout(resolve, 300))

      setReactions({
        ...reactions,
        [type]: reactions[type] + 1,
      })
    } catch (error) {
      console.error("Error adding reaction:", error)
    }
  }

  const copyLinkToClipboard = () => {
    // Get base URL without /results
    const url = window.location.href.replace("/results", "")
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Link copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy link:", err)
      })
  }

  // Calculate total votes and percentages
  const totalVotes = poll.options.reduce((sum, option) => sum + option?.votes, 0)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{poll.question}</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className={`${isExpired ? "text-red-500 dark:text-red-400" : "text-green-500 dark:text-green-400"}`}>
              {formatTimeRemaining()}
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {totalVotes} {totalVotes === 1 ? "vote" : "votes"} total
        </div>

        <div className="space-y-4 mb-6">
          {poll.options.map((option) => {
            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0

            return (
              <div key={option.id} className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-medium">{option.text}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {percentage}% ({option.votes})
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {!isExpired && (
            <Link
              href={`/poll/${poll.id}`}
              className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow transition-colors text-center"
            >
              Back to Poll
            </Link>
          )}

          <button
            onClick={copyLinkToClipboard}
            className="flex-1 py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md shadow transition-colors flex items-center justify-center gap-2"
          >
            <FiShare2 size={16} /> Share Results
          </button>
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

          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 flex items-center gap-1"
          >
            <FiHome size={16} /> Create New Poll
          </Link>
        </div>
      </div>

      <CommentSection pollId={poll.id} comments={poll.comments} />
    </div>
  )
}

