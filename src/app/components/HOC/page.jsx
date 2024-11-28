import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check for token in sessionStorage
      const token = sessionStorage.getItem('token');

      if (!token) {
        // Redirect to login page if no token exists
        router.push('/login');
      }
    }, []);

    // Show nothing or a loading indicator while redirecting
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
