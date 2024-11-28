"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai'; // Icon for mobile menu
import { motion } from 'framer-motion';
import { AiOutlineUser } from 'react-icons/ai'; // Profile icon
import logo from './../../../public/logo.png'
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Check if the user is logged in
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(token !== null); // Update logged-in state
    }, []);

    return (
        <div>
            <header className="bg-white shadow-md fixed w-full top-0 z-50 py-3">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 md:px-8">
                    <Image src={logo} alt='Logo' width={200} className=' object-contain bg-blend-overlay' />
                    <nav className="hidden md:flex gap-x-8 items-center">
                        <Link href="/#home"><p className="hover:text-indigo-600">Home</p></Link>
                        <Link href="/#features"><p className="hover:text-indigo-600">Features</p></Link>
                        <Link href="/#pricing"><p className="hover:text-indigo-600">Pricing</p></Link>
                        {!isLoggedIn ? (
                            <Link href="/login"><p className="bg-indigo-600 text-white px-6 py-3 rounded-lg">Login</p></Link>
                        ) : (
                            <div className="relative">
                                <button onClick={toggleDropdown} className="flex items-center">
                                    <AiOutlineUser className="w-6 h-6" />
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20">
                                        <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-indigo-100">Dashboard</Link>
                                        <Link href="/dashboard/profile" className="block px-4 py-2 text-sm hover:bg-indigo-100">Settings</Link>
                                        <button onClick={() => {
                                            sessionStorage.removeItem('token'); // Clear the token on logout
                                            setIsLoggedIn(false); // Update logged-in state
                                            window.location.href = '/'; // Redirect to homepage
                                        }} className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-100">Logout</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>
                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={toggleMenu}>
                        <AiOutlineMenu className="w-6 h-6" /> {/* React Icon for the menu */}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full"
                    >
                        <div className="flex flex-col items-center space-y-4 py-4">
                            <Link href="#home"><p className="hover:text-indigo-600" onClick={toggleMenu}>Home</p></Link>
                            <Link href="#features"><p className="hover:text-indigo-600" onClick={toggleMenu}>Features</p></Link>
                            <Link href="#pricing"><p className="hover:text-indigo-600" onClick={toggleMenu}>Pricing</p></Link>
                            {!isLoggedIn ? (
                                <Link href="/login"><p className="bg-indigo-600 text-white px-6 py-2 rounded-lg">Login</p></Link>
                            ) : (
                                <div className="relative">
                                    <button onClick={toggleDropdown} className="flex items-center">
                                        <AiOutlineUser className="w-6 h-6" />
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20">
                                            <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-indigo-100">Dashboard</Link>
                                            <Link href="/dashboard/profile" className="block px-4 py-2 text-sm hover:bg-indigo-100">Settings</Link>
                                            <button onClick={() => {
                                                sessionStorage.removeItem('token'); // Clear the token on logout
                                                setIsLoggedIn(false); // Update logged-in state
                                                window.location.href = '/'; // Redirect to homepage
                                            }} className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-100">Logout</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </header>
        </div>
    );
}

export default Header;
