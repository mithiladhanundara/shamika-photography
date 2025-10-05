// src/app/collection/page.tsx
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AlbumCard from '@/components/AlbumCard';

// In the future, you can fetch this data from a database or CMS
const albums = [
  { imageUrl: 'https://ik.imagekit.io/qetpsnccs/Photography%20/511810023_1151898833621504_4387065176975695224_n.jpg?updatedAt=1758635153892', category: 'Wedding Shoot', title: 'Nimesh & Tharushi' },
  { imageUrl: 'https://ik.imagekit.io/qetpsnccs/Photography%20/515505375_1194711846006869_6267829151681991070_n.jpg?updatedAt=1758635153895', category: 'Casual Shoot', title: 'Anu & Pasan' },
  { imageUrl: 'https://ik.imagekit.io/qetpsnccs/Photography%20/506501075_1148749027269818_2327372743912024678_n.jpg?updatedAt=1758635153826', category: 'Wedding Shoot', title: 'Sandun & Gayani' },
  { imageUrl: 'https://ik.imagekit.io/qetpsnccs/Photography%20/537823676_1198696022275118_2701097015137960603_n.jpg?updatedAt=1758635153784', category: 'Engagement Shoot', title: 'Kavindya & Uthishka' },
  // Add more albums here
];

export default function CollectionPage() {
  return (
    <>
      <Header />
      <main className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-text-dark">Album Collection</h1>
            <p className="mt-4 text-lg text-text-light">Our Creativity in Pictures. We make memories that last a lifetime.</p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              <button className="px-4 py-2 text-sm font-semibold bg-accent-sage text-white rounded-full">All</button>
              <button className="px-4 py-2 text-sm text-text-dark bg-secondary rounded-full hover:bg-border-color">Wedding Shoots</button>
              <button className="px-4 py-2 text-sm text-text-dark bg-secondary rounded-full hover:bg-border-color">Engagement Shoots</button>
              <button className="px-4 py-2 text-sm text-text-dark bg-secondary rounded-full hover:bg-border-color">Casual Shoots</button>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-64 px-4 py-2 rounded-full form-input"
            />
          </div>

          {/* Album Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {albums.map((album, index) => (
              <AlbumCard
                key={index}
                imageUrl={album.imageUrl}
                category={album.category}
                title={album.title}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}