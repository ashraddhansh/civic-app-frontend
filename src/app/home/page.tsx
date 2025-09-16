"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IssueCard } from "../components/IssueCard"
import { BottomNavbar } from "../components/BottomNavBar"
import { apiFetch, type IssueResponse } from "@/lib/api"

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [issues, setIssues] = React.useState<IssueResponse[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")
  const [showSuccess, setShowSuccess] = React.useState(false)
  const isFetchingRef = React.useRef(false)
  const [lastUpdated, setLastUpdated] = React.useState<string>("")

  // Format a Date (or ISO string) to Indian Standard Time (IST)
  const formatIST = (dateInput: Date | string) => {
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(d)
  }

  // Fetch trusted time for IST (fallback to local clock if network fails)
  const getTrustedIST = React.useCallback(async (): Promise<string> => {
    try {
      const res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata", { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        // worldtimeapi returns ISO8601 in data.datetime
        return formatIST(data.datetime)
      }
    } catch {}
    // Fallback to local time coerced to IST
    return formatIST(new Date())
  }, [])

  React.useEffect(() => {
    // Check for success parameter
    if (searchParams.get("success") === "true") {
      setShowSuccess(true)
      // Remove success parameter from URL
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete("success")
      window.history.replaceState({}, "", newUrl.toString())
    }
  }, [searchParams])

  const fetchData = React.useCallback(async () => {
    if (isFetchingRef.current) return
    isFetchingRef.current = true
    try {
      setError("")
      const issuesData = await apiFetch("/users/my-issues", { method: "GET" })
      setIssues(Array.isArray(issuesData) ? issuesData : [])
    } catch (e: any) {
      setError(e?.message || "Failed to load data")
      setIssues([])
    } finally {
      isFetchingRef.current = false
    }
  }, [])

  React.useEffect(() => {
    const run = async () => {
      const token = typeof window !== "undefined" ? (localStorage.getItem("access_token") || localStorage.getItem("token")) : null
      if (!token) {
        window.location.href = "/login"
        return
      }
      try {
        setLoading(true)
        await fetchData()
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [fetchData])

  // Remove analytics auto-sync effects
  React.useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") fetchData()
    }
    const handleFocus = () => fetchData()

    document.addEventListener("visibilitychange", handleVisibility)
    window.addEventListener("focus", handleFocus)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility)
      window.removeEventListener("focus", handleFocus)
    }
  }, [fetchData])

  const formatDateTime = (iso: string) => {
    try { return new Date(iso).toLocaleString() } catch { return iso }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-12 pb-24">
      <h1 className="text-2xl font-bold mb-2">Home  </h1>
      <p className="text-sm text-gray-600 mb-6">Real-time list of your submitted complaints</p>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Complaint submitted successfully! Your complaint has been registered and assigned a tracking ID.
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                type="button"
                className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                onClick={() => setShowSuccess(false)}
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics section removed as requested */}

      {loading && <p className="text-gray-600">Loading...</p>}
      {!loading && error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800">All Track Issues</h2>
          {(issues || []).length === 0 ? (
            <div className="text-gray-600">No complaints found.</div>
          ) : (
            (issues || []).map((issue) => (
              <IssueCard
                key={issue.issue_id}
                id={String(issue.issue_id)}
                date={formatDateTime(issue.created_at as unknown as string)}
                status={issue.status === "in_progress" ? "In Progress" : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                image={issue.photo_url || undefined}
                category={issue.category}
                onClick={() => router.push(`/track_issue?id=${issue.issue_id}`)}
              />
            ))
          )}
        </div>
      )}

      <BottomNavbar />
    </div>
  )
}
