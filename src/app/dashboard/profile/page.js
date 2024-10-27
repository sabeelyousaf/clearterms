"use client";
import { useState, useEffect } from "react"; // Added useEffect
import Sidebar from "@/app/components/dashboard/Sidebar";
import { profileUpdate } from "@/api/routes";
import axios from "axios";

const AccountSettings = () => {
    const [name, setName] = useState(''); // State for the user's name
    const [email, setEmail] = useState(''); // State for the user's email
    const [password, setPassword] = useState(''); // State for the user's password
    const [message, setMessage] = useState(''); // State for success messages
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

    // Use useEffect to initialize state from session storage
    useEffect(() => {
        const storedName = sessionStorage.getItem("name") || ""; // Default to empty string if not found
        const storedEmail = sessionStorage.getItem("email") || ""; // Default to empty string if not found
        setName(storedName);
        setEmail(storedEmail);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh

        // Prepare form data
        const data = {
            name, // Include user's name
            email,
            password, // Include password if provided
        };

        try {
            const token = sessionStorage.getItem("token"); // Get the token from session storage
            const response = await axios.post(profileUpdate, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const result = response.data; // The response is already in JSON format

            if (response.status === 200) {
                // Update session storage with the new name and email
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("email", email);
                setMessage(result.message);
                setErrorMessage(''); // Clear any previous error messages
            } else {
                setErrorMessage(result.message);
                setMessage(''); // Clear any previous success messages
            }
        } catch (error) {
            setErrorMessage('An error occurred while updating your profile.');
            setMessage(''); // Clear any previous success messages
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-3 md:p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
                <form onSubmit={handleSubmit}>
                    {message && <div className="text-green-500 mb-4">{message}</div>}
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 w-full rounded-lg"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full rounded-lg"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 w-full rounded-lg"
                            placeholder="Change your password"
                        />
                    </div>
                    <button type="submit" className="bg-primary text-white py-2 px-4 rounded">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default AccountSettings;
