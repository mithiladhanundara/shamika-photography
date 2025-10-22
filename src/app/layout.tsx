// src/app/layout.tsx

import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'

// Font setup for your two fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '700'],
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Shamika Thiranjana Photography',
  description: 'Preserving Your Story, Framed With Passion.',
  icons: {
    icon: 'https://ik.imagekit.io/qetpsnccs/Photography%20/photofav.png?updatedAt=1759639675235',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} font-sans scroll-smooth`}>
      <body className="bg-primary text-text-light">{children}</body>
    </html>
  )
}