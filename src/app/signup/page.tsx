"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: ""
  })
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // Send OTP for registration
  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    if (!formData.name.trim()) {
      setError("Please enter your name")
      return
    }

    setLoading(true)
    setError("")
    
    try {
      // Format phone number with country code for Twilio
      const formattedPhone = `+91${formData.phone}`
      
      const response = await fetch("https://civic-ops.onrender.com/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: formattedPhone
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setOtpSent(true)
        setError("")
      } else {
        setError(data.detail || "Failed to send OTP")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Register user with OTP verification
  const handleRegister = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Format phone number with country code for Twilio
      const formattedPhone = `+91${formData.phone}`
      
      const response = await fetch("https://civic-ops.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: formattedPhone,
          name: formData.name,
          otp: formData.otp
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store the access token
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("user_id", data.user_id)
        
        // Redirect to home
        router.push("/home")
      } else {
        setError(data.detail || "Registration failed")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">Sign Up</h1>

      {!otpSent ? (
        <>
          <Input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mb-4 h-12 text-lg"
          />

          <div className="flex items-center border rounded-md mb-4">
            <span className="px-3 text-lg text-gray-600">+91</span>
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="border-0 focus-visible:ring-0 h-12 text-lg flex-1"
              maxLength={10}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <Button 
            className="h-12 text-lg" 
            onClick={handleSendOtp}
            disabled={loading || formData.phone.length !== 10 || !formData.name.trim()}
          >
            {loading ? "Sending OTP..." : "Continue"}
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            We&apos;ve sent a 6-digit OTP to +91{formData.phone}
          </p>

          <Input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={formData.otp}
            onChange={(e) => handleInputChange("otp", e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="h-12 text-lg mb-4 text-center tracking-widest"
            maxLength={6}
          />

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <Button 
            className="h-12 text-lg mb-4" 
            onClick={handleRegister}
            disabled={loading || formData.otp.length !== 6}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <Button 
            variant="outline"
            className="h-12 text-lg mb-2" 
            onClick={() => {
              setOtpSent(false)
              setFormData(prev => ({ ...prev, otp: "" }))
              setError("")
            }}
          >
            Change Details
          </Button>

          <Button 
            variant="ghost"
            className="h-12 text-lg" 
            onClick={handleSendOtp}
            disabled={loading}
          >
            Resend OTP
          </Button>
        </>
      )}

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Sign in
        </a>
      </p>
    </div>
  )
}
