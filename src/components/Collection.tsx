// src/components/Collection.tsx
import Image from 'next/image';
import Link from 'next/link';

// You can define your collection data here or fetch it from a CMS later
const galleryItems = [
  { src: "https://ik.imagekit.io/qetpsnccs/Photography%20/511810023_1151898833621504_4387065176975695224_n.jpg?updatedAt=1758635153892", alt: "Wedding Photography", category: "Wedding Shoot", title: "Nimesh & Tharushi", widthClass: "w-[80vw] md:w-[40vw]" },
  { src: "https://ik.imagekit.io/qetpsnccs/Photography%20/515505375_1194711846006869_6267829151681991070_n.jpg?updatedAt=1758635153895", alt: "Casual Photography", category: "Casual Shoot", title: "Anu & Pasan", widthClass: "w-[90vw] md:w-[55vw]" },
  { src: "https://ik.imagekit.io/qetpsnccs/Photography%20/506501075_1148749027269818_2327372743912024678_n.jpg?updatedAt=1758635153826", alt: "Wedding Photography", category: "Wedding Shoot", title: "Sandun & Gayani", widthClass: "w-[80vw] md:w-[40vw]" },
  { src: "https://ik.imagekit.io/qetpsnccs/Photography%20/537823676_1198696022275118_2701097015137960603_n.jpg?updatedAt=1758635153784", alt: "Engagement Photography", category: "Engagement Shoot", title: "Kavindya & Uthishka", widthClass: "w-[80vw] md:w-[40vw]" },
];

export default function Collection() {
  const duplicatedItems = [...galleryItems, ...galleryItems]; // Duplicate for seamless scroll

  return (
    <section id="collection" className="py-16 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h3 className="text-sm uppercase tracking-widest text-accent-sage mb-2 font-semibold">Our Portfolio</h3>
        <h2 className="text-4xl md:text-6xl font-bold mb-12">Featured Collection</h2>
      </div>
      <div className="relative w-full overflow-hidden pause-on-hover">
        <div className="flex w-max animate-scroll">
          {duplicatedItems.map((item, index) => (
            <div key={index} className={`flex-shrink-0 ${item.widthClass} px-3`}>
              <Link href="#" className="block group">
                <div className="overflow-hidden rounded-2xl h-56 md:h-80">
                  <Image src={item.src} alt={item.alt} width={800} height={600} className="w-full h-full object-cover gallery-item" />
                </div>
                <div className="mt-4 text-left">
                  <p className="text-sm uppercase tracking-widest text-text-light">{item.category}</p>
                  <h4 className="text-xl font-semibold text-text-dark">{item.title}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* This is the updated button section */}
      <div className="text-center mt-12">
        <Link
          href="/albums" // Link is now correct
          className="inline-block px-8 py-3 rounded-full text-sm uppercase tracking-wider font-semibold bg-text-dark text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-sage"
        >
          View Albums {/* Text is now correct */}
        </Link>
      </div>

    </section>
  )
}