// src/components/AlbumCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface AlbumCardProps {
  imageUrl: string;
  category: string;
  title: string;
  id: string;
}

export default function AlbumCard({ imageUrl, category, title, id }: AlbumCardProps) {
  return (
    <Link href={`/albums/${id}`} className="group block overflow-hidden rounded-2xl shadow-soft-lg">
      <div className="relative aspect-square">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark overlay for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Text Content */}
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/90">{category}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{title}</h3>
        </div>
      </div>
    </Link>
  );
}