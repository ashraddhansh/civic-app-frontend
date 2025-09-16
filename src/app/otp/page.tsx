"use client"
import React, { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get phone number from URL params
  const phone = searchParams?.get("phone") || ""
  const isLogin = searchParams?.get("type") === "login"
  const name = searchParams?.get("name") || ""

  useEffect(() => {
    if (!phone) {
      router.push(isLogin ? "/login" : "/signup")
      return
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [phone, router, isLogin])

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // move to next input if digit is entered
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOtp = async () => {
    const otpString = otp.join("")
    
    if (!otpString || otpString.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Format phone number with country code for Twilio
      const formattedPhone = `+91${phone}`
      
      if (isLogin) {
        // For login flow
        const response = await fetch("https://civic-ops.onrender.com/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: formattedPhone,
            otp: otpString
          }),
        })

        const data = await response.json()

        if (response.ok) {
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
          // Persist phone used for login
          try { localStorage.setItem("phone", formattedPhone) } catch {}
          router.push("/home")
        } else {
          setError(data.detail || "Invalid OTP")
        }
      } else {
        // For registration flow: the backend uses verify-otp to create user if name is provided
        const response = await fetch("https://civic-ops.onrender.com/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: formattedPhone,
            otp: otpString,
            name: name
          }),
        })

        const data = await response.json()

        if (response.ok) {
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
          // Persist phone used for registration
          try { localStorage.setItem("phone", formattedPhone) } catch {}
          router.push("/home")
        } else {
          setError(data.detail || "Registration failed")
        }
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
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
        setCanResend(false)
        setResendTimer(30)
        setError("")
        setOtp(["", "", "", "", "", ""])
        
        // Restart timer
        const timer = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              setCanResend(true)
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setError(data.detail || "Failed to resend OTP")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!phone) {
    return <div>Redirecting...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      
      <p className="text-sm text-gray-600 mb-8">
        We've sent a 6-digit OTP to +91{phone}
      </p>

      {/* OTP input boxes */}
      <div className="flex justify-between gap-2 mb-6">
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => { inputRefs.current[index] = el }}
            className="w-12 h-12 text-center text-lg"
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      <Button 
        className="h-12 text-lg mb-4" 
        onClick={handleVerifyOtp}
        disabled={loading || otp.join("").length !== 6}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </Button>

      <div className="text-center mb-4">
        {canResend ? (
          <Button 
            variant="ghost"
            className="h-12 text-lg" 
            onClick={handleResendOtp}
            disabled={loading}
          >
            Resend OTP
          </Button>
        ) : (
          <p className="text-sm text-gray-600">
            Resend OTP in {resendTimer}s
          </p>
        )}
      </div>

      <Button 
        variant="outline"
        className="h-12 text-lg" 
        onClick={() => router.push(isLogin ? "/login" : "/signup")}
      >
        Change Phone Number
      </Button>
    </div>
  )
}
