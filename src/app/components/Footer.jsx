'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
                    {/* About Section */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">About Us</h4>
                        <p className="text-sm mb-2">
                            We provide tools to simplify legal documents and empower users to understand their rights.
                        </p>
                        <Link href="/about" className="text-white hover:underline">
                            Learn More
                        </Link>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Links</h4>
                        <ul className="list-none">
                            <li className="mb-2">
                                <Link href="/" className="text-white hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/#features" className="text-white hover:underline">
                                    Features
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/#pricing" className="text-white hover:underline">
                                    Pricing 
                                </Link>
                            </li>
                            <li className="mb-2">
                            <Link href="/privacy" className="text-white hover:underline">
                                Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook className="w-6 h-6 text-white hover:text-indigo-300" />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className="w-6 h-6 text-white hover:text-indigo-300" />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="w-6 h-6 text-white hover:text-indigo-300" />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className="w-6 h-6 text-white hover:text-indigo-300" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="border-gray-700" />
                <div className="text-center mt-6">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Clear Terms. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
