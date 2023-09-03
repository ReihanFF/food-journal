import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return null;
}

export default Index;
