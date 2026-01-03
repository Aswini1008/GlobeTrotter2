import { redirect } from 'next/navigation';

// This page is deprecated and replaced by the new home page.
// Redirecting to the new home page.
export default function DashboardPage() {
  redirect('/home');
}
