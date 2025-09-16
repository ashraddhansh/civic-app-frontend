"use client"

import { Home, Camera, User, Search } from "lucide-react"
import Link from "next/link"

export function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 shadow-lg">
      {/* Home */}
      <Link href="/" className="flex flex-col items-center text-gray-600">
        <Home size={24} />
        <span className="text-xs">Home</span>
      </Link>

      {/* Track Issues */}
      <Link href="/track_issue" className="flex flex-col items-center text-gray-600">
        <Search size={24} />
        <span className="text-xs">Track</span>
      </Link>

      {/* Report (big button) */}
      <Link
        href="/report"
        className="flex flex-col items-center -mt-8 bg-blue-500 rounded-full w-16 h-16 justify-center text-white shadow-lg"
      >
        <Camera size={28} />
      </Link>

      {/* Profile */}
      <Link href="/profile" className="flex flex-col items-center text-gray-600">
        <User size={24} />
        <span className="text-xs">Profile</span>
      </Link>
    </div>
  )
}
