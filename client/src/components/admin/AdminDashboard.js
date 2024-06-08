import React, { useState } from "react";
import PropertyList from "../properties/PropertyList";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { adminLogout } from "../../utils/adminData";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await adminLogout();
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div
        className={`bg-white shadow-lg text-sm sm:text-md p-5 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        } sm:relative fixed sm:fixed  left-0 w-64 h-[100vh] z-20 sm:z-0`}
      >
        <ul className="space-y-4 mb-10">
          <li className="flex items-center space-x-2 cursor-pointer">
            <FaHome />
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer">
            <FaUser />
            <span>Profile</span>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer">
            <FaCog />
            <span>Settings</span>
          </li>
        </ul>
        <div
          className="mt-auto flex items-center space-x-2 cursor-pointer"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>

      <div className="flex-1 p-1">
        <div className="flex  items-center mb-8">
          <button
            className="sm:hidden w-[10%] text-2xl focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <h1 className="text-3xl w-[90%] font-bold">Admin Dashboard</h1>
        </div>
        <hr />
        <div className="mt-5">
          <PropertyList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
