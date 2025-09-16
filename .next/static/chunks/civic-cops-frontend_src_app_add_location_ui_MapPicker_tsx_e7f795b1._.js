(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MapPicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/civic-cops-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/civic-cops-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/civic-cops-frontend/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/civic-cops-frontend/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/civic-cops-frontend/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/civic-cops-frontend/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/civic-cops-frontend/node_modules/react-leaflet/lib/Circle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/civic-cops-frontend/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Fix default icon paths for Leaflet when bundling
// Safely remove internal icon function if present (types may not expose it)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Icon.Default.prototype._getIconUrl;
__TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});
function ClickHandler(param) {
    let { onPick } = param;
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapEvents"])({
        click (e) {
            onPick(e.latlng.lat, e.latlng.lng);
        }
    });
    return null;
}
_s(ClickHandler, "Ld/tk8Iz8AdZhC1l7acENaOEoCo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapEvents"]
    ];
});
_c = ClickHandler;
function CenterUpdater(param) {
    let { center, zoom } = param;
    _s1();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CenterUpdater.useEffect": ()=>{
            map.setView(center, zoom);
        }
    }["CenterUpdater.useEffect"], [
        center,
        zoom,
        map
    ]);
    return null;
}
_s1(CenterUpdater, "IoceErwr5KVGS9kN4RQ1bOkYMAg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c1 = CenterUpdater;
function MapPicker(param) {
    let { onPick, center, initialCenter } = param;
    _s2();
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(center || initialCenter || null);
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(13);
    const [accuracyMeters, setAccuracyMeters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [geoError, setGeoError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapPicker.useEffect": ()=>{
            if (center) setPosition(center);
            else if (initialCenter) setPosition(initialCenter);
        }
    }["MapPicker.useEffect"], [
        center,
        initialCenter
    ]);
    // Try geolocation once for a better initial center
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapPicker.useEffect": ()=>{
            if (position) return;
            if ("object" !== "undefined" && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition({
                    "MapPicker.useEffect": (res)=>{
                        const lat = res.coords.latitude;
                        const lng = res.coords.longitude;
                        setPosition({
                            lat,
                            lng
                        });
                        onPick(lat, lng);
                    }
                }["MapPicker.useEffect"], {
                    "MapPicker.useEffect": ()=>{
                    // ignore errors; default center will be used
                    }
                }["MapPicker.useEffect"], {
                    enableHighAccuracy: true,
                    timeout: 5000
                });
            }
        }
    }["MapPicker.useEffect"], [
        position,
        onPick
    ]);
    const effectiveCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MapPicker.useMemo[effectiveCenter]": ()=>position || {
                lat: 28.6139,
                lng: 77.2090
            }
    }["MapPicker.useMemo[effectiveCenter]"], [
        position
    ]);
    const handleGeolocate = ()=>{
        setGeoError("");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const isSecure = window.location.protocol === "https:" || window.location.hostname === "localhost";
        if (!isSecure) {
            setGeoError("Geolocation requires HTTPS (or localhost). Please use a secure origin.");
            return;
        }
        if (!("geolocation" in navigator)) {
            setGeoError("Geolocation not supported on this device/browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition((res)=>{
            const lat = res.coords.latitude;
            const lng = res.coords.longitude;
            setPosition({
                lat,
                lng
            });
            setAccuracyMeters(Number.isFinite(res.coords.accuracy) ? res.coords.accuracy : null);
            setZoom(17);
            onPick(lat, lng);
        }, (err)=>{
            if (err.code === 1) setGeoError("Permission denied. Enable location access and try again.");
            else if (err.code === 2) setGeoError("Position unavailable. Try again in an open area.");
            else if (err.code === 3) setGeoError("Geolocation timed out. Please try again.");
            else setGeoError("Failed to get current location.");
        }, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: "100%",
            width: "100%",
            position: "relative"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
                center: effectiveCenter,
                zoom: zoom,
                style: {
                    height: "100%",
                    width: "100%"
                },
                scrollWheelZoom: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClickHandler, {
                        onPick: (lat, lng)=>{
                            setPosition({
                                lat,
                                lng
                            });
                            onPick(lat, lng);
                        }
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    position && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                        position: position,
                        draggable: true,
                        eventHandlers: {
                            dragend: (e)=>{
                                const m = e.target;
                                const ll = m.getLatLng();
                                setPosition({
                                    lat: ll.lat,
                                    lng: ll.lng
                                });
                                onPick(ll.lat, ll.lng);
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx",
                        lineNumber: 112,
                        columnNumber: 22
                    }, this),
                    position && accuracyMeters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Circle"], {
                        center: position,
                        radius: accuracyMeters,
                        pathOptions: {
                            color: "#2563eb",
                            fillColor: "#60a5fa",
                            fillOpacity: 0.2
                        }
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this),
                    position && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CenterUpdater, {
                        center: position,
                        zoom: zoom
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx",
                        lineNumber: 121,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleGeolocate,
                style: {
                    position: "absolute",
                    right: 12,
                    bottom: 12,
                    zIndex: 1000
                },
                className: "h-10 px-3 rounded-md bg-white/90 border shadow text-sm font-medium",
                "aria-label": "Use my current location",
                children: "Use my location"
            }, void 0, false, {
                fileName: "[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            geoError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 12,
                    bottom: 12,
                    zIndex: 1000
                },
                className: "px-3 py-2 rounded-md bg-white/90 border text-sm text-red-600",
                children: geoError
            }, void 0, false, {
                fileName: "[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx",
                lineNumber: 133,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_s2(MapPicker, "zVw/74ixbJqYJgwqCSg2znoEXOk=");
_c2 = MapPicker;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ClickHandler");
__turbopack_context__.k.register(_c1, "CenterUpdater");
__turbopack_context__.k.register(_c2, "MapPicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/civic-cops-frontend/src/app/add_location/ui/MapPicker.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=civic-cops-frontend_src_app_add_location_ui_MapPicker_tsx_e7f795b1._.js.map