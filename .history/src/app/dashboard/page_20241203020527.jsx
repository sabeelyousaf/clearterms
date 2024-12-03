"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/dashboard/Sidebar";
import { FaArrowRight, FaFileAlt, FaUpload } from "react-icons/fa";
import { allDocs, checkSubscription, deleteDoc, uploadDoc } from "@/app/api/routes";
import axios from "axios";
import Link from "next/link";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [subscription, setSubscription] = useState(false);
  const [docs, setDocs] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false); // File upload loader
  const [uploadSuccess, setUploadSuccess] = useState(""); // Success message
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true); // Subscription check loader
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
    } finally {
      setIsCheckingSubscription(false); // Hide subscription loader
    }
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
      setDocs(response.data.data.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleViewDocument = (id) => {
    router.push(`/dashboard/document/${id}`);
  };

  const handleDeleteDocument = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(`${deleteDoc}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      await fetchDocs(); // Refresh documents
      await fetchSubscription(); // Refresh subscription
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleFileUpload = async (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const formData = new FormData();
    const token = sessionStorage.getItem("token");

    uploadedFiles.forEach((file) => formData.append("documents[]", file));
    setIsLoading(true);

    try {
      const response = await axios.post(uploadDoc, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setUploadSuccess("Documents uploaded successfully!");
        await fetchDocs(); // Refresh documents
        await fetchSubscription(); // Refresh subscription
      }
    } catch (error) {
      console.error("Error uploading documents:", error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadSuccess(""), 5000);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options).replace(",", "");
  };

  useEffect(() => {
    const firstName = sessionStorage.getItem("first_name") || "";
    const lastName = sessionStorage.getItem("last_name") || "";
    setUsername(`${firstName} ${lastName}`.trim());

    // Fetch subscription and documents
    fetchSubscription();
    fetchDocs();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="md:flex-1 pt-20 md:px-10 px-3 md:pt-10 bg-gray-100 overflow-auto">
        {isCheckingSubscription ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-700">
                Welcome, {username}!
              </h1>
              <p className="text-gray-600 mt-2">
                Here are your recent documents and activities.
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <div className="flex items-center">
                <FaUpload className="text-primary text-2xl mr-3" />
                <h2 className="text-xl font-semibold text-gray-700">
                  Upload Documents
                </h2>
              </div>
              <p className="pt-4">Drag and drop your documents for processing</p>
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
                    {isLoading ? "Uploading..." : "Click to Upload"}
                  </label>
                  {isLoading && <div className="loader mt-4"></div>}
                  {uploadSuccess && (
                    <div className="text-green-500 mt-2">{uploadSuccess}</div>
                  )}
                </div>
              ) : (
                <div className="mt-4">
                  <button
                    type="button"
                    disabled
                    className="bg-primary text-white py-2 font-bold px-4 rounded opacity-50 cursor-not-allowed"
                  >
                    Click to Upload
                  </button>
                  <div className="mt-3">
                    <Link href="/dashboard/subscription">
                      <div className="flex flex-row gap-1 transition-all duration-300 hover:ml-2">
                        <span style={{ color: "red" }}>
                          Need to buy a subscription first!
                        </span>
                        <FaArrowRight style={{ color: "red" }} className="mt-1" />
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

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
                        <td className="py-2">{file.document}</td>
                        <td className="py-2">{formatDate(file.created_at)}</td>
                        <td className="py-2">
                          <button
                            className="bg-primary text-white py-1 md:px-3 rounded px-1 mr-2"
                            onClick={() => handleViewDocument(file.id)}
                          >
                            View
                          </button>
                          <button
                            className="bg-red-500 text-white py-1 md:px-3 rounded px-1"
                            onClick={() => handleDeleteDocument(file.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
