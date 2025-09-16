"use client"

import React from "react"
import { FileText, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { AnalyticsCard } from "./AnalyticsCard"
import { UserStatsResponse } from "@/lib/api"

interface AnalyticsSectionProps {
  stats: UserStatsResponse
  loading?: boolean
  lastUpdatedText?: string
  errorText?: string
}

export function AnalyticsSection({ stats, loading = false, lastUpdatedText, errorText }: AnalyticsSectionProps) {
  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">Complaint Analytics</h2>
          <span className="text-xs text-gray-500">Loading…</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const analyticsData = [
    {
      title: "Total Complaints",
      value: stats.total_issues,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-100 text-blue-600"
    },
    {
      title: "Pending",
      value: stats.by_status.pending,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "bg-orange-100 text-orange-600"
    },
    {
      title: "In Progress",
      value: stats.by_status.in_progress,
      icon: AlertCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Resolved",
      value: stats.by_status.resolved,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconColor: "bg-green-100 text-green-600"
    }
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Complaint Analytics</h2>
        <div className="flex items-center gap-3">
          {errorText && (
            <span className="text-xs text-red-600">{errorText}</span>
          )}
          {lastUpdatedText && (
            <span className="text-xs text-gray-500">Updated {lastUpdatedText}</span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {analyticsData.map((data, index) => (
          <AnalyticsCard
            key={index}
            title={data.title}
            value={data.value}
            icon={data.icon}
            color={data.color}
            bgColor={data.bgColor}
            iconColor={data.iconColor}
          />
        ))}
      </div>
      
      {/* Additional stats row */}
      <div className="mt-4 grid grid-cols-1 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                <XCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-xl font-bold text-red-600">{stats.by_status.rejected}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Resolution Rate</p>
              <p className="text-sm font-semibold text-gray-700">
                {stats.total_issues > 0 
                  ? Math.round((stats.by_status.resolved / stats.total_issues) * 100)
                  : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
