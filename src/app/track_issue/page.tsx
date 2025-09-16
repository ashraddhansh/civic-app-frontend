"use client"
import { BottomNavbar } from "../components/BottomNavBar"
import React, { useEffect, useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getIssueById, type IssueResponse, apiFetch } from "@/lib/api"

type IssueListResponse = {
	issue_id: number
	title: string
	category: string
	status: string
	priority: string
	created_at: string
	location?: string | null
}

export default function TrackIssuePage() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const issueId = useMemo(() => searchParams?.get("id"), [searchParams])

	const [issue, setIssue] = useState<IssueResponse | null>(null)
	const [issues, setIssues] = useState<IssueListResponse[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [listLoading, setListLoading] = useState<boolean>(true)
	const [error, setError] = useState<string>("")
	const [showList, setShowList] = useState<boolean>(!issueId)

	useEffect(() => {
		const token = typeof window !== "undefined" ? (localStorage.getItem("access_token") || localStorage.getItem("token")) : null
		if (!token) {
			router.push("/login")
			return
		}

		// Load issues list
		const loadIssues = async () => {
			try {
				setListLoading(true)
				const data = await apiFetch("/users/my-issues", { method: "GET" })
				setIssues(Array.isArray(data) ? data : [])
				} catch (e) {
					if (e instanceof Error) {
						setError(e.message)
					} else {
						setError("Failed to load issues")
					}
			} finally {
				setListLoading(false)
			}
		}

		loadIssues()

		// Load specific issue if ID provided
		if (issueId) {
			setShowList(false)
			setLoading(true)
			setError("")
				getIssueById(issueId)
					.then((data) => setIssue(data))
					.catch((e) => {
						if (e instanceof Error) {
							setError(e.message)
						} else {
							setError("Failed to load issue")
						}
					})
					.finally(() => setLoading(false))
		} else {
			setShowList(true)
			setLoading(false)
		}
	}, [issueId, router])

	const steps = useMemo(() => {
		const status = issue?.status || "pending"
		const allSteps = [
			{ label: "Submitted", key: "submitted" },
			{ label: "Under Review", key: "under_review" },
			{ label: "Work in Progress", key: "in_progress" },
			{ label: "Resolved", key: "resolved" },
		] as const

		let activeIdx = 0
		switch (status) {
			case "pending":
				activeIdx = 1
				break
			case "in_progress":
				activeIdx = 2
				break
			case "resolved":
				activeIdx = 3
				break
			case "rejected":
				activeIdx = 1
				break
			default:
				activeIdx = 0
		}

		return allSteps.map((s, idx) => ({
			label: s.label,
			idx,
			active: idx === activeIdx,
			done: idx < activeIdx,
		}))
	}, [issue])

	// Collect all available photo URLs for gallery (supports future arrays)
	const photoUrls: string[] = useMemo(() => {
		const urls: string[] = []
		if (issue?.photo_url) urls.push(issue.photo_url)
		const anyIssue = issue as { photo_urls?: string[]; additional_photos?: string[]; photo_url?: string }
		if (anyIssue?.photo_urls?.length) urls.push(...anyIssue.photo_urls.filter(Boolean))
		if (anyIssue?.additional_photos?.length) urls.push(...anyIssue.additional_photos.filter(Boolean))
		return Array.from(new Set(urls))
	}, [issue])

	const formatDateTime = (iso: string) => {
		try { return new Date(iso).toLocaleString() } catch { return iso }
	}

	const getStatusColor = (status: string) => {
		switch (status) {
			case "pending": return "text-yellow-600 bg-yellow-100"
			case "in_progress": return "text-blue-600 bg-blue-100"
			case "resolved": return "text-green-600 bg-green-100"
			case "rejected": return "text-red-600 bg-red-100"
			default: return "text-gray-600 bg-gray-100"
		}
	}

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "urgent": return "text-red-600 bg-red-100"
			case "high": return "text-orange-600 bg-orange-100"
			case "medium": return "text-yellow-600 bg-yellow-100"
			case "low": return "text-green-600 bg-green-100"
			default: return "text-gray-600 bg-gray-100"
		}
	}

	return (
		<div className="flex flex-col min-h-screen bg-white px-6 py-12 pb-28">
	<BottomNavbar />
			<h1 className="text-2xl font-bold mb-2">Track Issue</h1>

			{showList ? (
				<>
					{/* Issues List */}
					<div className="mb-6">
						<p className="text-sm text-gray-600 mb-4">Select a complaint to track its status</p>
						
						{listLoading && <p className="text-gray-600">Loading complaints...</p>}
						{!listLoading && error && <p className="text-red-600">{error}</p>}
						
						{!listLoading && !error && (
							<div className="flex flex-col gap-3">
								{issues.length === 0 ? (
									<div className="text-gray-600 text-center py-8">No complaints found</div>
								) : (
									issues.map((item) => (
										<div
											key={item.issue_id}
											className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-start gap-3"
											onClick={() => router.push(`/track_issue?id=${item.issue_id}`)}
										>
											{('photo_url' in item && item.photo_url) ? (
												<img src={item.photo_url as string} alt="thumb" className="w-16 h-16 object-cover rounded border" />
											) : (
												<div className="w-16 h-16 bg-gray-100 rounded border" />
											)}
											<div className="flex-1">
												<div className="flex justify-between items-start mb-2">
													<h3 className="font-semibold text-gray-800">{item.title}</h3>
													<span className="text-sm text-gray-500">#{item.issue_id}</span>
												</div>
											
											<div className="flex flex-wrap gap-2 mb-2">
												<span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
													{item.status.charAt(0).toUpperCase() + item.status.slice(1)}
												</span>
												<span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
													{item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
												</span>
												<span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
													{item.category}
												</span>
											</div>
											
											<div className="text-sm text-gray-600">
												<div>Created: {formatDateTime(item.created_at)}</div>
												{item.location && <div>Location: {item.location}</div>}
											</div>
											</div>
										</div>
									))
								)}
							</div>
						)}
					</div>
				</>
			) : (
				<>
					{/* Issue Details */}
					{issue && (
						<div className="mb-4">
							<button
								onClick={() => setShowList(true)}
								className="text-blue-600 text-sm mb-2"
							>
								← Back to complaints list
							</button>
							<p className="text-sm text-gray-500">Issue ID: {issue.issue_id}</p>
						</div>
					)}

					{loading && <p className="text-gray-600">Loading issue...</p>}
					{!loading && error && (
						<p className="text-red-600">{error}</p>
					)}

					{!loading && !error && issue && (
						<>
							{/* Issue Details Card */}
							<div className="mb-6 border rounded-lg p-4 bg-gray-50">
								<h2 className="font-semibold text-lg mb-2">{issue.title}</h2>
								<p className="text-gray-700 mb-3">{issue.description}</p>
								
								<div className="flex flex-wrap gap-2 mb-3">
									<span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
										{issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
									</span>
									<span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
										{issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
									</span>
									<span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
										{issue.category}
									</span>
								</div>
								
								{issue.location && (
									<div className="text-sm text-gray-600 mb-2">
										<strong>Location:</strong> {issue.location}
									</div>
								)}
								
								<div className="text-sm text-gray-600">
									<div>Created: {formatDateTime(issue.created_at as unknown as string)}</div>
									<div>Updated: {formatDateTime(issue.updated_at as unknown as string)}</div>
								</div>
							</div>

							{/* Photos Gallery */}
							<div className="mb-8">
								<h3 className="font-semibold mb-4">Attached Photos</h3>
								{photoUrls && photoUrls.length > 0 ? (
									<div className="grid grid-cols-2 gap-3">
										{photoUrls.map((url) => (
											<div key={url} className="relative rounded-lg overflow-hidden border bg-gray-100 group">
												<img
													src={url}
													alt="Issue Photo"
													className="w-full h-32 object-cover cursor-pointer hover:opacity-90 transition-opacity"
													onClick={() => window.open(url, '_blank')}
												/>
												<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
													<span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
														Click to view full size
													</span>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="text-gray-500 text-center py-8 border rounded-lg bg-gray-50">
										No photos attached
									</div>
								)}
							</div>

							{/* Voice Note */}
							{issue.voice_note_url && (
								<div className="mb-6">
									<h3 className="font-semibold mb-2">Voice Note</h3>
									<audio controls className="w-full">
										<source src={issue.voice_note_url} />
									</audio>
								</div>
							)}

							{/* Progress Stepper */}
							<div className="flex flex-col items-center mb-8">
								<h3 className="font-semibold mb-4">Progress Status</h3>
								{steps.map((step) => (
											<div key={step.label} className="flex items-center w-full max-w-xs">
												<div className="flex flex-col items-center">
											<div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold ${
												step.active
													? "bg-blue-600 border-blue-600 text-white"
													: step.done
														? "bg-green-500 border-green-500 text-white"
														: "bg-gray-200 border-gray-300 text-gray-600"
												}` }>
												{step.idx + 1}
													</div>
											{step.idx < steps.length - 1 && (
												<div className={`w-1 h-8 mx-auto ${step.done ? "bg-green-400" : "bg-gray-300"}`} />
													)}
												</div>
												<span className="ml-4 text-lg font-semibold text-gray-700">{step.label}</span>
											</div>
										))}
							</div>
						</>
					)}
				</>
			)}
		</div>
	)
}
