"use client"
import React from "react"
import { apiFetch } from "@/lib/api"

type RecordingState = "idle" | "recording" | "stopped"

export default function AddDescriptionPage() {
	const [mode, setMode] = React.useState<'written' | 'voice'>('written')
	const [imageUrls, setImageUrls] = React.useState<string[]>([])
	const [description, setDescription] = React.useState("")
	const [recordingState, setRecordingState] = React.useState<RecordingState>("idle")
	const [recordStartTs, setRecordingStartTs] = React.useState<number | null>(null)
	const [elapsedMs, setElapsedMs] = React.useState<number>(0)
	const mediaRecorderRef = React.useRef<MediaRecorder | null>(null)
	const audioChunksRef = React.useRef<Blob[]>([])
	const [voiceBlob, setVoiceBlob] = React.useState<Blob | null>(null)
	const [submitting, setSubmitting] = React.useState(false)
	const [error, setError] = React.useState("")

	React.useEffect(() => {
		try {
			const dataUrlsJson = localStorage.getItem("report_img_data_urls")
			if (!dataUrlsJson) return
			const urls: string[] = JSON.parse(dataUrlsJson)
			setImageUrls(urls)
		} catch {}
	}, [])

	const toggleRecording = async () => {
		if (recordingState === "recording") {
			mediaRecorderRef.current?.stop()
			setRecordingState("stopped")
			setRecordingStartTs(null)
			setElapsedMs(0)
			return
		}

		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
			const recorder = new MediaRecorder(stream)
			mediaRecorderRef.current = recorder
			audioChunksRef.current = []
			recorder.ondataavailable = (e) => {
				if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data)
			}
			recorder.onstop = () => {
				const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
				setVoiceBlob(blob)
				// stop tracks
				stream.getTracks().forEach((t) => t.stop())
			}
			recorder.start()
			setRecordingState("recording")
			setRecordingStartTs(Date.now())
		} catch (e) {
			setError("Microphone access failed. Please allow permission.")
		}
	}

	// Tick timer while recording
	React.useEffect(() => {
		if (recordingState !== "recording" || !recordStartTs) return
		const id = window.setInterval(() => {
			setElapsedMs(Date.now() - recordStartTs)
		}, 200)
		return () => window.clearInterval(id)
	}, [recordingState, recordStartTs])

	const formatElapsed = (ms: number) => {
		const totalSeconds = Math.floor(ms / 1000)
		const m = Math.floor(totalSeconds / 60)
		const s = totalSeconds % 60
		const mm = String(m).padStart(2, '0')
		const ss = String(s).padStart(2, '0')
		return `${mm}:${ss}`
	}

	const handleSubmit = async () => {
		setError("")
		if (imageUrls.length === 0) {
			setError("Please attach at least one photo")
			return
		}
		if (description.trim().length < 10 && !voiceBlob) {
			setError("Add a description (min 10 chars) or a voice note")
			return
		}

		setSubmitting(true)
		try {
			// Persist data for next step (location selection)
			localStorage.setItem("pending_description", description)
			if (voiceBlob) {
				// store as data URL for portability
				const reader = new FileReader()
				const dataUrl: string = await new Promise((resolve, reject) => {
					reader.onerror = () => reject(new Error("Failed to read voice note"))
					reader.onload = () => resolve(String(reader.result))
					reader.readAsDataURL(voiceBlob)
				})
				localStorage.setItem("pending_voice_data_url", dataUrl)
			} else {
				localStorage.removeItem("pending_voice_data_url")
			}
			// Navigate to pick live location; upload happens there
			window.location.href = "/add_location"
		   } catch (e) {
			   if (e instanceof Error) {
				   setError(e.message)
			   } else {
				   setError("Failed to proceed")
			   }
		} finally {
			setSubmitting(false)
		}
	}
	return (
		<div className="flex flex-col min-h-screen bg-white px-6 py-12">
			<h1 className="text-2xl font-bold mb-8">Add Description</h1>

			{/* Photo viewport */}
			<div className="mb-8 rounded-xl border border-gray-300 bg-gray-50 p-3">
				{imageUrls.length === 0 ? (
					<div className="flex items-center justify-center" style={{ minHeight: 220 }}>
						<span className="text-gray-400">No photos attached yet</span>
					</div>
				) : (
					<div className="grid grid-cols-3 gap-3">
						{imageUrls.map((url, idx) => (
							<div key={`${url}-${idx}`} className="relative rounded-md overflow-hidden border bg-white">
								<img src={url} alt={`attached-${idx}`} className="w-full h-28 object-cover" />
							</div>
						))}
					</div>
				)}
			</div>

			{error && <p className="text-sm text-red-600 mb-3">{error}</p>}

			{/* Menu bar for description type */}
			<div className="mb-6 flex rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
				<button
					className={`flex-1 py-3 text-lg font-semibold transition-colors ${mode === 'written' ? 'bg-white text-blue-600' : 'text-gray-500'}`}
					onClick={() => setMode('written')}
					type="button"
				>
					Description
				</button>
				<button
					className={`flex-1 py-3 text-lg font-semibold transition-colors ${mode === 'voice' ? 'bg-white text-blue-600' : 'text-gray-500'}`}
					onClick={() => setMode('voice')}
					type="button"
				>
					Voice Note
				</button>
			</div>

			{/* Written Description UI */}
			{mode === 'written' && (
				<textarea
					className="w-full h-32 p-4 text-lg border rounded-lg bg-gray-50 resize-none mb-8"
					placeholder="Type your description here..."
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			)}

			{/* Voice Note UI (waveform placeholder + record/stop button) */}
			{mode === 'voice' && (
				<div className="w-full min-h-32 flex flex-col border rounded-lg bg-gray-50 mb-8 px-4 py-3">
					{/* Waveform UI (placeholder) */}
					<div className="flex-1 flex items-center h-20">
						{/* Simple waveform bars */}
						{[...Array(24)].map((_, i) => (
							<div
								key={i}
								className="w-1 mx-0.5 rounded bg-blue-300"
								style={{ height: `${8 + Math.abs(12 - i) * 4}px` }}
							/>
						))}
					</div>
					{/* Record/Stop icon button */}
					<div className="mt-3 flex items-center gap-3">
						<button
							className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white shadow"
							type="button"
							aria-label="Record or Stop"
							onClick={toggleRecording}
						>
							{/* SVG for record/stop icon */}
							<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="14" cy="14" r="12" fill="currentColor" />
								{recordingState === 'recording' ? (
									<rect x="9" y="9" width="10" height="10" rx="2" fill="white" />
								) : (
									<circle cx="14" cy="14" r="6" fill="white" />
								)}
							</svg>
						</button>
						<span className="text-sm font-medium text-gray-700">
							{recordingState === 'recording' ? `Recording ${formatElapsed(elapsedMs)}` : voiceBlob ? 'Recorded' : 'Tap to record'}
						</span>
					</div>
					{voiceBlob && (
						<div className="mt-3">
							<audio controls className="w-full">
								<source src={URL.createObjectURL(voiceBlob)} />
							</audio>
						</div>
					)}
				</div>
			)}

			{/* Bottom buttons */}
			<div className="flex w-full gap-4 mt-auto">
				<button
					className="flex-1 h-12 rounded-md bg-gray-200 text-gray-700 font-semibold"
					type="button"
				>
					Back
				</button>
				<button
					className="flex-1 h-12 rounded-md bg-blue-600 text-white font-semibold disabled:opacity-50"
					type="button"
					disabled={submitting}
					onClick={handleSubmit}
				>
					{submitting ? 'Submitting...' : 'Continue'}
				</button>
			</div>
		</div>
	)
}
