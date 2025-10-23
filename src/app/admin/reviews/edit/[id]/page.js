"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditReviewPage() {
  const [review, setReview] = useState(null);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // Fetch the existing review data
  useEffect(() => {
    if (id) {
      fetchReview();
    }
  }, [id]);

  const fetchReview = async () => {
    try {
      const response = await fetch(`/api/reviews/${id}`);
      if (!response.ok) {
        throw new Error('Review not found');
      }
      const data = await response.json();
      setReview(data);
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (err) {
      console.error(err);
      setError('Failed to load review data.');
    } finally {
      setPageLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!quote || !author) {
      setError('Quote and Author are required.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote, author }),
      });

      if (response.ok) {
        router.push('/admin/reviews');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update review.');
      }
    } catch (err) {
      console.error('Failed to submit form:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete this review?`)) {
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (response.ok) {
        router.push('/admin/reviews');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete review.');
      }
    } catch (err) {
      console.error('Failed to delete review:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
      minHeight: '120px',
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      resize: 'vertical'
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
      opacity: loading ? 0.7 : 1,
      marginBottom: '1rem'
    },
    deleteButton: {
      width: '100%',
      padding: '0.75rem',
      background: '#dc2626',
      color: 'white',
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
    },
    loadingText: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#999'
    }
  };

  if (pageLoading) {
    return <div style={styles.container}><p style={styles.loadingText}>Loading review data...</p></div>;
  }
  
  if (!review && error) {
     return <div style={styles.container}>
       <p style={styles.error}>{error}</p>
       <Link href="/admin/reviews" style={styles.backLink}>&larr; Back to Reviews</Link>
     </div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/admin/reviews" style={styles.backLink}>
          &larr; Back to Reviews
        </Link>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Edit Review</h1>
      </header>

      <form onSubmit={handleUpdate} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="quote" style={styles.label}>Client Quote</label>
          <textarea
            id="quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="author" style={styles.label}>Client Name</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}
        
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Updating...' : 'Update Review'}
        </button>
      </form>

      <div style={{...styles.form, marginTop: '1.5rem', background: 'transparent', padding: 0 }}>
         <hr style={{ border: 0, borderTop: '1px solid #333', margin: '2rem 0' }} />
         <h3 style={{color: '#f87171'}}>Danger Zone</h3>
         <p style={{color: '#999', fontSize: '0.9rem'}}>Deleting a review is permanent.</p>
         <button onClick={handleDelete} style={styles.deleteButton} disabled={loading}>
           {loading ? 'Deleting...' : 'Delete Review'}
         </button>
      </div>
    </div>
  );
}
