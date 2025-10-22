// src/components/Hero.tsx
'use client'; // Required for slideshow interactivity

import { useState, useEffect } from 'react';

// Add your background image URLs here
const images = [
  'https://ik.imagekit.io/qetpsnccs/Photography%20/487075497_1080950264049695_6244613325183442574_n.jpg?updatedAt=1758569779378',
  'https://ik.imagekit.io/qetpsnccs/Photography%20/504730741_1141973841280670_2030947596928720708_n.jpg?updatedAt=1758635153801',
  'https://ik.imagekit.io/qetpsnccs/Photography%20/48614862_1078710427607012_522555552628257710_n.jpg?updatedAt=1758635018359',
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">
      {/* Image Slideshow Layers */}
      {images.map((src, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${src}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: index === currentImageIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>

      {/* Main Heading Block */}
      <div className="relative z-10 px-4 mb-[38vh]">
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight !text-white font-serif"
          style={{ textShadow: '0 2px 25px rgba(0,0,0,0.5)' }}
        >
          Preserving Your Story, <br /> Framed With Passion.
        </h1>
        <p
          className="text-base md:text-lg font-light max-w-3xl mx-auto !text-white"
          style={{ textShadow: '0 1px 15px rgba(0,0,0,0.5)' }}
        >
        </p>
      </div>

      {/* Bottom Text Block - NOW POSITIONED CORRECTLY */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white z-10 w-full px-4">
        <p
          className="text-base md:text-xl italic"
          style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 15px rgba(0,0,0,0.5)' }}
        >
          We capture the pure, romantic moments of your love story, creating timeless
          heirlooms for you to cherish forever.
        </p>
        <p
          className="mt-2 text-xs md:text-sm tracking-widest"
          style={{ color: 'rgba(255,255,255,0.7)', textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
        >
        </p>
      </div>
    </section>
  )
}