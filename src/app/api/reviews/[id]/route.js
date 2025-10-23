import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

// GET a single review by its ID
export async function GET(request, context) {
  try {
    const { id } = context.params;
    const reviewKey = `review:${id}`;

    const review = await kv.get(reviewKey);

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
  }
}

// PUT (update) an existing review
export async function PUT(request, context) {
  try {
    const { id } = context.params;
    const reviewKey = `review:${id}`;

    // Check if the review exists first
    const existingReview = await kv.get(reviewKey);
    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Get the new data from the request body
    const { quote, author } = await request.json();

    // Create the updated review object
    const updatedReview = {
      ...existingReview,
      quote: quote ?? existingReview.quote,
      author: author ?? existingReview.author,
    };

    // Save the updated object back to the KV store
    await kv.set(reviewKey, updatedReview);

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

// DELETE a review
export async function DELETE(request, context) {
  try {
    const { id } = context.params;
    const reviewKey = `review:${id}`;

    // Delete the key from the KV store
    const result = await kv.del(reviewKey);

    if (result === 0) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Return a success message with no content
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
