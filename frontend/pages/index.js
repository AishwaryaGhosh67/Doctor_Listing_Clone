import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Add Doctor page when the user lands on the homepage
    router.push('/add-doctor');
  }, [router]);

  return null; // Empty return as it will redirect to add-doctor page
}
