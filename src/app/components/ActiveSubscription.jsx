import React from 'react';
import { CheckIcon } from "@heroicons/react/outline";

export const ActiveSubscription = ({ title, message, features ,expiryDate}) => (
    <div className="bg-gray-100 max-w-[400px] md:h-[590px] px-5 py-8 rounded-3xl shadow-xl">
        <div className="flex flex-col justify-between h-full">
            <div>
                <h3 className="text-2xl font-bold mb-4 text-indigo-600">{title}</h3>
                <p className="mb-4 text-gray-700">{message}</p>
                <ul className="list-none mb-6">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center mb-2">
                            <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <span className='text-red-500 text-center'>Expiry Date : {expiryDate}</span>
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center font-semibold">
                Active Subscription
            </div>
        </div>
    </div>
);
