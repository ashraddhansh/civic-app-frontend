"use client"
import { BottomNavbar } from "../components/BottomNavBar"
import React from "react"

export default function IssueDetailsPage() {
	// Placeholder image src and issue ID
	const imageSrc = "/placeholder.png"
	const issueId = "ABC12345"
	return (
		<div className="flex flex-col min-h-screen bg-white px-6 py-12 pb-28">
	<BottomNavbar />
			<h1 className="text-2xl font-bold mb-8">Issue Details</h1>

			{/* Image viewport 9:16 ratio */}
			<div className="flex items-center justify-center rounded-xl border border-gray-300 bg-gray-50 mb-8 aspect-[9/16] w-full max-w-xs mx-auto">
				<img
					src={imageSrc}
					alt="Issue Preview"
					className="object-contain rounded-xl w-full h-full"
				/>
			</div>

			{/* Issue submitted card */}
			<div className="flex items-center gap-4 bg-gray-50 rounded-xl border border-gray-200 px-6 py-5 mb-8">
				{/* Circled check icon */}
				<span className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100">
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="16" cy="16" r="16" fill="#22c55e" />
						<path d="M10 17l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</span>
				<div className="flex flex-col">
					<span className="text-lg font-semibold text-gray-800">Your Issue is Submitted:</span>
					<span className="text-base text-gray-600 font-medium">Issue ID: <span className="text-blue-600 font-bold">{issueId}</span></span>
				</div>
			</div>

			{/* Track Issue button */}
			<button
				className="h-12 w-full rounded-md bg-blue-600 text-white font-semibold text-lg"
				type="button"
			>
				Track Issue
			</button>
		</div>
	)
}
