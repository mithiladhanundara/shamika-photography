import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

// GET a single album by its ID
export async function GET(request, context) { // Changed { params } to context
  try {
    const { id } = context.params; // <-- FIX: Access id via context.params
    const albumKey = `album:${id}`;

    const album = await kv.get(albumKey);

    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    return NextResponse.json(album, { status: 200 });
  } catch (error) {
    console.error('Error fetching album:', error);
    return NextResponse.json({ error: 'Failed to fetch album' }, { status: 500 });
  }
}

// PUT (update) an existing album
export async function PUT(request, context) { // Changed { params } to context
  try {
    const { id } = context.params; // <-- FIX: Access id via context.params
    const albumKey = `album:${id}`;

    // Check if the album exists first
    const existingAlbum = await kv.get(albumKey);
    if (!existingAlbum) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    // Get the new data from the request body
    const { title, description, coverImage, images } = await request.json();

    // Create the updated album object
    const updatedAlbum = {
      ...existingAlbum, 
      title: title ?? existingAlbum.title,
      description: description ?? existingAlbum.description,
      coverImage: coverImage ?? existingAlbum.coverImage,
      images: images ?? existingAlbum.images,
    };

    // Save the updated object back to the KV store
    await kv.set(albumKey, updatedAlbum);

    return NextResponse.json(updatedAlbum, { status: 200 });
  } catch (error) {
    console.error('Error updating album:', error);
    return NextResponse.json({ error: 'Failed to update album' }, { status: 500 });
  }
}

// DELETE an album
export async function DELETE(request, context) { // Changed { params } to context
  try {
    const { id } = context.params; // <-- FIX: Access id via context.params
    const albumKey = `album:${id}`;

    // Delete the key from the KV store
    const result = await kv.del(albumKey);

    if (result === 0) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 });
    }

    // Return a success message with no content
    return new NextResponse(null, { status: 204 }); // 204 = No Content
  } catch (error) {
    console.error('Error deleting album:', error);
    return NextResponse.json({ error: 'Failed to delete album' }, { status: 500 });
  }
}