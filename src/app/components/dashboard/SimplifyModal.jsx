"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Make sure to install framer-motion for animations
import { FaTimes } from 'react-icons/fa'; // Import the cross icon
import axios from 'axios'; // Import axios for API calls
import { marked } from 'marked'; // Import marked for Markdown conversion
import { docSimplify } from '@/api/routes';

const SimplifyModal = ({ isOpen, onClose, simplify, documentId }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English
  const [translatedText, setTranslatedText] = useState(''); // State to store translated text
  const [loading, setLoading] = useState(false); // Loading state

  const handleTranslate = async () => {
    setLoading(true); // Set loading to true
    setTranslatedText(''); // Clear any previous translation
    const token = sessionStorage.getItem("token"); // Get token from session storage

    try {
      const response = await axios.post(docSimplify, { // Replace with your API endpoint
        document_id: documentId,
        language: selectedLanguage,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Assuming the response contains a 'simplified_text' field with Markdown
      const simplifiedText = response.data.summary || 'No simplification available';
      setTranslatedText(simplifiedText); // Set the translated text

    } catch (error) {
      console.error(error);
      setTranslatedText('Error in translation. Please try again.');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Convert Markdown to HTML
  const getHtmlFromMarkdown = (markdown) => {
    return marked(markdown);
  };

  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg relative" // Added relative for positioning the icon
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }} // Smooth transition
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes className="text-xl" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Document Simplification</h2>

        {loading ? (
          <div className="flex justify-center items-center h-24">
            <div className="loader"></div> {/* Add your loader style here */}
          </div>
        ) : translatedText ? (
          <div 
            style={{ maxHeight: "600px", overflow: 'scroll' }} 
            dangerouslySetInnerHTML={{ __html: getHtmlFromMarkdown(translatedText) }} 
          />
        ) : (
          <p>{simplify}</p> // Show original simplification text if no translation yet
        )}

        <h3 className="mt-4 font-medium">Translate to:</h3>
        <div className="mt-2">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border rounded py-1 px-2"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            {/* Add more languages as needed */}
          </select>
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded ml-2"
            onClick={handleTranslate}
            disabled={loading}
          >
            Translate
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SimplifyModal;
