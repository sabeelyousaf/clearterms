"use client";
import { contactMail } from "@/app/api/routes";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const ContactComponent = () => {

    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  
    const [status, setStatus] = useState("");
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus(""); // Clear previous status
  
      try {
        const response = await fetch(contactMail, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          setStatus("Email sent successfully!");
          setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
          setStatus("Failed to send email. Please try again later.");
        }
      } catch (error) {
        setStatus("An error occurred. Please try again later.");
      }
    };

  return (
    <motion.section
      id="contact"
      className="py-20 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-screen-xl mx-auto md:px-0 px-3">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <div className="flex flex-wrap ">
          {/* Icons Section */}
          <div className="w-full md:w-1/2 space-y-6 lg:pe-5 md:pe-5">
            <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-lg">
              <FaMapMarkerAlt className="text-indigo-600 w-10 h-10" />
              <div>
                <h3 className="text-xl font-bold">Address</h3>
                <p className="text-gray-600">123 Main Street, New York, NY 10001</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-lg">
              <FaPhone className="text-indigo-600 w-10 h-10" />
              <div>
                <h3 className="text-xl font-bold">Phone</h3>
                <p className="text-gray-600">+1 (234) 567-8900</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-3xl shadow-lg">
              <FaEnvelope className="text-indigo-600 w-10 h-10" />
              <div>
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-gray-600">contact@example.com</p>
              </div>
            </div>
            <img src="https://img.freepik.com/free-vector/vector-blue-arrow-isolated-white_1284-41891.jpg" className="w-1/2 ms-auto d-block" alt="" />
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-1/2 lg:ps-5">
            <div className="bg-white rounded-3xl shadow-xl p-8 w-full">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-lg font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="5"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your message"
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold w-full transform transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            Submit
          </motion.button>
          {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
        </form>
            </div>

            
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactComponent;
