// src/components/Testimonials.tsx
'use client'; // Required for interactivity

import { useState, useEffect } from 'react';

// Fallback testimonials in case API fails
const fallbackTestimonials = [
  { quote: "We are highly satisfied with your excellent photography. The photos are unique and mesmerizing, and we've fallen in love with our pre-shoot photos all over again.", author: "NIRANGA & THAMALI" },
  { quote: "Absolutely stunning work! You captured the essence of our day perfectly. Every photo tells a story and brings back the happiest memories. Thank you so much!", author: "SARAH & JAMES" },
  { quote: "The most professional and friendly photographer we could have asked for. The entire process was a joy, and the final photos exceeded all of our expectations.", author: "PRIYA & ANURA" },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setTestimonials(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        // Keep fallback testimonials
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const prev = () => setCurrentSlide((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  const next = () => setCurrentSlide((current) => (current === testimonials.length - 1 ? 0 : current + 1));

  return (
    <section id="testimonials" className="py-16 md:py-28 px-6 md:px-12 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-sm uppercase tracking-widest text-accent-sage mb-2 font-semibold">Testimonials</h3>
        <h2 className="text-4xl md:text-6xl font-bold mb-10">Happy Clients</h2>
        <div className="relative min-h-[220px] md:min-h-[250px]">
          <svg className="w-12 h-12 md:w-16 md:h-16 text-accent-sage/20 mx-auto mb-4" fill="currentColor" viewBox="0 0 32 32"><path d="M9.33 6.67h5.33L12 14.67H6.67V24h10.66V12L20 4h5.33v20H9.33z" /></svg>
          <div className="testimonial-slide">
            <p className="text-lg md:text-2xl italic leading-relaxed mb-6">"{testimonials[currentSlide].quote}"</p>
            <h4 className="text-lg md:text-xl font-semibold tracking-wider">{testimonials[currentSlide].author}</h4>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button onClick={prev} className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors border border-gray-200/80 shadow-sm">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button onClick={next} className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors border border-gray-200/80 shadow-sm">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </section>
  )
}