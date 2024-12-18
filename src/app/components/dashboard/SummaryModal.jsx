import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { FaTimes } from 'react-icons/fa'; 
import axios from 'axios'; 
import { docSummarize, downloadPdf, downloadDocx, generatePDF, generateDocx } from '@/app/api/routes'; // Update this with your actual route imports
import { marked } from 'marked';

const SummaryModal = ({ isOpen, onClose, summary, documentId }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [loading, setLoading] = useState(false); 
  const [translatedSummary, setTranslatedSummary] = useState('');
  const [selectedDownloadType, setSelectedDownloadType] = useState('');

  const handleTranslate = async () => {
    setLoading(true); 
    setTranslatedSummary(''); 
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(docSummarize, {
        document_id: documentId,
        language: selectedLanguage,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const summaryText = response.data.summary || 'No summary available';
      setTranslatedSummary(summaryText); 
    } catch (error) {
      console.error(error);
      setTranslatedSummary('Error in translation. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  const handleDownload = async () => {
    if (!selectedDownloadType) {
      alert("Please select a download type.");
      return;
    }
    
    setLoading(true); 
    const token = localStorage.getItem("token");
    const apiUrl = selectedDownloadType === "pdf" ? generatePDF : generateDocx;

    try {
      const response = await axios.post(apiUrl, {
        content: translatedSummary || summary,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        responseType: 'blob', // Important for file download
      });

      // Create a link to download the file
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `summary.${selectedDownloadType}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoading(false);
    }
  };

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
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes className="text-xl" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Document Summary</h2>

        {loading ? (
          <div className="flex justify-center items-center h-24">
            <div className="loader"></div>
          </div>
        ) : translatedSummary ? (
          <div 
            style={{ maxHeight: "600px", overflow: 'scroll' }} 
            dangerouslySetInnerHTML={{ __html: getHtmlFromMarkdown(translatedSummary) }} 
          />
        ) : (
          <div>{summary}</div>
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
          </select>
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded ml-2"
            onClick={handleTranslate}
            disabled={loading}
          >
            Translate
          </button>
        </div>
        
        {/* Download Options */}
        <div className="mt-3">
          <select
            className="border rounded py-1 px-2"
            value={selectedDownloadType}
            onChange={(e) => setSelectedDownloadType(e.target.value)}
          >
            <option value="" disabled>Choose Download Type</option>
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
          </select>
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded ml-2"
            onClick={handleDownload}
            disabled={loading || !selectedDownloadType}
          >
            Download
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SummaryModal;
