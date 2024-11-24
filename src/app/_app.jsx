// pages/_app.js
import { GoogleOAuthProvider } from '@react-oauth/google';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    // Wrap your application with GoogleOAuthProvider and provide the clientId
    <GoogleOAuthProvider clientId="1002116905100-4s2l3rgbuah9la0nd5cu7m3d7qibudja.apps.googleusercontent.com">
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}

export default MyApp;
