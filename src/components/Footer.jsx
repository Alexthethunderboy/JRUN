
import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-black text-white p-4 text-center ">
      <div className="flex justify-center space-x-4 mb-4">
        <Link href="https://facebook.com" legacyBehavior><a><FaFacebook size={24} /></a></Link>
        <Link href="https://twitter.com" legacyBehavior><a><FaTwitter size={24} /></a></Link>
        <Link href="https://instagram.com " legacyBehavior><a><FaInstagram size={24} /></a></Link>
      </div>
      <div className="flex justify-center space-x-2 ">
        <Link href="/" legacyBehavior><a>Home</a></Link>
        <Link href="/categories" legacyBehavior><a>Categories</a></Link>
        <Link href="/about" legacyBehavior><a>About Us</a></Link>
        <Link href="/contact" legacyBehavior><a>Contact</a></Link>
        <Link href="/privacy" legacyBehavior><a>Privacy Policy</a></Link>
      </div>
      <p className="mt-4">&copy; 2024 JRUN. All rights reserved.</p>
    </footer>
  )
}
