"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword } from '@/api/routes'; // Ensure this points to your correct API route
import Link from 'next/link';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    // Function to extract query parameters
    const getQueryParams = () => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const url = new URL(window.location.href);
            const token = url.pathname.split('/').pop();
            setToken(token || '');
            setEmail(urlParams.get('email') || '');
        }
    };

    useEffect(() => {
        getQueryParams();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        try {
            console.log(token,email,password,passwordConfirmation);
            
            
            const response = await axios.post(resetPassword, {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            setMessage(response.data.message || 'Password reset successfully!');
            toast.success(response.data.message || 'Password reset successfully!');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            setMessage(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <ToastContainer />
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-8">Reset Your Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none mt-3"
                            type="password"
                            placeholder="Confirm new password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                        <button
                            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-500 flex items-center justify-center mt-4"
                            type="submit"
                            disabled={!token || !email || !password || !passwordConfirmation || password !== passwordConfirmation}
                        >
                            Reset Password
                        </button>
                        {message && (
                            <>
                            <p className="mt-4 text-center text-sm text-gray-700">
                                {message}
                            </p>
                            <Link href="/login"
            type="submit"
            className="w-full bg-green-400 text-white p-3 rounded-lg font-bold hover:bg-indigo-500 flex items-center justify-center mt-5"
          >
         Back to login
          </Link>
                        </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
