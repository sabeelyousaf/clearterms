"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgotPassword } from '@/app/api/routes';
import { ThreeDots } from 'react-loader-spinner';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader
        setMessage(''); // Clear previous message
        try {
            const response = await axios.post(forgotPassword, { email });
            setMessage(response.data.message); // Set success message
            toast.success(response.data.message); // Show toast notification
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
            setMessage(errorMessage); // Set error message
            toast.error(errorMessage); // Show toast notification
        } finally {
            setLoading(false); // Hide loader
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <ToastContainer />
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-8">Forgot Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Enter Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-500 flex items-center justify-center"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? (
                            <ThreeDots height="20" width="20" color="#ffffff" />
                        ) : (
                            'Submit'
                        )}
                    </button>
                    {message && (
                        <p
                            className={`mt-4 text-center text-sm font-medium ${
                                message.includes('success') ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                            {message}
                        </p>
                    )}
                </form>
                <p className="mt-6 text-center text-sm">
                    <Link href="/login" className="text-indigo-600 font-bold">
                        Back to login
                    </Link>
                </p>
            </div>
        </div>
    );
}
