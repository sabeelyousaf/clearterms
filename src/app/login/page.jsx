"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { googleAuth, login } from '../api/routes'; // Replace with your API route
import { ThreeDots } from 'react-loader-spinner'; // Import loader spinner component
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Signup() {
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
      
      // Check if the response data structure matches your expectations
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
        
        // Store the token and user data in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('subscription', response.data.subscription);
        localStorage.setItem('first_name', response.data.data.first_name); // Store name
        localStorage.setItem('last_name', response.data.data.last_name); // Store name
        localStorage.setItem('email', response.data.data.email); // Store email

        // Navigate to dashboard//
        router.push('/dashboard'); // Use router to navigate
      } else {
        // Handle unexpected response structure
        toast.error('Wrong Credentials', {
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
      // Improved error handling
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

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(googleAuth, {
        token: credentialResponse.credential,
      });
      if (response.data.status === 200) {
        toast.success("Logged in successfully");
        localStorage.setItem("token", response.data.token);
        router.push("/dashboard");
      } else {
        toast.error(response.data.message || "Google login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
    <Header/>
    <div className="min-h-screen flex justify-center items-center bg-gray-100 mt-5">
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
            className="w-full mb-4 bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-500 flex items-center justify-center" // Added flex styles
          >
            {loading ? (
              <ThreeDots height="20" width="20" color="#ffffff" /> // Spinner component
            ) : (
              'Login'
            )}
          </button>
          <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => toast.error("Google login failed")}
            />
        </form>
        <div className='mb-6'>
          <p className="mt-6 text-center text-sm">
          <Link href="/forgot-password" className="text-indigo-600 font-bold">Forgot Password</Link>
        </p>
          </div>

        <p className="mt-6 text-center text-sm">
          Don&apos;t have an account? <Link href="/signup" className="text-indigo-600 font-bold">Signup</Link>
        </p>
      </div>
    </div>
    <Footer/>
    </GoogleOAuthProvider>
  );
}
