import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function VerifyEmail() {
    return (
      <>
      <Header/>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Email Verification</h1>
          <p className="text-center">Please check your email to verify your account. If you don't see the email, check your spam folder.</p>
          <Link href="/"
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-500 flex items-center justify-center mt-5"
          >
          Back to homepage
          </Link>
        </div>
      </div>
      <Footer/>
      </>
    );
  }
  