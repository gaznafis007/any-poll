"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import ThemeToggle from "./theme-toggle"
import { FiHome } from "react-icons/fi"

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            VanishVote
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {!isHome && (
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 flex items-center gap-1"
            >
              <FiHome size={16} /> Create Poll
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

