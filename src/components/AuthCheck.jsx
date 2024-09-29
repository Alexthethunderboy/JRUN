'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthCheck({ children, pathname: serverPathname }) {
  const clientPathname = usePathname()
  const [isAuthPage, setIsAuthPage] = useState(false)

  useEffect(() => {
    const path = clientPathname || serverPathname
    setIsAuthPage(
      path.includes('/(auth)') || 
      path.startsWith('/login') || 
      path.startsWith('/register')
    )
  }, [clientPathname, serverPathname])

  return (
    <>
      {!isAuthPage && children}
    </>
  )
}