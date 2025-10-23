// src/app/albums/page.tsx
import { kv } from '@vercel/kv';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AlbumCard from '@/components/AlbumCard';

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: string[];
  createdAt: number;
}

interface SampleAlbum {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
}

// This function fetches ALL albums from database
async function getAllAlbums() {
  try {
    // Fetch all keys that start with "album:"
    const albumKeys = await kv.keys('album:*');
    
    if (albumKeys.length === 0) {
      return []; // Return empty array if no albums
    }

    // Fetch all album data in parallel
    const albums = await kv.mget(...albumKeys) as Album[];
    
    // Sort albums by creation date, newest first
    const sortedAlbums = albums.sort((a, b) => b.createdAt - a.createdAt);

    return sortedAlbums;
  } catch (error) {
    console.error('Failed to fetch albums:', error);
    return [];
  }
}

// Sample albums data (fallback when no database albums exist)
const sampleAlbums: SampleAlbum[] = [
  { id: '1', imageUrl: 'https://ik.imagekit.io/qetpsnccs/Photography%20/511810023_1151898833621504_4387065176975695224_n.jpg?updatedAt=1758635153892', category: 'Wedding Shoot', title: 'Nimesh & Tharushi' },
  { id: '2', imageUrl: 'https://ik.imagekit.io/qetpsnccs/Photography%20/515505375_1194711846006869_6267829151681991070_n.jpg?updatedAt=1758635153895', category: 'Casual Shoot', title: 'Anu & Pasan' },
  { id: '3', imageUrl: 'https://ik.imagekit.io/qetpsnccs/Photography%20/506501075_1148749027269818_2327372743912024678_n.jpg?updatedAt=1758635153826', category: 'Wedding Shoot', title: 'Sandun & Gayani' },
  { id: '4', imageUrl: 'https://ik.imagekit.io/qetpsnccs/Photography%20/537823676_1198696022275118_2701097015137960603_n.jpg?updatedAt=1758635153784', category: 'Engagement Shoot', title: 'Kavindya & Uthishka' },
  { id: '5', imageUrl: 'https://ik.imagekit.io/qetpsnccs/Photography%20/486148862_1078710427607012_522555552628257710_n.jpg?updatedAt=1758635018359', category: 'Wedding Shoot', title: 'Nirosha & Amal' },
  { id: '6', imageUrl: 'https://ik.imagekit.io/qetpsnccs/Photography%20/504730741_1141973841280670_2030947596928720708_n.jpg?updatedAt=1758635153801', category: 'Engagement Shoot', title: 'Sarah & James' },
];

export default async function AlbumsPage() {
  const dbAlbums = await getAllAlbums();
  
  // Use database albums if available, otherwise use sample data
  const albums = dbAlbums.length > 0 ? dbAlbums : sampleAlbums;

  return (
    <>
      <Header />
      <main className="bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-text-dark">Album Collection</h1>
            <p className="mt-4 text-lg text-text-light">Our Creativity in Pictures. We make memories that last a lifetime.</p>
          </div>

          {/* Album Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.length > 0 ? (
              albums.map((album, index) => {
                // Type guard to check if it's a database album or sample album
                const isDbAlbum = 'coverImage' in album;
                return (
                  <AlbumCard
                    key={album.id || index}
                    imageUrl={isDbAlbum ? album.coverImage : album.imageUrl}
                    category={isDbAlbum ? "Photography" : album.category}
                    title={album.title}
                    id={album.id}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <h2 className="text-2xl font-bold text-text-dark mb-4">No albums yet</h2>
                <p className="text-text-light">Check back soon for our latest photography collections!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}