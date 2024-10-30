"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Sidebar from '@/app/components/dashboard/Sidebar';
import { FaFileAlt, FaUpload } from 'react-icons/fa';
import SummaryModal from '../components/dashboard/SummaryModal';
import SimplifyModal from '../components/dashboard/SimplifyModal';
import { allDocs, checkSubscription, uploadDoc } from '@/api/routes';
import axios from 'axios';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSimplifyOpen, setModalSimplifyOpen] = useState(false);
  const [summary, setSummary] = useState('');
  const [simplify, setSimplify] = useState('');
  const [subscription, setSubscription] = useState(false);
  const [docs, setDocs] = useState([]); 
  const [documentId, setDocumentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State for preloader
  const [uploadSuccess, setUploadSuccess] = useState(''); // State for success message

  const router = useRouter();

  const fetchSubscription = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.get(checkSubscription, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setSubscription(response.data.subscription);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', ''); // Use en-GB to get 'dd mmm yyyy' format
  };
  
  const fetchDocs = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.get(allDocs, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const alldocs = response.data.data.data;
      setDocs(alldocs);
    } catch (error) {
      console.error("Error fetching docs:", error);
    }
  };

  useEffect(() => {
    fetchDocs();
    fetchSubscription();
  }, []);

  const handleFileUpload = async (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles([...files, ...uploadedFiles]);

    const formData = new FormData();
    const token = sessionStorage.getItem("token");
    uploadedFiles.forEach((file) => {
      formData.append('documents[]', file);
    });

    setIsLoading(true); // Show preloader

    try {
      const response = await axios.post(uploadDoc, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Documents uploaded successfully:', response.data.documents);
        setUploadSuccess('Documents uploaded successfully!'); // Set success message
        
        // Re-fetch documents after upload
        await fetchDocs(); // Call fetchDocs to update the documents list
      } else {
        console.error('Error uploading documents:', response.data.error);
      }
    } catch (error) {
      console.error('Failed to upload documents:', error);
    } finally {
      setIsLoading(false); // Hide preloader
      // Remove success message after 5 seconds
      setTimeout(() => {
        setUploadSuccess('');
      }, 5000);
    }
  };

  const handleViewDocument = (index) => {
    router.push(`/dashboard/document/${index}`); 
  };

  const handleSummarize = (fileId) => {
    setSummary(`This is a summary of the document: ${fileId}`);
    setDocumentId(fileId);
    setModalOpen(true);
  };

  const handleSimplify = (fileId) => {
    setSimplify(`This is a simplified text of the document: ${fileId}`);
    setDocumentId(fileId);
    setModalSimplifyOpen(true);
  };

  const handleTranslate = (language) => {
    alert(`Translating document to: ${language}`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="md:flex-1 pt-20 md:px-10 px-3 md:pt-10 bg-gray-100 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-700">
            Welcome, Mark!
          </h1>
          <p className="text-gray-600 mt-2">
            Here are your recent documents and activities.
          </p>
        </div>

        {/* Document Upload Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <FaUpload className="text-primary text-2xl mr-3" />
            <h2 className="text-xl font-semibold text-gray-700">
              Upload Documents
            </h2>
          </div>
          <p className="text-gray-500 mt-2">
            Drag & Drop your files or click to upload.
          </p>
          {subscription ? (
            <div className="mt-4">
              <input
                type="file"
                id="upload"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="upload"
                className="cursor-pointer bg-primary text-white py-2 px-4 rounded"
              >
                {isLoading ? 'Uploading...' : 'Click to Upload'}
              </label>
              {isLoading && <div className="loader mt-4"></div>} {/* Preloader */}
              {uploadSuccess && <div className="text-green-500 mt-2">{uploadSuccess}</div>} {/* Success message */}
            </div>
          ) : (
            <div className="mt-4">
              <button
                type="button"
                disabled
                className="bg-primary text-white py-2 px-4 rounded opacity-50 cursor-not-allowed"
              >
                Click to Upload 
              </button>
              <div className="mt-3">
                <span style={{ color: "red" }}>Need To Buy Subscription First!</span>
              </div>
            </div>
          )}
        </div>

        {/* Recent Documents Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaFileAlt className="text-primary text-2xl mr-3" />
            <h2 className="text-xl font-semibold text-gray-700">
              Recent Documents
            </h2>
          </div>
          {docs.length === 0 ? (
            <p className="text-gray-500">No documents uploaded yet.</p>
          ) : (
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-2">Document Name</th>
                  <th className="py-2">Date Uploaded</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((file, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2">Document {index}</td>
                    <td className="py-2">{formatDate(file.created_at)}</td> {/* Format the date */}
                    <td className="py-2">
                      <button
                        className="bg-primary text-white py-1 md:px-3 rounded px-1 mr-2"
                        onClick={() => handleViewDocument(file.id)}
                      >
                        View
                      </button>
                      <button
                        className="bg-blue-500 text-white py-1 md:px-3 rounded px-1 mr-2"
                        onClick={() => handleSummarize(file.id)}
                      >
                        Summarize
                      </button>
                      <button
                        className="bg-green-500 text-white py-1 md:px-3 rounded px-1"
                        onClick={() => handleSimplify(file.id)}
                      >
                        Simplify
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Summary Modal */}
      
 <SummaryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        summary={summary}
        documentId={documentId} // Pass document ID as prop
        onTranslate={handleTranslate}
      />
      <SimplifyModal
        isOpen={modalSimplifyOpen}
        onClose={() => setModalSimplifyOpen(false)}
        simplify={simplify}
        documentId={documentId} // Pass document ID as prop
        onTranslate={handleTranslate}
      />
      </div>
    </div>
  );
};

export default Dashboard;
