"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation' // Use 'next/navigation' for client-side navigation

export default function Success() {
  const router = useRouter();
useEffect(() => {
  sessionStorage.removeItem('subscription');
  sessionStorage.setItem('subscription',true);
}, [])

  const handleBackToDashboard = () => {
    router.push('/dashboard'); // Adjust the path based on your dashboard route
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg mb-6">Thank you for your purchase. Your payment has been successfully processed.</p>

        <button
          onClick={handleBackToDashboard}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
