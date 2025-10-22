// src/components/AlbumCard.tsx
import Image from 'next/image';
<<<<<<< HEAD
import Link from 'next/link'; // Import Link

// 1. Define the props
=======
import Link from 'next/link';

>>>>>>> 7b26177c17c569e716ed3729973e94faf7210b97
interface AlbumCardProps {
  imageUrl: string;
  category: string;
  title: string;
<<<<<<< HEAD
  id: string; // 2. Add id here
}

// 3. Accept id as a prop
export default function AlbumCard({ imageUrl, category, title, id }: AlbumCardProps) {
  return (
    // 4. Wrap everything in a Link and use the id in the href
    <Link href={`/albums/${id}`} className="group block overflow-hidden rounded-2xl shadow-soft-lg">
      <div className="relative aspect-square">
=======
}

export default function AlbumCard({ imageUrl, category, title }: AlbumCardProps) {
  return (
    <Link href="#" className="group block overflow-hidden rounded-2xl shadow-soft-lg">
      <div className="relative h-96">
>>>>>>> 7b26177c17c569e716ed3729973e94faf7210b97
        <Image
          src={imageUrl}
          alt={title}
          fill
<<<<<<< HEAD
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark overlay for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Text Content */}
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/90">{category}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{title}</h3>
=======
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        {/* Text */}
        <div className="absolute bottom-0 left-0 p-6">
          <p className="text-xs uppercase tracking-widest text-white/80">{category}</p>
          <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
>>>>>>> 7b26177c17c569e716ed3729973e94faf7210b97
        </div>
      </div>
    </Link>
  );
}