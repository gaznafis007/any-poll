import CreatePollForm from "@/components/create-poll-form"
import { FiCheck, FiClock } from "react-icons/fi"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          VanishVote
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Create anonymous polls that disappear after a set time
        </p>
        <div className="flex justify-center space-x-2 mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            No login required
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
            Private by default
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Time-limited
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12">
        <CreatePollForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">
                1
              </div>
              <p className="text-gray-600 dark:text-gray-300">Create a poll with multiple options</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">
                2
              </div>
              <p className="text-gray-600 dark:text-gray-300">Set an expiration time (1h, 12h, 24h)</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">
                3
              </div>
              <p className="text-gray-600 dark:text-gray-300">Share the unique link with others</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">
                4
              </div>
              <p className="text-gray-600 dark:text-gray-300">View results in real-time or after poll ends</p>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 text-green-500 mr-3">
                <FiCheck size={18} />
              </div>
              <p className="text-gray-600 dark:text-gray-300">Anonymous voting - no login required</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 text-green-500 mr-3">
                <FiCheck size={18} />
              </div>
              <p className="text-gray-600 dark:text-gray-300">Time-limited polls that automatically expire</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 text-green-500 mr-3">
                <FiCheck size={18} />
              </div>
              <p className="text-gray-600 dark:text-gray-300">Option to hide results until poll ends</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 text-green-500 mr-3">
                <FiCheck size={18} />
              </div>
              <p className="text-gray-600 dark:text-gray-300">Reactions: 🔥 Trending, 👍 Like</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 text-green-500 mr-3">
                <FiCheck size={18} />
              </div>
              <p className="text-gray-600 dark:text-gray-300">Dark/light mode for better UI</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>AnyPoll - Privacy-focused polling that disappears when you&apos;re done</p>
      </div>
    </div>
  )
}

