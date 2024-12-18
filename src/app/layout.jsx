'use client'; // Ensure this file runs on the client side

import './globals.css';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';

const font = Space_Grotesk({ subsets: ['latin'] });



export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthentication = () => {
      const isDashboardRoute = pathname.startsWith('/dashboard');
      const token = localStorage.getItem('token');

      if (isDashboardRoute && !token) {
        router.push('/login'); // Redirect to login if not authenticated
      } else {
        setIsLoading(false); // Allow rendering if authentication check passes
      }
    };

    checkAuthentication();
  }, [pathname, router]);

  if (isLoading) {
    // Show a spinner while checking authentication
    return (
      <html lang="en">
        <body className={font.className}>
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
