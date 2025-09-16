"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type CapturedImage = {
  blob: Blob
  url: string
  dataUrl: string
}

export default function ReportCapturePage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [error, setError] = useState<string>("")
  const [images, setImages] = useState<CapturedImage[]>([])
  const [isStarting, setIsStarting] = useState<boolean>(true)

  useEffect(() => {
    const start = async () => {
      setError("")
      setIsStarting(true)
      try {
        const constraints: MediaStreamConstraints = {
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
      } catch (e) {
        setError("Camera access failed. Please allow camera permissions and try again.")
      } finally {
        setIsStarting(false)
      }
    }
    start()
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
    }
  }, [])

  const capture = async () => {
    if (!videoRef.current) return
    const video = videoRef.current
    const width = video.videoWidth
    const height = video.videoHeight
    if (!width || !height) return

    const canvas = canvasRef.current || document.createElement("canvas")
    canvasRef.current = canvas
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(video, 0, 0, width, height)
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png", 0.9))
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const dataUrl = canvas.toDataURL("image/png", 0.9)
    setImages((prev) => [...prev, { blob, url, dataUrl }])
  }

  const removeAt = (idx: number) => {
    setImages((prev) => {
      const copy = [...prev]
      const [removed] = copy.splice(idx, 1)
      if (removed) URL.revokeObjectURL(removed.url)
      return copy
    })
  }

  const total = useMemo(() => images.length, [images])

  const handleContinue = () => {
    if (images.length === 0) {
      setError("Please capture at least one photo to continue")
      return
    }
    try {
      const dataUrls = images.map((i) => i.dataUrl)
      localStorage.setItem("report_img_data_urls", JSON.stringify(dataUrls))
    } catch {}
    router.push("/add_description")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Capture Photos</h1>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      {/* Portrait-oriented preview container for mobile */}
      <div className="mb-4 rounded-xl overflow-hidden border bg-black w-full max-w-sm mx-auto aspect-[9/16]">
        <video
          ref={videoRef}
          playsInline
          muted
          className="w-full h-full object-cover bg-black"
        />
      </div>

      <div className="flex gap-3 mb-5">
        <Button className="h-12" onClick={capture} disabled={isStarting}>
          {isStarting ? "Starting camera..." : "Capture"}
        </Button>
      </div>

      {total > 0 && (
        <div className="mb-5 text-sm text-gray-700">Captured: {total}</div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-8">
        {images.map((img, idx) => (
          <div key={img.url} className="relative group border rounded-md overflow-hidden bg-gray-100">
            <img src={img.url} alt={`captured-${idx}`} className="w-full h-28 object-cover" />
            <button
              type="button"
              onClick={() => removeAt(idx)}
              className="absolute top-1 right-1 bg-white/90 border text-xs px-2 py-1 rounded shadow"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-auto flex gap-4">
        <Button
          variant="outline"
          className="flex-1 h-12"
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button className="flex-1 h-12" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}


