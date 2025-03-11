"use client"

import { useEffect } from "react"
import Link from "next/link"
import { FiAlertTriangle, FiRefreshCw, FiHome } from "react-icons/fi"

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 mb-4">
          <FiAlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          {error?.message || "An unexpected error occurred. Please try again later."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors gap-2"
          >
            <FiRefreshCw size={18} /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors gap-2"
          >
            <FiHome size={18} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

