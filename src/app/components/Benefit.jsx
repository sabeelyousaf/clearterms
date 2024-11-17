import React from 'react';

export const Benefit = ({ icon: Icon, text, description }) => (
    <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md max-w-[300px] h-full group hover:bg-indigo-600 transition duration-300">
        <Icon className="w-12 h-12 text-indigo-500 mb-4 group-hover:text-white transition duration-300" />
        <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-white transition duration-300">{text}</h3>
        <p className="text-gray-600 group-hover:text-indigo-100 transition duration-300">{description}</p>
    </div>
);
