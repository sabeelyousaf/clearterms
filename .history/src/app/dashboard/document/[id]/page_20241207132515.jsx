"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "@/app/components/dashboard/Sidebar";
import { FaArrowLeft, FaFileAlt, FaUpload } from "react-icons/fa";
import { singleDoc, downloadContent } from "@/app/api/routes";
import Link from "next/link";
import { ThreeDots } from 'react-loader-spinner'
const DocumentDetails = ({ params }) => {
const { id } = params; // Get the document ID from the URL
const [inputText, setInputText] = useState("");
const [outputText, setOutputText] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [selectedLanguage, setSelectedLanguage] = useState("english");
const [documentContent, setDocumentContent] = useState(null);
const [error, setError] = useState(null); // State for errors
const [translate, setTranslate] = useState(false); // State for errors
const [selectedDownloadType, setSelectedDownloadType] = useState("");
const [simplifyloading, setSimplifyLoading] = useState(false);
const [summarizeLoading, setSummarizeLoading] = useState(false);
const [reset, setReset] = useState(false);





const [docName,SetdocName]= useState('');

useEffect(() => {
    fetchDocumentContent();
  }, []);

  const handleDownload = async () => {
    if (!selectedDownloadType) {
      alert("Please select a download type.");
      return;
    }

    setLoading(true);
    const token = sessionStorage.getItem("token");
    const apiUrl = downloadContent;

    try {
      const response = await axios.post(
        apiUrl,
        {
          content: outputText,
          type: selectedDownloadType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob", // Important for file download
        }
      );
      // Create a link to download the file
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const link = document.createElement("a");
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
  
  const fetchDocumentContent = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      const response = await axios.get(singleDoc + "/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.status === 200) {
        setDocumentContent(response.data.data); // Assuming 'data' holds the document content
        SetdocName(response.data.name)
      } else {
        setError(
          response.data.message || "Failed to retrieve document content"
        );
      }
    } catch (err) {
      setError("An error occurred while fetching the document content");
    } finally {
      setIsLoading(false);
    }
  };


  const handleTextChange = (e) => setInputText(e.target.value);


  const handleLanguageChange = async (e) => {
    const selectedLang = e.target.value;
    setSelectedLanguage(selectedLang);
  
    // Trigger translation API call if outputText or inputText exists
    if (outputText || inputText) {
      await handleTranslate(selectedLang);
    }
  };
  
  const handleTranslate = async (language = selectedLanguage) => {
    // Set the content to translate: prioritize `outputText`, fallback to `inputText`
    const contentToTranslate = outputText || inputText || "No content available for translation.";
    const url = "https://chatgpt-42.p.rapidapi.com/gpt4";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "455f35f29bmsh9904fd3cfaaaf35p1856acjsnf15b267343bb", // Replace with your RapidAPI key
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that translates text.",
          },
          {
            role: "user",
            content: `Translate the following text to ${language}: ${contentToTranslate}`,
          },
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    };
  
    // Show loading state
    setTranslate(true);
  
    try {
      // Fetch data
      const data = await fetchData(url, options);
  
      // Hide loading state
      setTranslate(false);
  
      // Set translated text if the API responds successfully
      if (data?.result) {
        const cleanedText = data.result
          .replace(/[\*#]/g, "") // Remove Markdown symbols
          .replace(/---/g, ""); // Remove any unnecessary separators
        setOutputText(cleanedText);
        setReset(true);
      } else {
        console.error("Translation failed:", data);
      }
    } catch (error) {
      // Handle errors and hide loading state
      setTranslate(false);
      console.error("Error during translation:", error);
    }
  };
  
  

  const fetchData = async (url, options) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  function resetHandler(){
    setReset(false)
    setOutputText("");
  }

  const handleSummarize = async () => {
    // Get the selected text, if any
    const selectedText = window.getSelection().toString();
  
    // Use selected text if available, otherwise fall back to the entire document content
    const content = selectedText || documentContent;  // Replace with actual full content
    const url = "https://chatgpt-42.p.rapidapi.com/gpt4";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "455f35f29bmsh9904fd3cfaaaf35p1856acjsnf15b267343bb",
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Act as a document summarizer and provide a detailed summary of the following legal document, highlighting the most important clauses, obligations, and key terms. Format the summary in a clear and structured way, suitable for legal professionals, and ensure any critical legal nuances are retained. Include explanations where necessary to ensure the core concepts are well understood: ${content}. Language should be in ${selectedLanguage}.`,
          },
        ],
        web_access: false,
      }),
    };
  
    setSummarizeLoading(true);
    const data = await fetchData(url, options);
    setSummarizeLoading(false);
    setReset(true);
  
    if (data?.result){
      const cleanedText = data.result.replace(/[\*#]/g, "").replace(/---/g, "");
      setOutputText(cleanedText);
    } 
  };



  const handleSimplify = async () => {
    // Get the selected text, if any
    const selectedText = window.getSelection().toString();
  
    // Use selected text if available, otherwise fall back to the entire document content
    const content = selectedText || documentContent;  // Replace with actual full content
    const url = "https://chatgpt-42.p.rapidapi.com/gpt4";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "455f35f29bmsh9904fd3cfaaaf35p1856acjsnf15b267343bb",
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: `Act as a document simplifier and simplify the following legal document by translating the complex legal language into plain, everyday English. Ensure that the key terms and obligations are preserved but make the text easier to understand for someone without a legal background: ${content}. Language should be in ${selectedLanguage}.`,
          },
        ],
        web_access: false,
      }),
    };
  
 
    setSimplifyLoading(true);
    const data = await fetchData(url, options);
    setSimplifyLoading(false);
    setReset(true);
    if (data?.result){
      const cleanedText = data.result.replace(/[\*#]/g, "").replace(/---/g, "");
      setOutputText(cleanedText);
    } 
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="md:flex-1 pt-20 md:px-10 px-3 md:pt-10 bg-gray-100 overflow-auto">
        <div className="mb-8">
         
          <div className="text-3xl font-bold text-gray-700 flex flex-row gap-4"> <Link href="/dashboard" >
          <FaArrowLeft 
  className="mt-2 hover:scale-110 transition-transform duration-200" 
  size={20} 
/>
          </Link>  <h1> {docName}</h1></div>
          <p className="text-gray-600 mt-2">
            Here you can simplify or summarize your content
          </p>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="md:flex-1 pt-4 md:px-10 px-3 overflow-auto flex justify-center items-center">
          <div className="rounded-lg p-2 w-full">
            <div className="flex space-x-6 mb-4">
              <textarea
                className="w-1/2 p-4 border rounded-lg resize-none focus:outline-none"
                placeholder="Enter text here..."
                value={documentContent || inputText}
                onChange={handleTextChange}
                style={{ height: "450px" }}
              ></textarea>
              <textarea
                className="w-1/2 p-4 border rounded-lg resize-none focus:outline-none"
                value={outputText}
                readOnly
                placeholder="Output will appear here..."
              ></textarea>
            </div>
            <div className="text-center mb-4">
  {translate && (
    <div className="flex flex-col items-center">
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#ff4500" 
        ariaLabel="three-dots-loading"
        visible={true}
      />
      <p className="text-red-500 mt-2">Translating...</p>
    </div>
  )}
</div>
            <div className="flex justify-center space-x-4 mb-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center"
                onClick={handleSimplify}
                disabled={simplifyloading}
              >
                {simplifyloading ? <div className="loader mr-2"></div> : "Simplify"}
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center"
                onClick={handleSummarize}
                disabled={summarizeLoading}
              >
                {summarizeLoading ? <div className="loader mr-2"></div> : "Summarize"}
              </button>
              {reset && (
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center"
    onClick={handleLanguageChange}
  >
    Translate
  </button>
)}

              {reset && (
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center"
    onClick={resetHandler}
  >
    Reset
  </button>
)}

              

              <div className="mt-3"></div>
            </div>
            <div className="flex justify-center mt-4">
              <label
                htmlFor="language"
                className="mr-2 mt-2 font-medium text-gray-700"
              >
                Select Language:
              </label>
              <select
  id="language"
  disabled={!reset} // Enable or disable based on `reset`
  className={`p-2 border rounded-lg focus:outline-none ${
    reset ? "bg-white text-black cursor-pointer" : "bg-gray-100 text-gray-400 cursor-not-allowed"
  }`}
  value={selectedLanguage}
  onChange={(e) => setSelectedLanguage(e.target.value)} // Update state on change
>
  <option value="english">English</option>
  <option value="french">French</option>
  <option value="german">German</option>
  <option value="russian">Russian</option>
  <option value="spanish">Spanish</option>
  <option value="chinese">Chinese (Simplified)</option>
  <option value="zh-TW">Chinese (Traditional)</option>
  <option value="arabic">Arabic</option>
  <option value="hindi">Hindi</option>
  <option value="japanese">Japanese</option>
  <option value="portuguese">Portuguese</option>
  <option value="bengali">Bengali</option>
  <option value="korean">Korean</option>
  <option value="italian">Italian</option>
  <option value="turkish">Turkish</option>
  <option value="vietnamese">Vietnamese</option>
  <option value="polish">Polish</option>
  <option value="ukrainian">Ukrainian</option>
  <option value="persian">Persian</option>
  <option value="malay">Malay</option>
  <option value="indonesian">Indonesian</option>
  <option value="thai">Thai</option>
  <option value="swahili">Swahili</option>
  <option value="tamil">Tamil</option>
  <option value="telugu">Telugu</option>
  <option value="marathi">Marathi</option>
  <option value="urdu">Urdu</option>
  <option value="dutch">Dutch</option>
  <option value="greek">Greek</option>
 
</select>


<select
  className={`border rounded py-1 px-2 ms-4 ${
    reset
      ? "bg-white text-black cursor-pointer"
      : "bg-gray-100 text-gray-400 cursor-not-allowed"
  }`}
  value={selectedDownloadType}
  onChange={(e) => setSelectedDownloadType(e.target.value)}
  disabled={!reset} // Example condition to disable
>
                <option value="" disabled>
                  Choose Download Type
                </option>
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="txt">TXT</option>
                <option value="rtf">RTF</option>
              </select>
              <button
  className={`py-1 px-3 rounded ml-2 ${
    reset
      ? "bg-blue-500 text-white cursor-pointer"
      : "bg-gray-400 text-gray-200 cursor-not-allowed"
  }`}
  onClick={handleDownload}
  disabled={!reset} // Equivalent to `reset === false`
>
  Download
</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default DocumentDetails;
