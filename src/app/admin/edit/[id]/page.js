"use client"; // This component is interactive

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

// --- STYLES ---
// (We've added new styles to this object for the photo manager)
const styles = {
  container: {
    color: 'white', 
    background: '#111', 
    minHeight: '100vh', 
    padding: '2rem',
    fontFamily: 'sans-serif'
  },
  header: {
    paddingBottom: '1rem',
    borderBottom: '1px solid #333',
    marginBottom: '2rem'
  },
  backLink: {
    color: '#999',
    textDecoration: 'none',
    marginBottom: '1rem',
    display: 'inline-block'
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    background: '#1a1a1a',
    padding: '2rem',
    borderRadius: '8px'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#ccc'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    background: '#333',
    border: '1px solid #555',
    color: 'white',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    background: '#333',
    border: '1px solid #555',
    color: 'white',
    borderRadius: '4px',
    minHeight: '100px',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    background: '#fff',
    color: '#111',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    opacity: 0.9
  },
  deleteButton: {
    width: '100%',
    padding: '0.75rem',
    background: '#b91c1c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '1rem',
    opacity: 0.9
  },
  error: {
    color: '#f87171',
    fontSize: '0.9rem',
    marginTop: '1rem',
    textAlign: 'center'
  },
  loadingText: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#999'
  },
  // --- NEW STYLES FOR PHOTO MANAGER ---
  imageManager: {
    maxWidth: '600px',
    margin: '2rem auto 0 auto',
    background: '#1a1a1a',
    padding: '2rem',
    borderRadius: '8px'
  },
  addImageForm: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem'
  },
  addImageButton: {
    padding: '0 1rem',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  imagePreviewList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '1rem'
  },
  imagePreviewItem: {
    position: 'relative',
    border: '1px solid #333',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  imagePreview: {
    width: '100%',
    height: '100px',
    objectFit: 'cover'
  },
  removeButton: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    background: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    fontWeight: 'bold',
    lineHeight: '24px',
    textAlign: 'center',
    padding: 0
  }
};

// --- COMPONENT ---
export default function EditAlbumPage() {
  // Album details state
  const [album, setAlbum] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  
  // --- NEW STATE for managing images ---
  const [images, setImages] = useState([]); // Holds the list of photo URLs
  const [newImageUrl, setNewImageUrl] = useState(''); // For the "Add Image" input
  const [isUpdatingImages, setIsUpdatingImages] = useState(false); // Loading for image updates

  // Page state
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // 1. Fetch the existing album data (MODIFIED)
  const fetchAlbum = useCallback(async () => {
    if (!id) return;
    
    setPageLoading(true);
    try {
      const response = await fetch(`/api/albums/${id}`);
      if (!response.ok) {
        throw new Error('Album not found');
      }
      const data = await response.json();
      setAlbum(data);
      // Pre-fill the form fields
      setTitle(data.title);
      setDescription(data.description);
      setCoverImage(data.coverImage);
      setImages(data.images || []); // <-- NEW: Load images into state
    } catch (err) {
      console.error(err);
      setError('Failed to load album data.');
    } finally {
      setPageLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAlbum();
  }, [fetchAlbum]);

  // 2. Handle the "Update" form submission (for Title, Desc, Cover)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title || !coverImage) {
      setError('Title and Cover Image URL are required.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/albums/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        // This only sends the main details, not the image array
        body: JSON.stringify({ title, description, coverImage }),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update album.');
      }
    } catch (err) {
      console.error('Failed to submit form:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle the "Delete" button click
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete the album "${title}"?`)) {
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/albums/${id}`, { method: 'DELETE' });
      if (response.ok) {
        router.push('/admin');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete album.');
      }
    } catch (err) {
      console.error('Failed to delete album:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- 4. NEW FUNCTION: Handle "Add Image" ---
  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImageUrl) return; // Don't add empty URLs

    setIsUpdatingImages(true);
    setError('');
    
    const newImagesList = [...images, newImageUrl]; // Add new URL to the list

    try {
      const response = await fetch(`/api/albums/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        // Send *only* the new, complete images array
        body: JSON.stringify({ images: newImagesList }), 
      });

      if (response.ok) {
        // Success! Update local state and clear input
        setImages(newImagesList);
        setNewImageUrl('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add image.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsUpdatingImages(false);
    }
  };

  // --- 5. NEW FUNCTION: Handle "Remove Image" ---
  const handleRemoveImage = async (imageUrlToRemove) => {
    if (!window.confirm('Are you sure you want to remove this image?')) {
      return;
    }

    setIsUpdatingImages(true);
    setError('');

    // Create a new list *without* the image we want to remove
    const newImagesList = images.filter((img) => img !== imageUrlToRemove);

    try {
      const response = await fetch(`/api/albums/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: newImagesList }),
      });

      if (response.ok) {
        setImages(newImagesList); // Update local state
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to remove image.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsUpdatingImages(false);
    }
  };


  // --- RENDER LOGIC ---
  if (pageLoading) {
    return <div style={styles.container}><p style={styles.loadingText}>Loading album data...</p></div>;
  }
  
  if (!album && error) {
     return <div style={styles.container}>
       <p style={styles.error}>{error}</p>
       <Link href="/admin" style={styles.backLink}>&larr; Back to Dashboard</Link>
     </div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/admin" style={styles.backLink}>
          &larr; Back to Dashboard
        </Link>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Edit Album</h1>
      </header>

      {/* --- Main Details Form --- */}
      <form onSubmit={handleUpdate} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Album Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="coverImage" style={styles.label}>Cover Image URL</label>
          <input
            id="coverImage"
            type="text"
            placeholder="https://.../image.jpg"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Updating...' : 'Update Album Details'}
        </button>
      </form>

      {/* --- NEW: Photo Manager Section --- */}
      <div style={styles.imageManager}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Manage Photos ({images.length})</h3>
        
        {/* Add Image Form */}
        <form onSubmit={handleAddImage} style={styles.addImageForm}>
          <input
            type="text"
            placeholder="https://.../new-image.jpg"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            style={{ ...styles.input, flex: 1 }}
          />
          <button type="submit" style={styles.addImageButton} disabled={isUpdatingImages}>
            {isUpdatingImages ? '...' : '+ Add'}
          </button>
        </form>

        {/* Image List */}
        <div style={styles.imagePreviewList}>
          {images.length > 0 ? images.map((imgUrl, index) => (
            <div key={index} style={styles.imagePreviewItem}>
              <img src={imgUrl} alt={`Album photo ${index + 1}`} style={styles.imagePreview} />
              <button 
                onClick={() => handleRemoveImage(imgUrl)} 
                style={styles.removeButton}
                disabled={isUpdatingImages}
              >
                &times;
              </button>
            </div>
          )) : (
            <p style={{ color: '#777', gridColumn: '1 / -1' }}>No photos in this album yet.</p>
          )}
        </div>
      </div>
      
      {/* --- Danger Zone --- */}
      <div style={{...styles.form, marginTop: '1.5rem', background: 'transparent', padding: 0 }}>
         <hr style={{ border: 0, borderTop: '1px solid #333', margin: '2rem 0' }} />
         <h3 style={{color: '#f87171'}}>Danger Zone</h3>
         <p style={{color: '#999', fontSize: '0.9rem'}}>Deleting an album is permanent.</p>
         <button onClick={handleDelete} style={styles.deleteButton} disabled={loading}>
           {loading ? 'Deleting...' : 'Delete Album'}
         </button>
      </div>

      {/* Global Error Display */}
      {error && <p style={{...styles.error, marginTop: '2rem'}}>{error}</p>}
    </div>
  );
}