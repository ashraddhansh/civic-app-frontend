"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { apiFetch, type IssueResponse } from "@/lib/api"

export default function ComplaintPreviewPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // Get all stored data for preview
  const storedData = useMemo(() => {
    if (typeof window === "undefined") return null
    
    const imagesJson = localStorage.getItem("report_img_data_urls")
    const description = localStorage.getItem("pending_description") || ""
    const voiceDataUrl = localStorage.getItem("pending_voice_data_url")
    const locationDataJson = localStorage.getItem("selected_location_data")
    const issueType = localStorage.getItem("selected_issue_type") || "other"
    const issueNote = localStorage.getItem("selected_issue_note") || ""
    const issueOther = localStorage.getItem("selected_issue_other_text") || ""
    
    return {
      images: imagesJson ? JSON.parse(imagesJson) : [],
      description,
      voiceDataUrl,
      locationData: locationDataJson ? JSON.parse(locationDataJson) : null,
      issueType,
      issueNote,
      issueOther
    }
  }, [])

  const handleSubmit = async () => {
    if (!storedData) {
      setError("No complaint data found. Please start over.")
      return
    }

    if (storedData.images.length === 0) {
      setError("No images found. Please re-capture images.")
      return
    }

    if (!storedData.locationData) {
      setError("No location data found. Please select a location.")
      return
    }

    setSubmitting(true)
    setError("")

    try {
      const form = new FormData()
      form.append("title", storedData.description.slice(0, 60) || "Issue Report")
      form.append("description", storedData.description)
      form.append("category", storedData.issueType)
      
      // Add location data
      if (storedData.locationData.composedLocation) {
        form.append("location", storedData.locationData.composedLocation)
      }
      if (storedData.locationData.coords) {
        form.append("latitude", String(storedData.locationData.coords.lat))
        form.append("longitude", String(storedData.locationData.coords.lng))
      }

      // Add image (convert to PNG)
      try {
        const imgBlob = await (await fetch(storedData.images[0])).blob()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        
        await new Promise((resolve, reject) => {
          img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx?.drawImage(img, 0, 0)
            canvas.toBlob((blob) => {
              if (blob) {
                form.append("photo", blob, "photo.png")
                resolve(blob)
              } else {
                reject(new Error('Failed to convert image'))
              }
            }, 'image/png', 0.9)
          }
          img.onerror = reject
          img.src = storedData.images[0]
        })
      } catch (e) {
        console.error("Failed to process image:", e)
      }

      // Add voice note
      if (storedData.voiceDataUrl) {
        try {
          const vBlob = await (await fetch(storedData.voiceDataUrl)).blob()
          form.append("voice_note", vBlob, "voice.webm")
        } catch (e) {
          console.error("Failed to process voice note:", e)
        }
      }

      // Submit complaint
      const response = await apiFetch("/users/issues/with-files", {
        method: "POST",
        body: form
      })

      if (response && response.issue_id) {
        // Store the issue ID for tracking
        localStorage.setItem("last_issue_id", String(response.issue_id))
        
        // Clear all temporary data
        localStorage.removeItem("report_img_data_urls")
        localStorage.removeItem("pending_description")
        localStorage.removeItem("pending_voice_data_url")
        localStorage.removeItem("selected_location_data")
        localStorage.removeItem("selected_issue_type")
        localStorage.removeItem("selected_issue_note")
        localStorage.removeItem("selected_issue_other_text")
        
        // Navigate to home with success message
        router.push("/home?success=true")
      } else {
        throw new Error("Failed to create complaint")
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError("Failed to submit complaint. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (!storedData) {
    return (
      <div className="flex flex-col min-h-screen bg-white px-6 py-12">
        <h1 className="text-2xl font-bold mb-6">Complaint Preview</h1>
        <p className="text-red-600">No complaint data found. Please start over.</p>
        <button
          className="mt-4 h-12 rounded-md bg-blue-600 text-white font-semibold"
          onClick={() => router.push("/home")}
        >
          Go to Home
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Complaint Preview</h1>
      <p className="text-sm text-gray-600 mb-6">Review your complaint details before submitting</p>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">{error}</div>}

      {/* Images */}
      <div className="mb-6 rounded-xl border bg-gray-50 p-3">
        <div className="text-sm font-semibold mb-2">Attached Photos ({storedData.images.length})</div>
        <div className="grid grid-cols-2 gap-2">
          {storedData.images.map((img, index) => (
            <img key={index} src={img} alt={`Photo ${index + 1}`} className="w-full rounded-md border" />
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 rounded-xl border bg-gray-50 p-3">
        <div className="text-sm font-semibold mb-2">Description</div>
        <p className="text-gray-800 whitespace-pre-wrap">{storedData.description || "No description provided"}</p>
      </div>

      {/* Location */}
      <div className="mb-6 rounded-xl border bg-gray-50 p-3">
        <div className="text-sm font-semibold mb-2">Location</div>
        <div className="text-gray-800 mb-1">{storedData.locationData?.composedLocation || "Not provided"}</div>
        {storedData.locationData?.coords && (
          <div className="text-sm text-gray-600">
            Lat/Lng: {storedData.locationData.coords.lat.toFixed(6)}, {storedData.locationData.coords.lng.toFixed(6)}
          </div>
        )}
      </div>

      {/* Voice note */}
      <div className="mb-6 rounded-xl border bg-gray-50 p-3">
        <div className="text-sm font-semibold mb-2">Voice Note</div>
        {storedData.voiceDataUrl ? (
          <audio controls className="w-full">
            <source src={storedData.voiceDataUrl} />
          </audio>
        ) : (
          <div className="text-gray-500">No voice note attached</div>
        )}
      </div>

      {/* Issue type */}
      <div className="mb-6 rounded-xl border bg-gray-50 p-3">
        <div className="text-sm font-semibold mb-2">Issue Type</div>
        <div className="text-gray-800 capitalize">{storedData.issueType}</div>
        {(storedData.issueOther || storedData.issueNote) && (
          <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
            {storedData.issueOther ? `Other: ${storedData.issueOther}` : null}
            {storedData.issueOther && storedData.issueNote ? "\n" : null}
            {storedData.issueNote}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-4">
        <button
          className="flex-1 h-12 rounded-md bg-gray-200 text-gray-700 font-semibold"
          type="button"
          onClick={() => router.push("/home")}
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          className="flex-1 h-12 rounded-md bg-blue-600 text-white font-semibold disabled:opacity-50"
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Complaint"}
        </button>
      </div>
    </div>
  )
}


