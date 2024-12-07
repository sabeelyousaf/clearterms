"use client"
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/outline'; // Import check icon from Heroicons
import Link from 'next/link';


const yearly =[
    "Access for 365 days",
    "Advanced simplification options",
    "Unlimited document uploads",
    "Analyze complex documents",
    "Translation into multiple languages",
    "Saved documents with cloud access",
    "Download in multiple formats",
    "Revision history access",
    "Priority support",
    "Bulk document processing",
  ];
 const monthly= [
    "Access for 30 days",
    "Advanced simplification options",
    "Unlimited document uploads",
    "Analyze complex documents",
    "Translation into multiple languages",
    "Saved documents with cloud access",
    "Download in multiple formats",
    "Revision history access",
    "Priority support",
    "Bulk document processing",
  ];
  const daily =[
    "Access for 24 hours",
    "Advanced simplification options",
    "Unlimited document uploads",
    "Analyze complex documents",
    "Translation into multiple languages",
    "Saved documents with cloud access",
    "Download in multiple formats",
    "Revision history access",
    "Priority support",
    "Bulk document processing",
  ];




const PricingSection = () => {
    return (
        <motion.section
            id="pricing"
            className="py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-screen-xl mx-auto text-center md:px-0 px-3">
                <h2 className="text-4xl font-bold mb-12">Pricing Plans</h2>
                <div className="flex md:flex-row flex-col items-center justify-center gap-10 ">
                    {/* Free Plan */}
                

                    {/* Dail Plan */}
                    <motion.div
                        className="bg-white max-w-[400px] md:h-auto px-5 py-8 rounded-3xl shadow-xl transition-transform transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className='flex flex-col justify-between h-full'>
                            <div>

                        <h3 className="text-2xl font-bold mb-4">24 Hours Plan</h3>
                        <p className="mb-4">Unlimited uploads and extension uses with priority support.</p>
                        <p className="font-bold text-lg mb-8">$4.99/day</p>

                        {/* Features List */}
                        <ul className="list-none mb-6">
                            {daily.map((feature, index) => (
                                <li key={index} className="flex items-center mb-2 text-left">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                            </div>
                            <Link href="/login">
                            <p className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold transition-transform transform hover:scale-105">
                                Upgrade Now
                            </p>
                        </Link>
                        </div>

                    </motion.div>
                    {/* Monthly */}
                    <motion.div
                        className="bg-white max-w-[400px] md:h-auto px-5 py-8 rounded-3xl shadow-xl transition-transform transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className='flex flex-col justify-between h-full'>
                            <div>

                        <h3 className="text-2xl font-bold mb-4">Monthly Plan</h3>
                        <p className="mb-4">Unlimited uploads and extension uses with priority support.</p>
                        <p className="font-bold text-lg mb-8">$9.99/month</p>

                        {/* Features List */}
                        <ul className="list-none mb-6">
                            {monthly.map((feature, index) => (
                                <li key={index} className="flex items-center mb-2 text-left">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                            </div>
                            <Link href="/login">
                            <p className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold transition-transform transform hover:scale-105">
                                Upgrade Now
                            </p>
                        </Link>
                        </div>

                    </motion.div>
                    {/* Yearly */}
                    <motion.div
                        className="bg-white max-w-[400px] md:h-auto px-5 py-8 rounded-3xl shadow-xl transition-transform transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className='flex flex-col justify-between h-full'>
                            <div>
                        <h3 className="text-2xl font-bold mb-4">Yearly Plan</h3>
                        <p className="mb-4">Unlimited uploads and extension uses with priority support.</p>
                        <p className="font-bold text-lg mb-8">$75/year</p>

                        {/* Features List */}
                        <ul className="list-none mb-6">
                            {yearly.map((feature, index) => (
                                <li key={index} className="flex items-center mb-2 text-left">
                                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                            </div>
                        <Link href="/login">
                            <p className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold transition-transform transform hover:scale-105">
                                Upgrade Now
                            </p>
                        </Link>
                        </div>

                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default PricingSection;
