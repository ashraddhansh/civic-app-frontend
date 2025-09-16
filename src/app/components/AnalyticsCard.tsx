"use client"

import React from "react"
import { LucideIcon } from "lucide-react"

interface AnalyticsCardProps {
  title: string
  value: number
  icon: LucideIcon
  color: string
  bgColor: string
  iconColor: string
}

export function AnalyticsCard({ title, value, icon: Icon, color, bgColor, iconColor }: AnalyticsCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-4 shadow-sm border border-gray-100`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`${iconColor} p-3 rounded-lg`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}
