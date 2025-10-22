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

// This function fetches ALL albums
async function getAllAlbums() {
  try {
    // Fetch all keys that start with "album:"
    const albumKeys = await kv.keys('album:*');
    
    if (albumKeys.length === 0) {
      return []; // Return empty array if no albums
    }

    // Fetch all album data in parallel
    const albums = await kv.mget(...albumKeys);
    
    // Sort albums by creation date, newest first
    const sortedAlbums = albums.sort((a, b) => b.createdAt - a.createdAt);

    return sortedAlbums;
  } catch (error) {
    console.error('Failed to fetch albums:', error);
    return [];
  }
}

export default async function AlbumsPage() {
  const albums = await getAllAlbums();

  return (
    <>
      <Header />
      <main className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-text-dark">Our Albums</h1>
            <p className="mt-4 text-lg text-text-light">Explore our collection of beautiful photography moments</p>
          </div>

          {/* Album Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {albums.length > 0 ? (
              albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  imageUrl={album.coverImage}
                  category="Photography"
                  title={album.title}
                  id={album.id}
                />
              ))
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