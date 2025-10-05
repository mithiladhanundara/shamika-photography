// src/components/Header.tsx

'use client' // This is required for interactivity

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    // Clean up the event listener when the component is removed
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClasses = `p-4 md:p-6 md:px-12 flex justify-between items-center fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out`
  const scrolledStateClasses = `scrolled pill-nav`

  return (
    <>
      <header id="main-header" className={`${headerClasses} ${isScrolled ? scrolledStateClasses : ''}`}>
        <div className="header-logo">
          <Link href="/">
            <Image
              src="https://ik.imagekit.io/qetpsnccs/Photography%20/Untitled-10.png?updatedAt=1758445432316"
              alt="Shamika Thirankana Photography Logo"
              width={120}
              height={48}
              className="h-10 md:h-12 w-auto"
              priority // Helps load the logo faster
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="nav-link text-white">Home</Link>
          <Link href="/albums" className="nav-link text-white">Albums</Link>
          <Link href="#about" className="nav-link text-white">About</Link>
          <Link href="#articles" className="nav-link text-white">Articles</Link>

          {/* 👇 This is the new button 👇 */}
          <Link
            href="https://wa.me/94774684941" // Replace with your WhatsApp number
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-2 rounded-full text-sm uppercase tracking-wider font-semibold bg-text-dark text-white shadow-md transition-transform hover:scale-105"
          >
            <span>Say Hello</span>
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.12c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.42 0-4.54 3.69-8.23 8.23-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23zm4.52-6.15c-.25-.12-1.47-.72-1.7-.82s-.39-.12-.56.12c-.17.25-.64.82-.79.99-.14.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.26-1.49-1.41-1.74s-.02-.38.11-.51c.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.5c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.88 2.4 1 2.57c.12.17 1.74 2.65 4.22 3.72.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.06 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.05-.12-.19-.19-.44-.31z" />
            </svg>
          </Link>
        </nav>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-50 p-2">
          <svg className="w-6 h-6 mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-primary/95 backdrop-blur-lg z-40 flex-col items-center justify-center space-y-8 ${isMenuOpen ? 'flex' : 'hidden'}`}
        onClick={() => setIsMenuOpen(false)}>
        <Link href="/" className="mobile-nav-link text-2xl tracking-widest uppercase">Home</Link>
        <Link href="/albums" className="mobile-nav-link text-2xl tracking-widest uppercase">Albums</Link>
        <Link href="#about" className="mobile-nav-link text-2xl tracking-widest uppercase">About</Link>
        <Link href="#articles" className="mobile-nav-link text-2xl tracking-widest uppercase">Articles</Link>
      </div>
    </>
  )
}