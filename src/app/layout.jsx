import './globals.css';
import { Space_Grotesk } from 'next/font/google';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider

const font = Space_Grotesk({ subsets: ['latin'] });

export const metadata = {
  title: 'Clear Terms',
  description: 'clear terms',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* Wrap the entire app in GoogleOAuthProvider */}
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
