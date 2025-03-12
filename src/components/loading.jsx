"use client"

import { FiLoader } from "react-icons/fi"

export function LoadingSpinner({ size = "medium", className = "" }) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
    xl: "w-16 h-16",
  }

  return (
    <div
      className={`animate-spin text-purple-600 dark:text-purple-400 ${sizeClasses[size]} ${className}`}
      role="status"
    >
      <FiLoader className="w-full h-full" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function LoadingDots({ size = "medium", className = "" }) {
  const sizeClasses = {
    small: "h-1 w-1 mx-0.5",
    medium: "h-2 w-2 mx-1",
    large: "h-3 w-3 mx-1.5",
  }

  return (
    <div className={`flex items-center justify-center ${className}`} role="status">
      <div className="flex space-x-1">
        <div
          className={`rounded-full bg-purple-600 dark:bg-purple-400 ${sizeClasses[size]} animate-bounce [animation-delay:-0.3s]`}
        ></div>
        <div
          className={`rounded-full bg-purple-600 dark:bg-purple-400 ${sizeClasses[size]} animate-bounce [animation-delay:-0.15s]`}
        ></div>
        <div className={`rounded-full bg-purple-600 dark:bg-purple-400 ${sizeClasses[size]} animate-bounce`}></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function LoadingPulse({ className = "", lines = 3 }) {
  return (
    <div className={`w-full animate-pulse ${className}`} role="status">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-4"></div>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full mb-2.5"></div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function ButtonLoader({ children, isLoading, className = "" }) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-md">
          <LoadingSpinner size="small" />
        </div>
      )}
      <div className={isLoading ? "invisible" : ""}>{children}</div>
    </div>
  )
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Loading...</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait a moment</p>
      </div>
    </div>
  )
}

export function PollCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse" role="status">
      <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-6"></div>

      <div className="space-y-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-24"></div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-24"></div>
        </div>
      </div>
      <span className="sr-only">Loading poll...</span>
    </div>
  )
}

export default function Loading() {
  return <FullPageLoader />
}

