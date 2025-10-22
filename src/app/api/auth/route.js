import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Get the password from the environment variables you just set
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request) {
  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD is not set in environment variables.');
    return NextResponse.json(
      { error: 'Server configuration error.' },
      { status: 500 }
    );
  }

  try {
    const { password } = await request.json();

    // Check if the provided password matches
    if (password === ADMIN_PASSWORD) {
      // Create a secure, random session ID
      const sessionId = crypto.randomUUID();
      
      // Store the session ID in your Vercel KV database
      // 'ex: 60 * 60 * 24' sets it to expire in 24 hours
      await kv.set(sessionId, 'admin', { ex: 60 * 60 * 24 });

      // Set the session ID in the user's browser cookies
      cookies().set('session_id', sessionId, {
        httpOnly: true, // Prevents client-side script access
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 60 * 60 * 24, // 24-hour expiry
        path: '/', // Cookie is valid for the entire site
      });

      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
      // Passwords do not match
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json({ error: 'An internal error occurred.' }, { status: 500 });
  }
}