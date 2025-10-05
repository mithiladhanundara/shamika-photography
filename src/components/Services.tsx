// src/components/Services.tsx

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-28 px-6 md:px-12 text-center bg-secondary">
      <div>
        <h3 className="text-sm uppercase tracking-widest text-accent mb-2 font-semibold">Overview</h3>
        <h2 className="text-4xl md:text-6xl font-bold mb-12">Our Services</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <div className="text-center p-6 bg-primary rounded-2xl shadow-soft-lg border border-black/5 transition-transform duration-500 hover:scale-105">
          <svg className="w-10 h-10 mx-auto mb-4 text-accent-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          <h4 className="text-xl font-semibold mb-2">Weddings</h4>
          <p className="text-sm">We tell the timeless story of your wedding day through emotive and beautiful photography.</p>
        </div>
        <div className="text-center p-6 bg-primary rounded-2xl shadow-soft-lg border border-black/5 transition-transform duration-500 hover:scale-105">
          <svg className="w-10 h-10 mx-auto mb-4 text-accent-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path></svg>
          <h4 className="text-xl font-semibold mb-2">Engagements</h4>
          <p className="text-sm">A unique way to capture the love between two people, freezing the emotions of the moment.</p>
        </div>
        <div className="text-center p-6 bg-primary rounded-2xl shadow-soft-lg border border-black/5 transition-transform duration-500 hover:scale-105">
          <svg className="w-10 h-10 mx-auto mb-4 text-accent-mustard" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <h4 className="text-xl font-semibold mb-2">Casual Shoots</h4>
          <p className="text-sm">A relaxed session to get comfortable in front of the lens and capture your natural connection.</p>
        </div>
        <div className="text-center p-6 bg-primary rounded-2xl shadow-soft-lg border border-black/5 transition-transform duration-500 hover:scale-105">
          <svg className="w-10 h-10 mx-auto mb-4 text-accent-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          <h4 className="text-xl font-semibold mb-2">Architecture</h4>
          <p className="text-sm">Capturing the art, emotion, and spiritual side of life through thoughtful compositions.</p>
        </div>
      </div>
    </section>
  )
}