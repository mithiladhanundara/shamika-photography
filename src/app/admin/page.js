import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Helper function to check admin authentication
async function isAuthenticated() {
  const cookieStore = cookies(); // <-- FIX: Line 1
  const sessionId = cookieStore.get('session_id')?.value; // <-- FIX: Line 2
  if (!sessionId) {
    return false; // No session cookie
  }

  const adminUser = await kv.get(sessionId);
  if (adminUser === 'admin') {
    return true; // Session is valid
  }

  return false; // Session is invalid or expired
}

// Helper function to fetch albums (we'll reuse the API logic directly)
async function getAlbums() {
  try {
    const albumKeys = await kv.keys('album:*');
    if (albumKeys.length === 0) return [];

    // Ensure we handle potential null values from mget if keys are deleted unexpectedly
    const albums = (await kv.mget(...albumKeys)).filter(album => album !== null);

    // Ensure createdAt exists before sorting, provide default if necessary
    return albums.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)); // Newest first

  } catch (error) {
    console.error('Failed to fetch albums for admin page:', error);
    return []; // Return empty on error
  }
}

// Simple component to display a "Logout" button
function LogoutButton() {
  // This needs to be a form action to securely clear the server-side cookie
  const logout = async () => {
    'use server';
    cookies().delete('session_id'); // Delete the session cookie
    redirect('/admin/login'); // Redirect to login
  };

  return (
    <form action={logout}>
      <button type="submit" style={{
        padding: '0.5rem 1rem',
        background: '#555',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Logout
      </button>
    </form>
  );
}

// The main admin page
export default async function AdminDashboard() {
  // 1. Check Authentication
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    redirect('/admin/login'); // Redirect to login if not authenticated
  }

  // 2. Fetch Data
  const albums = await getAlbums();

  // 3. Render Page
  return (
    <div style={{
      color: 'white',
      background: '#111',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'sans-serif'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #333',
        paddingBottom: '1rem'
      }}>
        <h1 style={{ fontSize: '1.5rem' }}>Admin Dashboard</h1>
        <LogoutButton />
      </header>

      <main style={{ marginTop: '2rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.25rem' }}>Albums ({albums.length})</h2>
          <Link href="/admin/add" style={{
            padding: '0.5rem 1rem',
            background: '#fff',
            color: '#111',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            + Add New Album
          </Link>
        </div>

        {/* Album List */}
        <div style={{
          marginTop: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          {albums.length > 0 ? albums.map((album) => (
            // Ensure album and album.id exist before rendering
            album && album.id ? (
              <div key={album.id} style={{
                border: '1px solid #333',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#1a1a1a'
              }}>
                <img
                  src={album.coverImage || ''} // Provide fallback for missing coverImage
                  alt={album.title || 'Album cover'} // Provide fallback for missing title
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    // Optional: Handle image loading errors, e.g., show a placeholder
                    console.error(`Failed to load image: ${album.coverImage}`);
                    // e.target.src = '/placeholder-image.png'; // Example placeholder
                  }}
                />
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{album.title || 'Untitled Album'}</h3>
                  <p style={{
                    color: '#999',
                    fontSize: '0.9rem',
                    marginTop: '0.5rem'
                  }}>
                    {/* Check if images is an array before accessing length */}
                    {Array.isArray(album.images) ? album.images.length : 0} photos
                  </p>
                  <Link href={`/admin/edit/${album.id}`} style={{
                    color: '#3b82f6',
                    textDecoration: 'none',
                    marginTop: '1rem',
                    display: 'inline-block'
                  }}>
                    Edit Album
                  </Link>
                </div>
              </div>
            ) : null // Don't render if album or album.id is missing
          )) : (
            <p style={{ color: '#777' }}>No albums found. Click "Add New Album" to get started.</p>
          )}
        </div>
      </main>
    </div>
  );
}