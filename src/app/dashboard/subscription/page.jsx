"use client"
import { checkoutSession, checkSubscription } from "@/api/routes";
import Sidebar from "@/app/components/dashboard/Sidebar";
import { SubscriptionPlan } from "@/app/components/SubscriptionPlan";
import { ActiveSubscription } from "@/app/components/ActiveSubscription";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

const stripePromise = loadStripe("pk_test_51MZZceFROfbArqV2MpRbFWhhs9PhHfKSuInwSmq4PfBT2XszIzDLzuPBAsDFxlZU82xfgJE0xCDMe4xQh76hQvpg00U4Z6XY96");

const planFeatures = {
    yearly: ["Advanced simplification options", "Unlimited document uploads", "Analyze complex documents","Translation into multiple languages","Saved documents with cloud access","Download in multiple formats","Revision history access","Priority support","Bulk document processing"],
    monthly: ["Advanced simplification options", "Unlimited document uploads", "Analyze complex documents","Translation into multiple languages","Saved documents with cloud access","Download in multiple formats","Revision history access","Priority support","Bulk document processing"],
    daily: ["Advanced simplification options", "Unlimited document uploads", "Analyze complex documents","Translation into multiple languages","Saved documents with cloud access","Download in multiple formats","Revision history access","Priority support","Bulk document processing"]
};

const Subscription = () => {
    const [subscription, setSubscription] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscription = async () => {
        const token = sessionStorage.getItem("token");
        try {
            const response = await axios.get(checkSubscription, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setSubscription(response.data.subscription);
        } catch (error) {
            console.error("Error fetching subscription:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscription();
    }, []);

    const handleCheckout = async (price, title) => {
        const stripe = await stripePromise;
        if (!stripe) return;
        const token = sessionStorage.getItem("token");
        setLoading(true);

        try {
            const response = await axios.post(
                checkoutSession,
                { price, title },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data?.id) {
                const { error } = await stripe.redirectToCheckout({ sessionId: response.data.id });
                if (error) console.warn("Error during checkout:", error);
            } else {
                console.error("Invalid response from server:", response.data);
            }
        } catch (error) {
            console.error("Error creating checkout session:", error);
        } finally {
            setLoading(false);
        }
    };

    const subscriptionTypes = subscription.map(sub => sub.type);

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-3 md:p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>
                <div className="flex gap-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" fill="currentColor" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z" />
                            </svg>
                        </div>
                    ) : (
                        <>
                            {subscriptionTypes.includes("daily") && (
                                <ActiveSubscription title="Daily Plan" message="You have an active Daily subscription." features={planFeatures.daily} />
                            )}
                            {subscriptionTypes.includes("monthly") && (
                                <ActiveSubscription title="Monthly Plan" message="You have an active Monthly subscription." features={planFeatures.monthly} />
                            )}
                            {subscriptionTypes.includes("yearly") && (
                                <ActiveSubscription title="Yearly Plan" message="You have an active Yearly subscription." features={planFeatures.yearly} />
                            )}

                            {/* Only show subscription plans that are not already active */}
                            {!subscriptionTypes.includes("daily") && (
                                <SubscriptionPlan title="Daily Plan" price={4.99} features={planFeatures.daily} loading={loading} handleCheckout={() => handleCheckout(4.99, "24 Hours Plan")} />
                            )}
                            {!subscriptionTypes.includes("monthly") && (
                                <SubscriptionPlan title="Monthly Plan" price={9.99} features={planFeatures.monthly} loading={loading} handleCheckout={() => handleCheckout(9.99, "Monthly Plan")} />
                            )}
                            {!subscriptionTypes.includes("yearly") && (
                                <SubscriptionPlan title="Yearly Plan" price={75} features={planFeatures.yearly} loading={loading} handleCheckout={() => handleCheckout(75, "Yearly Plan")} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Subscription;