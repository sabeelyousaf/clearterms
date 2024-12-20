"use client"
import { ThreeDots } from 'react-loader-spinner';
import { register } from "@/app/api/routes";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Signup() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isPrivacyChecked || !isTermsChecked) {
      toast.error("Please accept the Privacy Policy and Terms & Conditions.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(register, form);

      if (response.status === 200) {
        toast.success("Signup successful! Please verify your email.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
        window.location.href = "/verify-email";
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error signing up. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async (response) => {
    try {
      const { credential } = response;
      const res = await axios.post('/your-api-endpoint-to-handle-google-signup', {
        credential,
      });

      if (res.status === 200) {
        toast.success("Signup successful! Please verify your email.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
        localStorage.setItem("token", res.data.token);
        window.location.href = "/verify-email";
      }
    } catch (error) {
      toast.error('Google signup failed. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Header/>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 mt-5 py-5">
        <ToastContainer />
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md mt-5 ">
          <h1 className="text-3xl font-bold text-center mb-8 mt-5">Create an Account</h1>
          <form onSubmit={handleSignup}>
            <div className="mb-6">
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={form.first_name}
                onChange={handleInputChange}
                placeholder="Enter First Name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={form.last_name}
                onChange={handleInputChange}
                placeholder="Enter Last Name"
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
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={form.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
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
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={form.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
              />
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="privacy-policy"
                className="mr-2"
                checked={isPrivacyChecked}
                onChange={(e) => setIsPrivacyChecked(e.target.checked)}
              />
              <label htmlFor="privacy-policy" className="text-sm">
                I accept the <Link href="/privacy-policy" className="text-indigo-600 font-bold">Privacy Policy</Link>.
              </label>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                checked={isTermsChecked}
                onChange={(e) => setIsTermsChecked(e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm">
                I accept the <Link href="/terms-conditions" className="text-indigo-600 font-bold">Terms & Conditions</Link>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full mb-4 bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-500 flex items-center justify-center"
            >
              {isLoading ? (
                <ThreeDots height="20" width="20" color="#ffffff" />
              ) : (
                "Signup"
              )}
            </button>

            {/* Custom Google Signup Button */}
            <GoogleLogin
          onSuccess={handleGoogleSignup}
          onError={() => toast.error("Google signup failed")}
          useOneTap
          shape="rectangular"
          theme="outline"
          text="continue_with" // This is where you set the button text to 'Continue with Google'
        />
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account? <Link href="/login" className="text-indigo-600 font-bold">Login</Link>
          </p>
        </div>
      </div>
      <Footer/>
    </GoogleOAuthProvider>
  );
}
