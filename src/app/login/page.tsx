"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // Send OTP
  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    setLoading(true)
    setError("")
    
    try {
      // Format phone number with country code for Twilio
      const formattedPhone = `+91${phone}`
      
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

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Format phone number with country code for Twilio
      const formattedPhone = `+91${phone}`
      
      const response = await fetch("https://civic-ops.onrender.com/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: formattedPhone,
          otp: otp
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token as returned by backend
        const token = data.token || data.access_token
        if (token) {
          localStorage.setItem("token", token)
          localStorage.setItem("access_token", token)
        }
        if (data.user_id !== undefined) {
          localStorage.setItem("user_id", String(data.user_id))
        }
        if (data.name) {
          localStorage.setItem("name", data.name)
        }
        // Persist plain phone used for login
        try { localStorage.setItem("phone", `+91${phone}`) } catch {}
        
        // Redirect to home
        router.push("/home")
      } else {
        setError(data.detail || "Invalid OTP")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">Sign Up / Login</h1>

      {!otpSent ? (
        <>
          {/* Phone input with +91 prefix */}
          <div className="flex items-center border rounded-md mb-4">
            <span className="px-3 text-lg text-gray-600">+91</span>
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
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
            disabled={loading || phone.length !== 10}
          >
            {loading ? "Sending OTP..." : "Continue"}
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            We've sent a 6-digit OTP to +91{phone}
          </p>

          {/* OTP input */}
          <Input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="h-12 text-lg mb-4 text-center tracking-widest"
            maxLength={6}
          />

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <Button 
            className="h-12 text-lg mb-4" 
            onClick={handleVerifyOtp}
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <Button 
            variant="outline"
            className="h-12 text-lg mb-2" 
            onClick={() => {
              setOtpSent(false)
              setOtp("")
              setError("")
            }}
          >
            Change Phone Number
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
        Don't have an account?{" "}
        <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
          Sign up
        </a>
      </p>
    </div>
  )
}
