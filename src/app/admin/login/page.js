"use client"; // This makes it an interactive client component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' in App Router

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }), // Send the password to our API
      });

      if (response.ok) {
        // Login was successful
        // Redirect to the main admin dashboard
        router.push('/admin');
      } else {
        // Login failed
        const data = await response.json();
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      console.error('Login request failed:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#111',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <form onSubmit={handleSubmit} style={{
        padding: '2rem',
        border: '1px solid #333',
        borderRadius: '8px',
        background: '#1a1a1a'
      }}>
        <h2>Admin Login</h2>
        <div style={{ margin: '1rem 0' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '300px',
              padding: '0.5rem',
              background: '#333',
              border: '1px solid #555',
              color: 'white',
              borderRadius: '4px'
            }}
          />
        </div>
        
        {error && <p style={{ color: '#f87171', fontSize: '0.9rem' }}>{error}</p>}
        
        <button type="submit" style={{
          width: '100%',
          padding: '0.75rem',
          background: '#fff',
          color: '#111',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Login
        </button>
      </form>
    </div>
  );
}