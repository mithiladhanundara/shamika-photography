"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        setError('Failed to fetch reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('An error occurred while fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the review from the local state
        setReviews(reviews.filter(review => review.id !== reviewId));
      } else {
        setError('Failed to delete review');
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      setError('An error occurred while deleting the review');
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
    addButton: {
      padding: '0.5rem 1rem',
      background: '#fff',
      color: '#111',
      borderRadius: '4px',
      textDecoration: 'none',
      fontWeight: 'bold',
      display: 'inline-block',
      marginBottom: '1rem'
    },
    reviewCard: {
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1rem',
      background: '#1a1a1a'
    },
    reviewQuote: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      marginBottom: '1rem',
      fontStyle: 'italic'
    },
    reviewAuthor: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#ccc',
      marginBottom: '1rem'
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.5rem'
    },
    editButton: {
      padding: '0.5rem 1rem',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: '0.9rem'
    },
    deleteButton: {
      padding: '0.5rem 1rem',
      background: '#dc2626',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem'
    },
    error: {
      color: '#f87171',
      marginBottom: '1rem',
      padding: '1rem',
      background: '#1a1a1a',
      borderRadius: '4px'
    },
    loading: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#999'
    },
    empty: {
      textAlign: 'center',
      color: '#777',
      fontSize: '1.1rem',
      padding: '2rem'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading reviews...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/admin" style={styles.backLink}>
          &larr; Back to Dashboard
        </Link>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Manage Client Reviews</h1>
      </header>

      {error && <div style={styles.error}>{error}</div>}

      <Link href="/admin/reviews/add" style={styles.addButton}>
        + Add New Review
      </Link>

      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <div key={review.id} style={styles.reviewCard}>
              <p style={styles.reviewQuote}>"{review.quote}"</p>
              <p style={styles.reviewAuthor}>- {review.author}</p>
              <div style={styles.buttonGroup}>
                <Link href={`/admin/reviews/edit/${review.id}`} style={styles.editButton}>
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(review.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.empty}>
          No reviews found. Click "Add New Review" to get started.
        </div>
      )}
    </div>
  );
}
