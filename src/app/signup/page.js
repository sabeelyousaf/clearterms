"use client";
import { register } from '@/api/routes';
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure toast styles are included

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Check if token exists and redirect to dashboard
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(register, form);
    
      if (response.status === 200) {
        toast.success('Signup successful!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        
        sessionStorage.setItem('token', response.data.token); // Adjusted to access the token correctly
        window.location.href = "/dashboard";
      }
      console.log('Signup successful:', response.data.message); // Assuming 'message' comes from response data
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : 'Error signing up. Please try again.';
  
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      console.error('Error signing up:', errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer /> 
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Create an Account</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              value={form.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
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
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
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
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Already have an account? <Link href="/login" className="text-indigo-600 font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
}
