"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/app/components/dashboard/Sidebar';
import { singleDoc } from '@/api/routes';

const DocumentDetails = ({ params }) => {
  const { id } = params; // Get the document ID from the URL
  const [documentContent, setDocumentContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const fetchDocumentContent = async () => {
      try {
        const response = await axios.get(`${singleDoc}/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
      }); // Corrected API URL
        
        if (response.status === 200 && response.data.status === 200) {
          
          setDocumentContent(response.data.data); // Assuming 'data' holds the document content
        } else {
          setError(response.data.message || 'Failed to retrieve document content');
        }
      } catch (err) {
        setError('An error occurred while fetching the document content');
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentContent();
  }, [id]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 pt-20 px-3 md:px-10 md:pt-10 bg-gray-100 overflow-auto">
        <h1 className="text-3xl font-bold">Document {id}</h1>

        {loading ? (
          <p>Loading document content...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <p>
              <strong>Date Uploaded:</strong> {new Date().toLocaleDateString()}
            </p>
            <h2 className="text-xl font-semibold mt-4">Content</h2>
            <div
              dangerouslySetInnerHTML={{ __html: documentContent }}
              className="whitespace-pre-wrap"
            />

          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentDetails;
