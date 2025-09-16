// app/login/page.tsx

"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { BottomNavbar } from "../components/BottomNavBar"

export default function ProfilePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedProfileName = localStorage.getItem("profile_name")
      const storedName = localStorage.getItem("name")
      const initialName = storedProfileName || storedName || ""
      setName(initialName)

      // Phone set at login; we set it if not already
      const storedPhone = localStorage.getItem("phone") || localStorage.getItem("mobile") || ""
      setPhone(storedPhone)
    } catch {}
  }, [])

  const handleSave = () => {
    try {
      // Persist a dedicated profile name that overrides backend-provided name
      localStorage.setItem("profile_name", name.trim())
      alert("Profile saved!")
    } catch {
      alert("Failed to save profile. Please try again.")
    }
  }

  const handleLogout = async () => {
    // Attempt backend logout (best-effort)
    try {
      const token = localStorage.getItem("access_token") || localStorage.getItem("token")
      if (token) {
        await fetch((process.env.NEXT_PUBLIC_API_BASE_URL || "https://civic-ops.onrender.com") + "/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {})
      }
    } catch {}

    // Clear auth/session data but keep profile_name so it persists across logins
    try {
      localStorage.removeItem("access_token")
      localStorage.removeItem("token")
      localStorage.removeItem("user_id")
      // Keep profile_name; optionally clear backend-provided name so our saved one is used next login
      localStorage.removeItem("name")
    } catch {}

    // Navigate to login
    router.replace("/login")
  }

  return (
  <div className="flex flex-col min-h-screen bg-white px-6 pb-28 py-12">
      <h1 className="text-2xl font-bold mb-8">User Profile</h1>

  {/* Name label and field */}
  <h2 className="mb-3 text-xl font-semibold text-gray-800" id="profile-name-label">Name</h2>
      <Input
        id="profile-name"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="mb-4 h-12 text-lg"
      />

  {/* Phone label and field */}
  <h2 className="mb-3 text-xl font-semibold text-gray-800" id="profile-phone-label">Phone Number</h2>
      <div className="flex items-center border rounded-md mb-4 bg-gray-100">
        <span className="px-3 text-lg text-gray-600">+91</span>
        <Input
          id="profile-phone"
          type="tel"
          value={phone}
          disabled
          className="border-0 focus-visible:ring-0 h-12 text-lg flex-1 text-gray-400 bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Save button */}
      <Button className="h-12 text-lg mb-4" onClick={handleSave}>
        Save
      </Button>

      {/* Spacer to push logout button to bottom */}
      <div className="flex-1" />

      {/* Logout button (danger/destructive) */}
      <Button
        className="h-12 text-lg w-full mb-20"
        variant="destructive"
        onClick={handleLogout}
      >
        Logout
      </Button>

      {/* Bottom navigation bar */}
      <BottomNavbar />
    </div>
  )
}
