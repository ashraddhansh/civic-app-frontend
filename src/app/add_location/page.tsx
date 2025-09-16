
"use client"
import React from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const DynamicMapPicker = dynamic(() => import("./ui/MapPicker"), { ssr: false })

export default function AddLocationPage() {
		const router = useRouter()
		// Example state for location
		const [location, setLocation] = React.useState("Drop a pin on the map")
		const [coords, setCoords] = React.useState<{ lat: number; lng: number } | null>(null)
        const [revLoading, setRevLoading] = React.useState(false)
        const [area, setArea] = React.useState("") // colony/area name
        const [city, setCity] = React.useState("")
        const [district, setDistrict] = React.useState("")
        const [stateName, setStateName] = React.useState("")
        const [pincode, setPincode] = React.useState("")
        const [landmark, setLandmark] = React.useState("")
        const [addressLine, setAddressLine] = React.useState("")
        const [error, setError] = React.useState("")
        const [query, setQuery] = React.useState("")
        const [results, setResults] = React.useState<Array<{ display_name: string; lat: string; lon: string }>>([])
        const [loadingSearch, setLoadingSearch] = React.useState(false)

		const handlePick = (lat: number, lng: number) => {
			setCoords({ lat, lng })
			setLocation(`Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`)
			try { localStorage.setItem("selected_coords", JSON.stringify({ lat, lng })) } catch {}
			// Reverse geocode for address suggestions
			reverseGeocode(lat, lng)
		}

        const reverseGeocode = async (lat: number, lng: number) => {
            setRevLoading(true)
            setError("")
            try {
                const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`
                const res = await fetch(url, { headers: { "Accept": "application/json" } })
                const data = await res.json()
                const addr = data?.address || {}
                // Best-effort mapping
                const derivedArea = addr.neighbourhood || addr.suburb || addr.locality || addr.village || addr.town || ""
                const derivedCity = addr.city || addr.town || addr.village || addr.municipality || addr.county || ""
                const derivedDistrict = addr.city_district || addr.state_district || addr.district || ""
                const derivedState = addr.state || ""
                const derivedPostcode = addr.postcode || ""
                const display = data?.display_name || ""

                setArea(derivedArea)
                setCity(derivedCity)
                setDistrict(derivedDistrict)
                setStateName(derivedState)
                setPincode(derivedPostcode)
                if (!addressLine && display) setAddressLine(display)
            } catch (e) {
                setError("Failed to fetch address details. You can fill them manually.")
            } finally {
                setRevLoading(false)
            }
        }

        const handleSearch = async (e: React.FormEvent) => {
            e.preventDefault()
            if (!query.trim()) return
            setLoadingSearch(true)
            setResults([])
            try {
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
                const res = await fetch(url, {
                    headers: { "Accept": "application/json" },
                })
                const data = await res.json()
                setResults(data || [])
            } catch (err) {
                // ignore
            } finally {
                setLoadingSearch(false)
            }
        }

        const handleSelectResult = (r: { display_name: string; lat: string; lon: string }) => {
            const lat = parseFloat(r.lat)
            const lng = parseFloat(r.lon)
            setQuery(r.display_name)
            setResults([])
            handlePick(lat, lng)
        }

		return (
			<div className="flex flex-col min-h-screen bg-white px-6 py-12">
				<h1 className="text-2xl font-bold mb-8">Select Location</h1>

				{/* Location text box */}
				<input
					type="text"
					value={location}
					readOnly
					className="mb-4 h-12 text-lg px-4 border rounded-md bg-gray-100 text-gray-700 font-medium"
				/>

				{/* Search bar */}
				<form onSubmit={handleSearch} className="mb-2 flex gap-2">
					<input
						type="text"
						placeholder="Search a place (e.g., Kolkata, Park Street)"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="flex-1 h-11 text-base px-4 border rounded-md"
					/>
					<button className="h-11 px-4 rounded-md bg-blue-600 text-white font-semibold" type="submit" disabled={loadingSearch}>
						{loadingSearch ? "Searching..." : "Search"}
					</button>
				</form>
				{results.length > 0 && (
					<div className="mb-3 border rounded-md max-h-56 overflow-auto bg-white">
						{results.map((r) => (
							<button
								key={`${r.lat},${r.lon}`}
								type="button"
								onClick={() => handleSelectResult(r)}
								className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b last:border-b-0"
							>
								{r.display_name}
							</button>
						))}
					</div>
				)}

				{/* Map viewport (fixed height to ensure visibility) */}
				<div className="mb-8 rounded-xl border border-gray-300 overflow-hidden w-full" style={{ height: 400 }}>
					<DynamicMapPicker onPick={handlePick} center={coords} initialCenter={coords || undefined} />
				</div>

				{/* Selected coordinates */}
				<div className="mb-3 text-sm text-gray-700">
					<strong>Coordinates:</strong>{" "}
					{coords ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : "Not selected"}
					{revLoading ? <span className="ml-2 text-gray-500">(resolving address...)</span> : null}
				</div>

				{/* Auto-filled address preview */}
				<div className="mb-4 text-sm text-gray-600">
					{error ? <span className="text-red-600">{error}</span> : null}
				</div>

				{/* Editable address fields */}
				<div className="grid grid-cols-1 gap-3 mb-6">
					<input
						type="text"
						placeholder="Address (street, house no.)"
						value={addressLine}
						onChange={(e) => setAddressLine(e.target.value)}
						className="h-11 text-base px-3 border rounded-md"
					/>
					<input
						type="text"
						placeholder="Nearby landmark (optional)"
						value={landmark}
						onChange={(e) => setLandmark(e.target.value)}
						className="h-11 text-base px-3 border rounded-md"
					/>
					<input
						type="text"
						placeholder="Area / Colony"
						value={area}
						onChange={(e) => setArea(e.target.value)}
						className="h-11 text-base px-3 border rounded-md"
					/>
					<div className="grid grid-cols-1 gap-3">
						<input
							type="text"
							placeholder="City (required)"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							className="h-11 text-base px-3 border rounded-md"
						/>
						<input
							type="text"
							placeholder="District (required)"
							value={district}
							onChange={(e) => setDistrict(e.target.value)}
							className="h-11 text-base px-3 border rounded-md"
						/>
						<input
							type="text"
							placeholder="State"
							value={stateName}
							onChange={(e) => setStateName(e.target.value)}
							className="h-11 text-base px-3 border rounded-md"
						/>
						<input
							type="text"
							placeholder="Pincode (required)"
							value={pincode}
							onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
							className="h-11 text-base px-3 border rounded-md"
						/>
					</div>
				</div>

				{/* Bottom buttons */}
				<div className="flex w-full gap-4">
					<button
						className="flex-1 h-12 rounded-md bg-gray-200 text-gray-700 font-semibold"
						type="button"
					>
						Back
					</button>
					<button
						className="flex-1 h-12 rounded-md bg-blue-600 text-white font-semibold disabled:opacity-50"
						type="button"
						disabled={!coords || !city || !district || !pincode}
						onClick={() => {
							// Save location data to localStorage for later use
							const locationData = {
								coords,
								addressLine,
								landmark,
								area,
								city,
								district,
								stateName,
								pincode,
								composedLocation: [addressLine, landmark, area, city, district, stateName, pincode].filter(Boolean).join(", ")
							}
							
							try {
								localStorage.setItem("selected_location_data", JSON.stringify(locationData))
							} catch (e) {
								console.error("Failed to save location data:", e)
							}
							
							// Navigate to select issue type
							router.push("/select_issue_type")
						}}
					>
						Continue
					</button>
				</div>
			</div>
		)
}
