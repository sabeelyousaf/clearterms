"use client";
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaUpload, FaGlobe, FaArrowRight } from 'react-icons/fa'; // Importing icons from react-icons
import Image from 'next/image';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function Main() {


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
    <div className=" ">
      {/* Navbar */}


      {/* Hero Section */}
      <motion.section
        id='home'
        className="bg-[url('/hero.jpeg')]  bg-cover bg-center relative py-24 px-5 mt-16 md:h-[90vh] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-custom-gradient opacity-85"></div> {/* Adjust opacity for darkness */}

        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10"> {/* Added z-10 for layering */}
          {/* Left Side - Text */}
          <div className="text-center md:text-left md:w-1/2">
            <motion.h1
              className="text-5xl font-extrabold mb-5 tracking-tight text-white"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Simplify & Summarize Legal Documents in Seconds
            </motion.h1>
            <p className="mb-8 text-lg text-white max-w-2xl mx-auto md:mx-0">
              Install our Chrome Extension and easily summarize terms of service, privacy policies, contracts, and more!
            </p>

            <div className=' p-2  flex md:flex-row flex-col mt-7  items-center gap-5  lg:w-[500px]'>
              <Link href="/signup">
                <button
                  className="bg-indigo-600 rounded-lg text-white flex items-center justify-between gap-3 px-8 py-5 sm:w-[500px] md:w-auto font-bold transition-transform hover:scale-105 shadow-lg"
                >
                  <span>
                    Sign up<span className="font-light ms-1"> It's Free</span>
                  </span>
                  <span className="mt-1">
                    <FaArrowRight />
                  </span>
                </button>


              </Link>
            

                {/* Google Sign-In Button */}
                <div className="bg-white  md:w-auto rounded-lg text-white flex gap-3 px-5 py-3 font-bold transition transform hover:scale-105 shadow-lg">
                <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => toast.error("Google login failed")}
          useOneTap
          shape="rectangular"
          theme="outline"
          text="continue_with" // This is where you set the button text to 'Continue with Google'
        />

                </div>

              
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end">
            <Image
              src="/hero2.jpeg" // Change this to the actual path of your hero image
              alt="Hero Image"
              width={1080}
              height={1080}
              className="object-cover w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </motion.section>


      {/* Features Section */}
      <motion.section
        id="features"
        className="py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-screen-xl mx-auto md:px-0 px-3">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <motion.div
              className="text-center px-5 py-10 bg-white shadow-xl rounded-2xl   group hover:bg-indigo-600"
              whileHover={{ scale: 1.05 }}
            >
              <FaFileAlt className="text-indigo-600 mx-auto mb-6 text-4xl group-hover:text-white transition duration-300" /> {/* React Icon */}
              <h3 className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-white transition duration-300">Click to Simplify & Summarize</h3>
              <p className="text-gray-600 group-hover:text-indigo-100 transition duration-300">Quickly summarize legal texts like Terms of Service and Privacy Policies with one click.</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="text-center px-5 py-10 bg-white shadow-xl rounded-2xl transition transform hover:scale-105 group hover:bg-indigo-600"
              whileHover={{ scale: 1.05 }}
            >
              <FaUpload className="text-indigo-600 mx-auto mb-6 text-4xl group-hover:text-white transition duration-300" /> {/* React Icon */}
              <h3 className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-white transition duration-300">Upload Documents</h3>
              <p className="text-gray-600 group-hover:text-indigo-100 transition duration-300">Upload and simplify legal documents directly from the website.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="text-center px-5 py-10 bg-white shadow-xl rounded-2xl transition transform hover:scale-105 group hover:bg-indigo-600"
              whileHover={{ scale: 1.05 }}
            >
              <FaGlobe className="text-indigo-600 mx-auto mb-6 text-4xl group-hover:text-white transition duration-300" /> {/* React Icon */}
              <h3 className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-white transition duration-300">Language Translation</h3>
              <p className="text-gray-600 group-hover:text-indigo-100 transition duration-300">Translate the simplified document into multiple languages with ease.</p>
            </motion.div>
          </div>

        </div>
      </motion.section>
    </div>
    </GoogleOAuthProvider>
  );
}
