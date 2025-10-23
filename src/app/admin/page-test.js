import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Simple test version without KV dependency
export default async function AdminDashboard() {
  // For testing, always redirect to login
  redirect('/admin/login');
}
