// src/components/CallToAction.tsx
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section
      id="call-to-action"
      className="relative py-20 md:py-36 px-6 md:px-12 text-center text-white"
      style={{
        backgroundImage: `url('https://ik.imagekit.io/qetpsnccs/Photography%20/486170061_1079245110886877_8705870640890602148_n.jpg?updatedAt=1758634961260')`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10">
        <h3 className="text-sm uppercase tracking-widest mb-2 font-semibold text-white/80">Get It Started</h3>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">DO YOU WANT TO KEEP <br /> YOUR MEMORIES ALIVE FOREVER?</h2>
        <p className="mb-10 max-w-2xl mx-auto text-white/90">Our passionate photographers can help you do just that! We'll capture your story and preserve it for years to come.</p>
        <Link href="#" className="btn-accent px-8 py-3 rounded-full text-sm uppercase tracking-wider font-semibold">Get Started</Link>
      </div>
    </section>
  )
}