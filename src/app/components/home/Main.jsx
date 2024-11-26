"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { googleAuth, redirectGoogle } from "@/api/routes";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

export default function Main() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;

    try {
      // Send Google token to backend
      const response = await fetch(googleAuth, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: googleToken }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();

      // Save JWT token and user info in localStorage
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Show success message
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });

      // Redirect user to dashboard
      if (isClient) {
        const { useRouter } = require("next/router"); // Dynamically import to avoid SSR issues
        const router = useRouter();
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      console.error(error);
    }
  };

  const handleRedirectGoogle = async () => {
    try {
      // Trigger Google login
      const user = await signIn();
  
      // Send Google ID token to your backend
      const response = await fetch(redirectGoogle, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: user.credential }),
      });
  
      if (!response.ok) {
        throw new Error("Authentication failed");
      }
  
      const data = await response.json();
  
      // Save token and user info in local storage
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
  
      router.push("/dashboard");
    } catch (error) {
      toast.error("Google sign-up failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      console.error(error);
    }
  };
  

  const handleGoogleError = () => {
    toast.error("Google sign-up failed. Please try again.", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };

  const { signIn } = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    clientId: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google client ID
  });

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        <motion.section
          id="home"
          className="bg-[url('/hero.jpeg')] bg-cover bg-center relative py-24 px-5 mt-16 md:h-[90vh] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-custom-gradient opacity-85"></div>
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
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

              <div className="p-2 flex md:flex-row flex-col mt-7 items-center gap-5 lg:w-[500px]">
                <Link href="/signup">
                  <button className="bg-indigo-600 rounded-lg text-white flex items-center justify-between gap-3 px-8 py-5 sm:w-[500px] md:w-auto font-bold transition-transform hover:scale-105 shadow-lg">
                    <span>
                      Sign up<span className="font-light ms-1"> It's Free</span>
                    </span>
                    <span className="mt-1">
                      <FaArrowRight />
                    </span>
                  </button>
                </Link>

                {/* Custom Google Sign-In Button */}
                <button
                  onClick={handleRedirectGoogle}
                  className="bg-white flex gap-3  px-6 w-auto py-4 rounded-lg font-semibold shadow-lg hover:bg-indigo-600 transition-all"
                >
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" width={30} alt="" /> <span className="mt-1">Sign up with Google</span>
                </button>
              </div>
            </div>

            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end">
              <Image
                src="/hero2.jpeg"
                alt="Hero Image"
                width={1080}
                height={1080}
                className="object-cover w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </GoogleOAuthProvider>
  );
}
