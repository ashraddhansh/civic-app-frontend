"use client"
import React from "react"

export default function PreviewImagePage() {
	// Placeholder image src
	const imageSrc = "/placeholder.png"
	return (
		<div className="flex flex-col min-h-screen bg-white px-6 py-12">
			{/* Image viewport 4:3 ratio */}
					<div className="flex items-center justify-center rounded-xl border border-gray-300 bg-gray-50 mb-8 aspect-[9/16] w-full max-w-xs mx-auto">
						<img
							src={imageSrc}
							alt="Preview"
							className="object-contain rounded-xl w-full h-full"
						/>
					</div>

			{/* Bottom buttons */}
			<div className="flex w-full gap-4 mt-auto">
				<button
					className="flex-1 h-12 rounded-md bg-gray-200 text-gray-700 font-semibold"
					type="button"
				>
					Retake
				</button>
				<button
					className="flex-1 h-12 rounded-md bg-blue-600 text-white font-semibold"
					type="button"
				>
					Continue
				</button>
			</div>
		</div>
	)
}
