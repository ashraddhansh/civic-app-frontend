"use client"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://civic-ops.onrender.com";

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  // Support both keys used elsewhere in the app
  return localStorage.getItem("access_token") || localStorage.getItem("token");
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${path}`;
  const token = getStoredToken();

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, { ...options, headers });
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = (isJson && (data?.detail || data?.message)) || response.statusText;
    throw new Error(message || "Request failed");
  }

  return data;
}

export type IssueResponse = {
  issue_id: number;
  title: string;
  description: string;
  category: string;
  location?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  photo_url?: string | null;
  voice_note_url?: string | null;
  status: "pending" | "in_progress" | "resolved" | "rejected";
  priority: "unassigned" | "low" | "medium" | "high" | "urgent";
  created_at: string;
  updated_at: string;
};

export async function getIssueById(issueId: string | number): Promise<IssueResponse> {
  return apiFetch(`/users/issues/${issueId}`, { method: "GET" });
}

export interface UserStatsResponse {
  total_issues: number
  by_status: {
    pending: number
    in_progress: number
    resolved: number
    rejected: number
  }
}

export async function getUserStats(): Promise<UserStatsResponse> {
  return apiFetch("/users/my-issues/stats", { method: "GET" });
}


