// src/components/Articles.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Articles() {
  return (
    <section id="articles" className="py-16 md:py-28 px-6 md:px-12 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-sm uppercase tracking-widest text-accent-sage mb-2 font-semibold">Inspiration</h3>
          <h2 className="text-4xl md:text-6xl font-bold">Read Our Articles</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="#" className="block group bg-secondary rounded-2xl shadow-soft-lg overflow-hidden transition-transform duration-500 hover:scale-105">
            <div className="overflow-hidden">
              <Image src="https://ik.imagekit.io/qetpsnccs/Photography%20/486148862_1078710427607012_522555552628257710_n.jpg?updatedAt=1758635018359" alt="Article thumbnail" width={600} height={400} className="w-full h-48 object-cover gallery-item" />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-xs uppercase tracking-widest text-accent-sage mb-2">Tips & Tricks</p>
              <h4 className="text-xl font-bold mb-3">5 Tips for a Stress-Free Wedding Photo Session</h4>
              <p className="mb-4 text-sm">Discover our top tips for making your wedding day photos as beautiful and relaxed as possible.</p>
              <span className="font-semibold tracking-wider text-text-dark text-sm border-b-2 border-accent-sage/50 group-hover:border-accent-sage transition-all">Read More &rarr;</span>
            </div>
          </Link>
          <Link href="#" className="block group bg-secondary rounded-2xl shadow-soft-lg overflow-hidden transition-transform duration-500 hover:scale-105">
            <div className="overflow-hidden">
              <Image src="https://ik.imagekit.io/qetpsnccs/Photography%20/504730741_1141973841280670_2030947596928720708_n.jpg?updatedAt=1758635153801" alt="Article thumbnail" width={600} height={400} className="w-full h-48 object-cover gallery-item" />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-xs uppercase tracking-widest text-accent-terracotta mb-2">Client Stories</p>
              <h4 className="text-xl font-bold mb-3">A Sunset Engagement at the Beach</h4>
              <p className="mb-4 text-sm">Read the beautiful story of Sarah and James's engagement session on the golden shores.</p>
              <span className="font-semibold tracking-wider text-text-dark text-sm border-b-2 border-accent-terracotta/50 group-hover:border-accent-terracotta transition-all">Read More &rarr;</span>
            </div>
          </Link>
          <Link href="#" className="block group bg-secondary rounded-2xl shadow-soft-lg overflow-hidden transition-transform duration-500 hover:scale-105">
            <div className="overflow-hidden">
              <Image src="https://ik.imagekit.io/qetpsnccs/Photography%20/504730741_1141973841280670_2030947596928720708_n.jpg?updatedAt=1758635153801" alt="Article thumbnail" width={600} height={400} className="w-full h-48 object-cover gallery-item" />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-xs uppercase tracking-widest text-accent-mustard mb-2">Behind the Lens</p>
              <h4 className="text-xl font-bold mb-3">Our Favorite Lenses for Portrait Photography</h4>
              <p className="mb-4 text-sm">A peek inside our camera bag and the gear we trust to capture those perfect moments.</p>
              <span className="font-semibold tracking-wider text-text-dark text-sm border-b-2 border-accent-mustard/50 group-hover:border-accent-mustard transition-all">Read More &rarr;</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}