"use client";
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaUpload, FaGlobe } from 'react-icons/fa'; // Importing icons from react-icons
import Image from 'next/image';

export default function Main() {

    return (
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
                        <div className='flex md:flex-row flex-col items-center gap-5 justify-center md:justify-start w-full md:w-auto'>
                            <Link href="/signup">
                                <p className="bg-white text-black/70 px-8 py-4 md:w-auto w-[300px] rounded-full font-bold transition transform hover:scale-105 shadow-lg">
                                    Get Started
                                </p>
                            </Link>
                            <Link href="/">
                                <p className="bg-white text-black/70 px-8 py-4 md:w-auto w-[300px] rounded-full font-bold transition transform hover:scale-105 shadow-lg">
                                    Install the Extension
                                </p>
                            </Link>
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
                            className="text-center px-5 py-10 bg-white shadow-xl rounded-2xl transition transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaFileAlt className="text-indigo-600 mx-auto mb-6 text-4xl" /> {/* React Icon */}
                            <h3 className="text-xl font-semibold mb-4">Click to Simplify & Summarize </h3>
                            <p>Quickly summarize legal texts like Terms of Service and Privacy Policies with one click.</p>
                        </motion.div>

                        {/* Feature 2 */}
                        <motion.div
                            className="text-center rounded-2xl px-5 py-10 bg-white shadow-xl transition transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaUpload className="text-indigo-600 mx-auto mb-6 text-4xl" /> {/* React Icon */}
                            <h3 className="text-xl font-semibold mb-4">Upload Documents</h3>
                            <p>Upload and simplify legal documents directly from the website.</p>
                        </motion.div>

                        {/* Feature 3 */}
                        <motion.div
                            className="text-center rounded-2xl px-5 py-10 bg-white shadow-xl transition transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                        >
                            <FaGlobe className="text-indigo-600 mx-auto mb-6 text-4xl" /> {/* React Icon */}
                            <h3 className="text-xl font-semibold mb-4">Language Translation</h3>
                            <p>Translate the simplified document into multiple languages with ease.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
