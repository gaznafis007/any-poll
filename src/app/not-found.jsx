import Link from "next/link"
import { FiAlertCircle, FiHome } from "react-icons/fi"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <FiAlertCircle size={64} className="text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          The poll you&apos;re looking for might have expired or never existed. Polls on VanishVote disappear after their set
          time limit.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors gap-2"
        >
          <FiHome size={18} /> Create a New Poll
        </Link>
      </div>
    </div>
  )
}

