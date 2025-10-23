// src/app/albums/[id]/page.tsx
import { kv } from '@vercel/kv';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image'; // We'll use next/image

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: string[]; // This holds all the photo URLs
  createdAt: number;
}

// This function fetches only ONE album
async function getAlbum(id: string) {
  try {
    const albumKey = `album:${id}`;
    const album: Album | null = await kv.get(albumKey);
    return album;
  } catch (error) {
    console.error('Failed to fetch album:', error);
    return null;
  }
}

// This is the page component
export default async function AlbumDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const album = await getAlbum(id);

  if (!album) {
    return (
      <>
        <Header />
        <main className="bg-secondary text-center py-36">
          <h1 className="text-4xl font-bold text-text-dark">Album not found</h1>
          <a href="/albums" className="text-text-light mt-4 inline-block">Back to all albums</a>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
          {/* Album Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-text-dark">{album.title}</h1>
            <p className="mt-4 text-lg text-text-light">{album.description}</p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {album.images && album.images.length > 0 ? (
              album.images.map((imgUrl, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={imgUrl}
                    alt={`${album.title} photo ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))
            ) : (
              <p className="text-text-light text-center col-span-full">There are no photos in this album yet.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}