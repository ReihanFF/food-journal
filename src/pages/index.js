import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new home page (Home.js)
    router.replace('/login');
  }, [router]);

  return null;
}

export default Index;
