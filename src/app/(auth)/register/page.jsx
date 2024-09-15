'use client'

import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { Eye, EyeOff, Check, X, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const inter = Inter({ subsets: ['latin'] })

const trackEvent = (eventName, eventData) => {
  console.log('Analytics event:', eventName, eventData)
}

export default function CreativeRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [toast, setToast] = useState(null)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleCapsLock = (e) => {
      setCapsLockOn(e.getModifierState && e.getModifierState('CapsLock'))
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleCapsLock)
      window.addEventListener('keyup', handleCapsLock)

      return () => {
        window.removeEventListener('keydown', handleCapsLock)
        window.removeEventListener('keyup', handleCapsLock)
      }
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
    trackEvent('input_change', { field: name })
  }

  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address'
        break
      case 'password':
        if (value.length < 8) error = 'Password must be at least 8 characters long'
        else if (!/^[a-zA-Z0-9]+$/.test(value)) error = 'Password can only contain letters and numbers'
        break
      case 'confirmPassword':
        if (value !== formData.password) error = 'Passwords do not match'
        break
      default:
        break
    }
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const simulateServerValidation = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const serverErrors = {}
    if (data.email === 'test@example.com') {
      serverErrors.email = 'This email is already registered'
    }
    return serverErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.values(errors).some((error) => error !== '')) return

    setIsLoading(true)
    trackEvent('form_submit', { formData })
    const serverErrors = await simulateServerValidation(formData)
    setIsLoading(false)

    if (Object.keys(serverErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...serverErrors }))
      setToast({ type: 'error', message: 'There were errors in your submission. Please check the form and try again.' })
      return
    }

    setIsVerifying(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsVerifying(false)
    setIsRegistered(true)
    trackEvent('registration_success', { email: formData.email })
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  useEffect(() => {
    if (isRegistered) {
      const timer = setTimeout(() => {
        trackEvent('redirect_to_login', {})
        setToast({ type: 'success', message: 'Registration successful! Redirecting to login page...' })
        router.push('/auth/login')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isRegistered, router])

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  if (!isMounted) {
    return null
  }

  return (
    <div className={`min-h-screen bg-black flex items-center justify-center p-4 ${inter.className}`}>
      <div className="w-full max-w-md">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`mb-4 p-4 rounded-md ${
                toast.type === 'error' ? 'bg-red-500' : 'bg-primary'
              } text-white flex items-center justify-between`}
            >
              <span>{toast.message}</span>
              <button onClick={() => setToast(null)} className="text-white">
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-secondary rounded-lg shadow-xl p-8 overflow-hidden relative text-white"
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-2 bg-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <h2 className="text-3xl font-bold text-center text-primary mb-8">Create an Account</h2>
          {isRegistered ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-green-400"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <Check className="w-16 h-16 mx-auto mb-4" />
              </motion.div>
              <p className="text-xl font-semibold">Registration Successful!</p>
              <p className="mt-2">Please check your email to verify your account.</p>
            </motion.div>
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full mb-4 text-black"
                onClick={handleGoogleSignIn}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_13183_10121)"><path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"/><path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"/><path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"/><path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"/></g><defs><clipPath id="clip0_13183_10121"><rect width="20" height="20" fill="white" transform="translate(0.5)"/></clipPath></defs>
                </svg>
                Sign up with Google
              </Button>
              <Separator className="my-4" />
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className="mt-1"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-xs text-red-500"
                        id="email-error"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      aria-invalid={errors.password ? 'true' : 'false'}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary hover:text-green-400 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <Eye className="h-5 w-5" aria-hidden="true" />
                        )}
                      </motion.div>
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-xs text-red-500"
                        id="password-error"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  {capsLockOn && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-xs text-yellow-400"
                    >
                      <AlertCircle className="inline-block w-4 h-4 mr-1" />
                      Caps Lock is on
                    </motion.p>
                  )}
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                    aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                    className="mt-1"
                  />
                  <AnimatePresence>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-xs text-red-500"
                        id="confirm-password-error"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex items-center">
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="sr-only"
                        checked={agreed}
                        onChange={() => setAgreed(!agreed)}
                        aria-describedby="terms-description"
                      />
                      <motion.div
                        className={`w-5 h-5 border ${
                          agreed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        } rounded transition-colors cursor-pointer`}
                        onClick={() => setAgreed(!agreed)}
                        role="checkbox"
                        aria-checked={agreed}
                        tabIndex={0}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setAgreed(!agreed)
                          }
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <AnimatePresence>
                          {agreed && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-400 cursor-pointer">
                        I agree to the{' '}
                        <a href="#" className="text-primary hover:text-green-400 transition-colors">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-primary hover:text-green-400 transition-colors">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!agreed || isLoading || isVerifying || Object.values(errors).some((error) => error !== '')}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isVerifying ? (
                      'Verifying...'
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
              </form>
            </>
          )}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/login" className="text-sm text-primary hover:text-green-300 transition-colors">
              Already have an account? Sign in
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}