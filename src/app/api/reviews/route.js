import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

// GET all reviews
export async function GET() {
  try {
    // Fetch all keys that start with "review:"
    const reviewKeys = await kv.keys('review:*');
    
    if (reviewKeys.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Fetch all review data in parallel
    const reviews = await kv.mget(...reviewKeys);
    
    // Sort reviews by creation date, newest first
    const sortedReviews = reviews.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    return NextResponse.json(sortedReviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST create new review
export async function POST(request) {
  try {
    const { quote, author } = await request.json();

    if (!quote || !author) {
      return NextResponse.json(
        { error: 'Quote and Author are required' },
        { status: 400 }
      );
    }

    // Generate a unique ID for the new review
    const reviewId = crypto.randomUUID();
    const reviewKey = `review:${reviewId}`;

    const newReview = {
      id: reviewId,
      quote,
      author,
      createdAt: Date.now(),
    };

    // Store the new review in Vercel KV
    await kv.set(reviewKey, newReview);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}
