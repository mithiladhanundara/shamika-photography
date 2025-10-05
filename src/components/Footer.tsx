// src/components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-text-light py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">
        <div>
          <Link href="#">
            <Image src="https://ik.imagekit.io/qetpsnccs/Photography%20/Untitled-10.png?updatedAt=1758445432316" alt="Shamika Thiranjana Photography Logo" width={150} height={60} className="h-12 w-auto mx-auto md:mx-0 mb-4" />
          </Link>
          <p className="text-sm">Preserving timeless moments with passion and artistry. Based in Sri Lanka, available for destination weddings worldwide.</p>
        </div>
        <nav className="flex flex-col space-y-3 text-sm items-center md:items-start">
          <Link href="#about" className="hover:text-text-dark transition-colors">About</Link>
          <Link href="#collection" className="hover:text-text-dark transition-colors">Collection</Link>
          <Link href="#articles" className="hover:text-text-dark transition-colors">Articles</Link>
        </nav>
        <div>
          <p className="font-semibold text-text-dark">CONTACT@SHAMIKAPHOTOGRAPHY.COM</p>
          <p className="text-2xl font-semibold text-text-dark my-2">+94 77 4684941</p>

          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            {/* 👇 LINKS UPDATED HERE 👇 */}
            <a href="https://www.facebook.com/your-profile-url" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-text-light hover:text-text-dark transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" /></svg>
            </a>
            <a href="https://www.instagram.com/your_username" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-light hover:text-text-dark transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281-.073-1.689-.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z" /></svg>
            </a>
            <a href="https://wa.me/94774684941" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-text-light hover:text-text-dark transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.12c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.83-1.26-4.42 0-4.54 3.69-8.23 8.23-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23zm4.52-6.15c-.25-.12-1.47-.72-1.7-.82s-.39-.12-.56.12c-.17.25-.64.82-.79.99-.14.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.66-1.26-1.49-1.41-1.74s-.02-.38.11-.51c.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.42h-.5c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.88 2.4 1 2.57c.12.17 1.74 2.65 4.22 3.72.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.06 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.05-.12-.19-.19-.44-.31z" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-border-color text-center text-sm">
        <p>COPYRIGHT 2025 &copy; SHAMIKA THIRANKANA PHOTOGRAPHY.</p>
        <p className="mt-2 text-xs text-text-light/70">Welcome to shamikathiranjanaphotography.lk</p>

        {/* This is the new credit link */}
        <p className="mt-4 text-xs text-text-light/50">
          <a 
            href="https://nund.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-text-light transition-colors tracking-wider"
          >
            WEBSITE BY NUND
          </a>
        </p>
      </div>
    </footer>
  )
}