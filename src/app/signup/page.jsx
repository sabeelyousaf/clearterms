"use client";
import { register } from "@/api/routes";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure toast styles are included

export default function Signup() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false); // State for privacy policy checkbox
  const [isTermsChecked, setIsTermsChecked] = useState(false); // State for terms & conditions checkbox

  // Check if token exists and redirect to dashboard
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation for checkboxes
    if (!isPrivacyChecked || !isTermsChecked) {
      toast.error("Please accept the Privacy Policy and Terms & Conditions.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const response = await axios.post(register, form);

      if (response.status === 200) {
        toast.success("Signup successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("subscription", response.data.subscription);
        sessionStorage.setItem("first_name", response.data.data.first_name);
        sessionStorage.setItem("last_name", response.data.data.last_name);
        sessionStorage.setItem("email", response.data.data.email);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Error signing up. Please try again.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Create an Account</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-6">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              value={form.first_name}
              onChange={handleInputChange}
              placeholder="Enter First Name"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-700">
              Surname / Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              value={form.password}
              onChange={handleInputChange}
              placeholder="Enter Password"
            />
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="privacy_policy"
              className="mr-2"
              checked={isPrivacyChecked}
              onChange={(e) => setIsPrivacyChecked(e.target.checked)}
            />
            <label htmlFor="privacy_policy" className="text-sm font-medium text-gray-700">
              I accept the <Link href="/privacy-policy" className="text-indigo-600">Privacy Policy</Link>
            </label>
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="terms_conditions"
              className="mr-2"
              checked={isTermsChecked}
              onChange={(e) => setIsTermsChecked(e.target.checked)}
            />
            <label htmlFor="terms_conditions" className="text-sm font-medium text-gray-700">
              I accept the <Link href="/terms-conditions" className="text-indigo-600">Terms & Conditions</Link>
            </label>
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
