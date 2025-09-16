"use client"
import React from "react"
import { useRouter } from "next/navigation"

export default function SelectIssueTypePage() {
	const router = useRouter()
	const [selected, setSelected] = React.useState<string>("Potholes")
	const [note, setNote] = React.useState("")
	const [otherText, setOtherText] = React.useState("")
	const [error, setError] = React.useState("")
	return (
		<div className="flex flex-col min-h-screen bg-white px-6 py-12">
			<h1 className="text-2xl font-bold mb-8">Select Type of Issue</h1>
					{/* Issue type selection radio buttons */}
					<form className="flex flex-col gap-4 mb-4">
						{[
							"Potholes",
							"Street Lights",
							"Garbage Collection",
							"Water Supply",
							"Road Blockage",
							"Other"
						].map((issue) => (
							<label key={issue} className="flex items-center gap-3 text-lg font-medium bg-gray-50 rounded-md px-4 py-3 border border-gray-200 cursor-pointer">
								<input
									type="radio"
									name="issueType"
									value={issue}
									className="accent-blue-600 w-5 h-5"
									checked={selected === issue}
									onChange={() => { setSelected(issue); if (issue !== "Other") setOtherText("") }}
								/>
								{issue}
							</label>
						))}
					</form>

					{selected === "Other" && (
						<div className="mb-4">
							<label className="mb-2 block text-base font-semibold text-gray-800">Specify the problem (required)</label>
							<input
								type="text"
								placeholder="Describe the issue (e.g., Broken signboard)"
								value={otherText}
								onChange={(e) => setOtherText(e.target.value)}
								className="h-11 w-full text-base px-4 border rounded-md bg-white"
							/>
						</div>
					)}

									<label htmlFor="issue-description" className="mb-2 text-lg font-semibold text-gray-800">Describe the Type of Issue</label>
									<textarea
										id="issue-description"
										placeholder="Enter details..."
										className="mb-8 h-32 text-lg px-4 py-3 border rounded-md bg-gray-100 text-gray-700 font-medium w-full resize-none"
										value={note}
										onChange={(e) => setNote(e.target.value)}
									/>

									{error && <p className="text-sm text-red-600 mb-2">{error}</p>}

									{/* Bottom buttons */}
									<div className="flex w-full gap-4 mt-auto">
										<button
											className="flex-1 h-12 rounded-md bg-gray-200 text-gray-700 font-semibold"
											type="button"
											onClick={() => router.back()}
										>
											Back
										</button>
										<button
											className="flex-1 h-12 rounded-md bg-blue-600 text-white font-semibold"
											type="button"
											onClick={() => {
												setError("")
												if (selected === "Other" && otherText.trim().length < 3) {
													setError("Please specify the problem for 'Other'.")
													return
												}
												try {
													const mapping: Record<string, string> = {
														"Potholes": "road",
														"Street Lights": "electricity",
														"Garbage Collection": "waste",
														"Water Supply": "water",
														"Road Blockage": "infrastructure",
														"Other": "other",
													}
													const backendCategory = mapping[selected] || "other"
													localStorage.setItem("selected_issue_type", backendCategory)
													localStorage.setItem("selected_issue_note", note)
													if (selected === "Other") {
														localStorage.setItem("selected_issue_other_text", otherText)
													} else {
														localStorage.removeItem("selected_issue_other_text")
													}
												} catch {}
												// Navigate to preview page
												router.push("/preview")
											}}
										>
											Continue
										</button>
									</div>
		</div>
	)
}


