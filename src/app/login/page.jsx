"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { login } from '@/api/routes'; // Replace with your API route
import { ThreeDots } from 'react-loader-spinner'; // Import loader spinner component
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin


export default function Signin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // Initialize router instance

  // Check for token and redirect to dashboard if it exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard'); // Use router to navigate
    }
  }, [router]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(login, form); // Replace with your API route
      
      if (response.data && response.data.status === 200) {
        toast.success('Logged in successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('subscription', response.data.subscription);
        localStorage.setItem('first_name', response.data.data.first_name);
        localStorage.setItem('last_name', response.data.data.last_name);
        localStorage.setItem('email', response.data.data.email);

        router.push('/dashboard'); // Navigate to dashboard
      } else {
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Google sign-in success handler
  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential); // Decode token (optional)
    console.log('Google User Info:', decoded);

    // Example: Redirect to dashboard or call backend with the token
    localStorage.setItem('token', credentialResponse.credential);
    localStorage.setItem('email', decoded.email);
    localStorage.setItem('first_name', decoded.given_name);
    localStorage.setItem('last_name', decoded.family_name);

    chrome.storage.local.set({
      token: credentialResponse.credential,
      email: decoded.email,
      first_name: decoded.given_name,
      last_name: decoded.family_name,
  }, () => {
      console.log('User data saved to chrome.storage');
  });

    toast.success('Google sign-in successful!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    router.push('/dashboard');
  };

  // Google sign-in error handler
  const handleGoogleError = () => {
    toast.error('Google sign-in failed. Please try again.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer /> {/* Toast container to show notifications */}
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Signin to your Account</h1>
        
        <form onSubmit={handleSignin}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              value={form.email}
              onChange={handleInputChange}
            />
          </div>
        
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              value={form.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-500 flex items-center justify-center"
          >
            {loading ? (
              <ThreeDots height="20" width="20" color="#ffffff" />
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6">
          {/* Google Sign-In Button */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width="100%"
          />
        </div>

        <p className="mt-6 text-center text-sm">
          <Link href="/forgot-password" className="text-indigo-600 font-bold">Forgot Password</Link>
        </p>

        <p className="mt-6 text-center text-sm">
          Don&apos;t have an account? <Link href="/signup" className="text-indigo-600 font-bold">Signup</Link>
        </p>
      </div>
    </div>
  );
}
