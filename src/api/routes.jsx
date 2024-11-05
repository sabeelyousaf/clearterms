// Base URL
const BASE_URL = "http://127.0.0.1:8000/api";

// Auth
const login = `${BASE_URL}/login`;
const register = `${BASE_URL}/register`;
const profileUpdate = `${BASE_URL}/profile-update`;

// Stripe
const checkSubscription = `${BASE_URL}/check-subscription`;
const checkoutSession = `${BASE_URL}/create-checkout-session`;

// Docs
const allDocs = `${BASE_URL}/docs`;
const singleDoc = `${BASE_URL}/doc`;
const uploadDoc = `${BASE_URL}/doc/upload`;

// AI
const docSummarize = `${BASE_URL}/doc/summarize`;
const docSimplify = `${BASE_URL}/doc/simplify`;

export {
    login,
    register,
    checkSubscription,
    checkoutSession,
    allDocs,
    uploadDoc,
    docSummarize,
    docSimplify,
    profileUpdate,
    singleDoc
};
