import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all keys that start with "album:"
    const albumKeys = await kv.keys('album:*');
    
    if (albumKeys.length === 0) {
      return NextResponse.json([], { status: 200 }); // Return empty array if no albums
    }

    // Fetch all album data in parallel
    const albums = await kv.mget(...albumKeys);
    
    // Sort albums by creation date, newest first
    const sortedAlbums = albums.sort((a, b) => b.createdAt - a.createdAt);

    return NextResponse.json(sortedAlbums, { status: 200 });
  } catch (error) {
    console.error('Error fetching albums:', error);
    return NextResponse.json({ error: 'Failed to fetch albums' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, description, coverImage } = await request.json();

    if (!title || !coverImage) {
      return NextResponse.json(
        { error: 'Title and Cover Image are required' },
        { status: 400 }
      );
    }

    // Generate a unique ID for the new album
    const albumId = crypto.randomUUID();
    const albumKey = `album:${albumId}`; // Create a unique key for the KV store

    const newAlbum = {
      id: albumId,
      title,
      description: description || '', // Default to empty string if no description
      coverImage,
      images: [], // Start with an empty array for album photos
      createdAt: Date.now(), // Add a timestamp
    };

    // Store the new album object in Vercel KV
    await kv.set(albumKey, newAlbum);

    return NextResponse.json(newAlbum, { status: 201 }); // 201 = Created
  } catch (error) {
    console.error('Error creating album:', error);
    return NextResponse.json({ error: 'Failed to create album' }, { status: 500 });
  }
}