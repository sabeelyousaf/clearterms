"use client";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <div className="my-5 py-5">
        <div className="my-5 "></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">
          Privacy Policy For Clear Terms
        </h2>
        <p className="mb-4">Effective Date: 1st December, 2024</p>

        <p className="mb-4">
          At Clear Terms, we prioritize your privacy and are committed to
          safeguarding your data. This Privacy Policy explains how we collect,
          use, store, and protect your information when you use our services,
          including our Chrome extension and web-based platform for document
          simplification, summarization, and translation.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h3>
        <p className="mb-4">
          <strong>a. Personal Information:</strong> During registration, we
          collect personal details such as your name, email address, and account
          credentials to set up and manage your account.
        </p>

        <p className="mb-4">
          <strong>b. Document Data:</strong> When you upload or analyze documents through Clear Terms, the content is processed and temporarily stored to provide our services. If you choose to save a document in your account, it will be stored securely, but you retain the option to delete it at any time.
        </p>

        <p className="mb-4">
          <strong>c. Usage Information:</strong> We gather information about how
          you interact with our platform to improve the user experience and
          provide personalized content. This may include data on pages visited,
          actions taken, and preferences set.
        </p>

        <p className="mb-4">
          <strong>d. Cookies and Similar Technologies:</strong> Cookies help us
          personalize your experience and enhance platform performance by
          remembering preferences.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Your Information
        </h3>
        <p className="mb-4">We use the information collected to:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Provide and maintain our services</li>
          <li>
            Improve user experience and enhance the platform’s performance
          </li>
          <li>Respond to inquiries and offer customer support</li>
          <li>
            Comply with legal obligations and prevent misuse of our platform
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          3. Document Privacy and Data Handling
        </h3>
        <p className="mb-4">
          Documents uploaded for simplification, summarization, or translation
          are processed on a temporary basis. We do not permanently store
          document data unless you choose to save it within your account.
          Unsaved document content is deleted immediately after processing.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          4. Data Retention and Deletion
        </h3>
        <p className="mb-4">
          We retain personal data only as long as necessary to provide our
          services or meet legal requirements. Uploaded documents are processed
          temporarily and deleted after output generation unless saved by the
          user.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          5. Sharing Your Information
        </h3>
        <p className="mb-4">
          We do not sell or share your personal or document data with third
          parties, except:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            With trusted service providers who help operate our platform, bound
            by confidentiality agreements
          </li>
          <li>To comply with legal obligations or regulatory requirements</li>
          <li>To prevent fraud or misuse of our platform</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">6. Data Security</h3>
        <p className="mb-4">
          We implement strong security measures, including encryption, secure
          servers, and restricted access, to protect your data from unauthorized
          access, alteration, or deletion.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          7. International Data Transfers
        </h3>
        <p className="mb-4">
          Your data may be transferred to and processed in countries outside
          your own. For users in the EU or EEA, we ensure GDPR compliance by
          using safeguards like Standard Contractual Clauses.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          8. Your Rights Under GDPR and Other Privacy Laws
        </h3>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Access, correct, or delete your personal information</li>
          <li>Object to or restrict processing of your data</li>
          <li>Withdraw consent at any time, where applicable</li>
          <li>Request data portability</li>
        </ul>
        <p className="mb-4">
          To exercise these rights, please contact us at support@clearterms.ai.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          9. Cookies and Opt-Out Options
        </h3>
        <p className="mb-4">
          Clear Terms uses cookies to enhance your experience. You may adjust
          your browser settings to manage cookies, though this may affect
          platform functionality.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          10. Changes to This Privacy Policy
        </h3>
        <p className="mb-4">
          We may periodically update this policy to reflect changes in our
          practices or legal requirements. Significant changes will be
          communicated via our website or email.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">11. Contact Us</h3>
        <p className="mb-4">
          For questions or requests regarding this policy, please contact us at:
        </p>
        <p className="mb-4">Email: support@clearterms.ai</p>

        <p>
          By using Clear Terms, you agree to this Privacy Policy and the
          processing of your data as outlined.
        </p>
      </div>
      <Footer />
    </>
  );
}
