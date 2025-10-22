"use client"; // This component is interactive

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddAlbumPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(''); // URL for the cover
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title || !coverImage) {
      setError('Title and Cover Image URL are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, coverImage }),
      });

      if (response.ok) {
        // Success! Go back to the main admin page
        router.push('/admin'); 
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create album.');
      }
    } catch (err) {
      console.error('Failed to submit form:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Basic styling for the form
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
      boxSizing: 'border-box' // Important for padding to work correctly
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
      opacity: loading ? 0.7 : 1
    },
    error: {
      color: '#f87171',
      fontSize: '0.9rem',
      marginTop: '1rem',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/admin" style={styles.backLink}>
          &larr; Back to Dashboard
        </Link>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Add New Album</h1>
      </header>

      <form onSubmit={handleSubmit} style={styles.form}>
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

        {error && <p style={styles.error}>{error}</p>}
        
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Creating...' : 'Create Album'}
        </button>
      </form>
    </div>
  );
}