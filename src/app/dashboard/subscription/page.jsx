"use client";
import { checkoutSession, checkSubscription } from "@/api/routes";
import Sidebar from "@/app/components/dashboard/Sidebar";
import { CheckIcon } from "@heroicons/react/outline";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

const stripePromise = loadStripe("pk_test_51MZZceFROfbArqV2MpRbFWhhs9PhHfKSuInwSmq4PfBT2XszIzDLzuPBAsDFxlZU82xfgJE0xCDMe4xQh76hQvpg00U4Z6XY96");

const Subscription = () => {
    const [subscription, setSubscription] = useState(false);

    const premiumFeatures = [
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

    const fetchSubscription = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.get(checkSubscription, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        });
        
        console.log(response);
        
        const subscriptionStatus = response.data.subscription;
        setSubscription(subscriptionStatus);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      }
    };
    useEffect(() => {
      fetchSubscription();
    }, []);
    

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        if (!stripe) {
            console.error("Stripe.js has not loaded yet.");
            return;
        }

        const price = 9.99;
        const token = sessionStorage.getItem("token");

        try {
            const response = await axios.post(
                checkoutSession,
                { price },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data && response.data.id) {
                const { error } = await stripe.redirectToCheckout({ sessionId: response.data.id });
                if (error) {
                    console.warn("Error during checkout:", error);
                }
            } else {
                console.error("Invalid response from server:", response.data);
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
            // Optionally, show an error message to the user here
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-3 md:p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>

                {subscription ? (
                    <p className="text-lg font-semibold text-green-600">
                        You already have an active subscription.
                    </p>
                ) : (
                    <div className="bg-white max-w-[400px] md:h-[590px] px-5 py-8 rounded-3xl shadow-xl">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
                                <p className="mb-4">
                                    Unlimited uploads and extension uses with priority support.
                                </p>
                                <p className="font-bold text-lg mb-8">$9.99/month</p>

                                <ul className="list-none mb-6">
                                    {premiumFeatures.map((feature, index) => (
                                        <li key={index} className="flex items-center mb-2">
                                            <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p
                                onClick={handleCheckout}
                                className="bg-indigo-600 text-center text-white px-8 py-3 rounded-full font-bold cursor-pointer transition-transform transform hover:scale-105"
                            >
                                Upgrade Now
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Subscription;
