module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/civic-cops-frontend/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiFetch",
    ()=>apiFetch,
    "getIssueById",
    ()=>getIssueById
]);
"use client";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://civic-ops.onrender.com";
function getStoredToken() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
async function apiFetch(path, options = {}) {
    const url = `${API_BASE_URL}${path}`;
    const token = getStoredToken();
    const headers = new Headers(options.headers || {});
    if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    const response = await fetch(url, {
        ...options,
        headers
    });
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();
    if (!response.ok) {
        const message = isJson && (data?.detail || data?.message) || response.statusText;
        throw new Error(message || "Request failed");
    }
    return data;
}
async function getIssueById(issueId) {
    return apiFetch(`/users/issues/${issueId}`, {
        method: "GET"
    });
}
}),
"[project]/civic-cops-frontend/src/app/add_description/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddDescriptionPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/civic-cops-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/civic-cops-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/civic-cops-frontend/src/lib/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function AddDescriptionPage() {
    const [mode, setMode] = __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState('written');
    const [imageUrls, setImageUrls] = __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState([]);
    const [description, setDescription] = __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    const [recordingState, setRecordingState] = __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("idle");
    const [recordStartTs, setRecordingStartTs] = __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [elapsedMs, setElapsedMs] = __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(0);
    const mediaRecorderRef = __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef(null);
    const audioChunksRef = __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useRef([]);
    const [voiceBlob, setVoiceBlob] = __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
    const [submitting, setSubmitting] = __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState("");
    __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        try {
            const dataUrlsJson = localStorage.getItem("report_img_data_urls");
            if (!dataUrlsJson) return;
            const urls = JSON.parse(dataUrlsJson);
            setImageUrls(urls);
        } catch  {}
    }, []);
    const toggleRecording = async ()=>{
        if (recordingState === "recording") {
            mediaRecorderRef.current?.stop();
            setRecordingState("stopped");
            setRecordingStartTs(null);
            setElapsedMs(0);
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            audioChunksRef.current = [];
            recorder.ondataavailable = (e)=>{
                if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
            };
            recorder.onstop = ()=>{
                const blob = new Blob(audioChunksRef.current, {
                    type: "audio/webm"
                });
                setVoiceBlob(blob);
                // stop tracks
                stream.getTracks().forEach((t)=>t.stop());
            };
            recorder.start();
            setRecordingState("recording");
            setRecordingStartTs(Date.now());
        } catch (e) {
            setError("Microphone access failed. Please allow permission.");
        }
    };
    // Tick timer while recording
    __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if (recordingState !== "recording" || !recordStartTs) return;
        const id = window.setInterval(()=>{
            setElapsedMs(Date.now() - recordStartTs);
        }, 200);
        return ()=>window.clearInterval(id);
    }, [
        recordingState,
        recordStartTs
    ]);
    const formatElapsed = (ms)=>{
        const totalSeconds = Math.floor(ms / 1000);
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        const mm = String(m).padStart(2, '0');
        const ss = String(s).padStart(2, '0');
        return `${mm}:${ss}`;
    };
    const handleSubmit = async ()=>{
        setError("");
        if (imageUrls.length === 0) {
            setError("Please attach at least one photo");
            return;
        }
        if (description.trim().length < 10 && !voiceBlob) {
            setError("Add a description (min 10 chars) or a voice note");
            return;
        }
        setSubmitting(true);
        try {
            const form = new FormData();
            // Required fields - you may change title/category later or feed from earlier steps
            form.append("title", description.slice(0, 60) || "Issue Report");
            form.append("description", description || "Issue details");
            form.append("category", "other");
            // Optional location if stored earlier
            const loc = localStorage.getItem("selected_coords");
            if (loc) {
                try {
                    const { lat, lng } = JSON.parse(loc);
                    form.append("latitude", String(lat));
                    form.append("longitude", String(lng));
                } catch  {}
            }
            // Attach first image as primary photo (backend supports single photo file field)
            // Convert dataURL to Blob
            const dataUrlToBlob = async (dataUrl)=>{
                const res = await fetch(dataUrl);
                return await res.blob();
            };
            const primaryBlob = await dataUrlToBlob(imageUrls[0]);
            form.append("photo", primaryBlob, "photo.jpg");
            // Optional voice note
            if (voiceBlob) {
                form.append("voice_note", voiceBlob, "voice.webm");
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])("/users/issues/with-files", {
                method: "POST",
                body: form
            });
            // Clear temp storage on success
            localStorage.removeItem("report_img_data_urls");
            // You can redirect to home or details page here
            alert("Complaint submitted successfully");
        } catch (e) {
            setError(e?.message || "Failed to submit complaint");
        } finally{
            setSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col min-h-screen bg-white px-6 py-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-8",
                children: "Add Description"
            }, void 0, false, {
                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                lineNumber: 138,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 rounded-xl border border-gray-300 bg-gray-50 p-3",
                children: imageUrls.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center",
                    style: {
                        minHeight: 220
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-gray-400",
                        children: "No photos attached yet"
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                        lineNumber: 144,
                        columnNumber: 7
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                    lineNumber: 143,
                    columnNumber: 6
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 gap-3",
                    children: imageUrls.map((url, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative rounded-md overflow-hidden border bg-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: url,
                                alt: `attached-${idx}`,
                                className: "w-full h-28 object-cover"
                            }, void 0, false, {
                                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                                lineNumber: 150,
                                columnNumber: 9
                            }, this)
                        }, `${url}-${idx}`, false, {
                            fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                            lineNumber: 149,
                            columnNumber: 8
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                    lineNumber: 147,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                lineNumber: 141,
                columnNumber: 4
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-red-600 mb-3",
                children: error
            }, void 0, false, {
                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                lineNumber: 157,
                columnNumber: 14
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex rounded-lg bg-gray-100 overflow-hidden border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `flex-1 py-3 text-lg font-semibold transition-colors ${mode === 'written' ? 'bg-white text-blue-600' : 'text-gray-500'}`,
                        onClick: ()=>setMode('written'),
                        type: "button",
                        children: "Description"
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                        lineNumber: 161,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `flex-1 py-3 text-lg font-semibold transition-colors ${mode === 'voice' ? 'bg-white text-blue-600' : 'text-gray-500'}`,
                        onClick: ()=>setMode('voice'),
                        type: "button",
                        children: "Voice Note"
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                        lineNumber: 168,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                lineNumber: 160,
                columnNumber: 4
            }, this),
            mode === 'written' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                className: "w-full h-32 p-4 text-lg border rounded-lg bg-gray-50 resize-none mb-8",
                placeholder: "Type your description here...",
                value: description,
                onChange: (e)=>setDescription(e.target.value)
            }, void 0, false, {
                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                lineNumber: 179,
                columnNumber: 5
            }, this),
            mode === 'voice' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full min-h-32 flex flex-col border rounded-lg bg-gray-50 mb-8 px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex items-center h-20",
                        children: [
                            ...Array(24)
                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-1 mx-0.5 rounded bg-blue-300",
                                style: {
                                    height: `${8 + Math.abs(12 - i) * 4}px`
                                }
                            }, i, false, {
                                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                                lineNumber: 194,
                                columnNumber: 8
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                        lineNumber: 191,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white shadow",
                                type: "button",
                                "aria-label": "Record or Stop",
                                onClick: toggleRecording,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "28",
                                    height: "28",
                                    viewBox: "0 0 28 28",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "14",
                                            cy: "14",
                                            r: "12",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 9
                                        }, this),
                                        recordingState === 'recording' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                            x: "9",
                                            y: "9",
                                            width: "10",
                                            height: "10",
                                            rx: "2",
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                                            lineNumber: 213,
                                            columnNumber: 10
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "14",
                                            cy: "14",
                                            r: "6",
                                            fill: "white"
                                        }, void 0, false, {
                                            fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                                    lineNumber: 210,
                                    columnNumber: 8
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                                lineNumber: 203,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-gray-700",
                                children: recordingState === 'recording' ? `Recording ${formatElapsed(elapsedMs)}` : voiceBlob ? 'Recorded' : 'Tap to record'
                            }, void 0, false, {
                                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                                lineNumber: 219,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                        lineNumber: 202,
                        columnNumber: 6
                    }, this),
                    voiceBlob && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                            controls: true,
                            className: "w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                src: URL.createObjectURL(voiceBlob)
                            }, void 0, false, {
                                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                                lineNumber: 226,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                            lineNumber: 225,
                            columnNumber: 8
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                        lineNumber: 224,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                lineNumber: 189,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full gap-4 mt-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "flex-1 h-12 rounded-md bg-gray-200 text-gray-700 font-semibold",
                        type: "button",
                        children: "Back"
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                        lineNumber: 235,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$civic$2d$cops$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "flex-1 h-12 rounded-md bg-blue-600 text-white font-semibold disabled:opacity-50",
                        type: "button",
                        disabled: submitting,
                        onClick: handleSubmit,
                        children: submitting ? 'Submitting...' : 'Continue'
                    }, void 0, false, {
                        fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                        lineNumber: 241,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
                lineNumber: 234,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/civic-cops-frontend/src/app/add_description/page.tsx",
        lineNumber: 137,
        columnNumber: 3
    }, this);
}
}),
"[project]/civic-cops-frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/civic-cops-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/civic-cops-frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/civic-cops-frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/civic-cops-frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__570551f7._.js.map