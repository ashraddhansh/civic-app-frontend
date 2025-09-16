"use client"

import React, { useEffect, useMemo, useState } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Circle } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix default icon paths for Leaflet when bundling
// Safely remove internal icon function if present (types may not expose it)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

type LatLng = { lat: number; lng: number }
type MapPickerProps = {
  onPick: (lat: number, lng: number) => void
  center?: LatLng | null
  initialCenter?: LatLng
}

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

function CenterUpdater({ center, zoom }: { center: LatLng; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

export default function MapPicker({ onPick, center, initialCenter }: MapPickerProps) {
  const [position, setPosition] = useState<LatLng | null>(center || initialCenter || null)
  const [zoom, setZoom] = useState<number>(13)
  const [accuracyMeters, setAccuracyMeters] = useState<number | null>(null)
  const [geoError, setGeoError] = useState<string>("")

  useEffect(() => {
    if (center) setPosition(center)
    else if (initialCenter) setPosition(initialCenter)
  }, [center, initialCenter])

  // Try geolocation once for a better initial center
  useEffect(() => {
    if (position) return
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          const lat = res.coords.latitude
          const lng = res.coords.longitude
          setPosition({ lat, lng })
          onPick(lat, lng)
        },
        () => {
          // ignore errors; default center will be used
        },
        { enableHighAccuracy: true, timeout: 5000 }
      )
    }
  }, [position, onPick])

  const effectiveCenter = useMemo(() => position || { lat: 28.6139, lng: 77.2090 }, [position])
  const handleGeolocate = () => {
    setGeoError("")
    if (typeof window === "undefined") return
    const isSecure = window.location.protocol === "https:" || window.location.hostname === "localhost"
    if (!isSecure) {
      setGeoError("Geolocation requires HTTPS (or localhost). Please use a secure origin.")
      return
    }
    if (!("geolocation" in navigator)) {
      setGeoError("Geolocation not supported on this device/browser.")
      return
    }
    navigator.geolocation.getCurrentPosition(
      (res) => {
        const lat = res.coords.latitude
        const lng = res.coords.longitude
        setPosition({ lat, lng })
        setAccuracyMeters(Number.isFinite(res.coords.accuracy) ? res.coords.accuracy : null)
        setZoom(17)
        onPick(lat, lng)
      },
      (err) => {
        if (err.code === 1) setGeoError("Permission denied. Enable location access and try again.")
        else if (err.code === 2) setGeoError("Position unavailable. Try again in an open area.")
        else if (err.code === 3) setGeoError("Geolocation timed out. Please try again.")
        else setGeoError("Failed to get current location.")
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    )
  }

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <MapContainer center={effectiveCenter} zoom={zoom} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onPick={(lat, lng) => { setPosition({ lat, lng }); onPick(lat, lng) }} />
        {position && <Marker position={position} draggable eventHandlers={{ dragend: (e: L.LeafletEvent) => {
          const m = e.target as L.Marker
          const ll = m.getLatLng()
          setPosition({ lat: ll.lat, lng: ll.lng })
          onPick(ll.lat, ll.lng)
        } }} />}
        {position && accuracyMeters && (
          <Circle center={position} radius={accuracyMeters} pathOptions={{ color: "#2563eb", fillColor: "#60a5fa", fillOpacity: 0.2 }} />
        )}
        {position && <CenterUpdater center={position} zoom={zoom} />}
      </MapContainer>
      <button
        type="button"
        onClick={handleGeolocate}
        style={{ position: "absolute", right: 12, bottom: 12, zIndex: 1000 }}
        className="h-10 px-3 rounded-md bg-white/90 border shadow text-sm font-medium"
        aria-label="Use my current location"
      >
        Use my location
      </button>
      {geoError && (
        <div
          style={{ position: "absolute", left: 12, bottom: 12, zIndex: 1000 }}
          className="px-3 py-2 rounded-md bg-white/90 border text-sm text-red-600"
        >
          {geoError}
        </div>
      )}
    </div>
  )
}


