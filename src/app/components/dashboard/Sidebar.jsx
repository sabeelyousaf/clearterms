"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for Next.js
import { FaHome, FaCog, FaSignOutAlt, FaFileInvoice, FaBars, FaTimes, FaArrowRight } from 'react-icons/fa'; // Importing icons
import { useState } from 'react'; // Import useState to handle the sidebar toggle
import logo from '../../../../public/logo-2.png'
const Sidebar = () => {

  const router = useRouter(); // Using the router for current path
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar on mobile

  // Function to determine if the current path matches the link
  const isActive = (path) => {
    return router.pathname === path; // Checks if the current path matches the link path
  };

  // Function to toggle the sidebar on mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };



  const handleLogout = async () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('subscription');

    router.push('/login');
  };

  return (
    <>
      {/* Hamburger menu for mobile */}
      <div className="lg:hidden p-4 bg-primary text-white fixed w-full flex justify-between">
      <Link href="/">
        <Image src={logo} alt='Logo' width={150}    />
        </Link>
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`h-screen w-64 bg-primary text-white fixed transition-transform duration-300 z-50 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className='px-6'>
        <Link href="/">
          <Image src={logo} alt='Logo' width={170}  className=' mt-5 ' />
          </Link>
        </div>
        <nav className="mt-4">
          <ul>
            <li className={`p-4 flex items-center hover:bg-indigo-400 ${isActive('/dashboard') ? 'bg-purple-900' : ''}`}>
              <FaHome className="mr-2" />
              
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className={`p-4 flex items-center hover:bg-indigo-400 ${isActive('/dashboard/subscription') ? 'bg-purple-900' : ''}`}>
              <FaFileInvoice className="mr-2" />
              <Link href="/dashboard/subscription">Subscription</Link>
            </li>
            <li className={`p-4 flex items-center hover:bg-indigo-400 ${isActive('/dashboard/profile') ? 'bg-purple-900' : ''}`}>
              <FaCog className="mr-2" />
              <Link href="/dashboard/profile">Account Settings</Link>
            </li>
           
            <li className="p-4 flex items-center mt-auto hover:bg-indigo-400">
              <FaSignOutAlt className="mr-2" />
              <a onClick={handleLogout} className="text-white cursor-pointer">
              Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 lg:hidden"></div>}
    </>
  );
};

export default Sidebar;
