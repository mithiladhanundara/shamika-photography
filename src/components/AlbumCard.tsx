// src/components/AlbumCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface AlbumCardProps {
  imageUrl: string;
  category: string;
  title: string;
}

export default function AlbumCard({ imageUrl, category, title }: AlbumCardProps) {
  return (
    <Link href="#" className="group block overflow-hidden rounded-2xl shadow-soft-lg">
      <div className="relative h-96">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        {/* Text */}
        <div className="absolute bottom-0 left-0 p-6">
          <p className="text-xs uppercase tracking-widest text-white/80">{category}</p>
          <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
        </div>
      </div>
    </Link>
  );
}