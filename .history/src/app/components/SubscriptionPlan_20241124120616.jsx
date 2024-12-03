import React from 'react'
import { CheckIcon } from "@heroicons/react/outline";
export const SubscriptionPlan = ({ title, price, features, loading, handleCheckout ,withPrice }) => (
    <div className="bg-white max-w-[400px] md:h-[590px] px-5 py-8 rounded-3xl shadow-xl">
        <div className="flex flex-col justify-between h-full">
            <div>
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <p className="mb-4">Unlimited uploads and extension uses with priority support.</p>
                <p className="font-bold text-lg mb-8">${price}/{withPrice}</p>
                <ul className="list-none mb-6">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center mb-2">
                            <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                onClick={handleCheckout}
                className={`bg-indigo-600 text-center text-white px-8 py-3 rounded-lg font-bold cursor-pointer transition-transform transform hover:scale-105 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" fill="currentColor" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z" />
                        </svg>
                        Processing...
                    </span>
                ) : (
                    "Upgrade Now"
                )}
            </button>
        </div>
    </div>
);
