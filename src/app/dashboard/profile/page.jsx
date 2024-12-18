"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/app/components/dashboard/Sidebar";
import { profileUpdate } from "@/app/api/routes";
import axios from "axios";

const AccountSettings = () => {
    const [firstName, setFirstName] = useState(""); // State for the user's first name
    const [lastName, setLastName] = useState(""); // State for the user's last name
    const [email, setEmail] = useState(""); // State for the user's email
    const [password, setPassword] = useState(""); // State for the user's password
    const [message, setMessage] = useState(""); // State for success messages
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages

    // Use useEffect to initialize state from session storage
    useEffect(() => {
        setFirstName(localStorage.getItem("first_name") || "");
        setLastName(localStorage.getItem("last_name") || "");
        setEmail(localStorage.getItem("email") || "");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh

        const data = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        };

        try {
            const token = localStorage.getItem("token"); // Get the token from session storage
            const response = await axios.post(profileUpdate, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                const result = response.data;
                // Update session storage with the new values
                localStorage.setItem("first_name", firstName);
                localStorage.setItem("last_name", lastName);
                localStorage.setItem("email", email);

                setMessage(result.message || "Profile updated successfully.");
                setErrorMessage("");
            } else {
                setErrorMessage(response.data.message || "An unexpected error occurred.");
                setMessage("");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred while updating your profile.");
            setMessage("");
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
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border p-2 w-full rounded-lg"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border p-2 w-full rounded-lg"
                            placeholder="Enter your last name"
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
                    <button type="submit" className="bg-primary text-white py-2 px-4 rounded">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountSettings;
