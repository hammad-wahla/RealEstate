import React from "react";
import PropertyList from "../properties/PropertyList";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { adminLogout } from "../../utils/adminData";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await adminLogout();
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex">
      <div className="w-[10%] bg-white shadow-lg min-h-screen p-5">
        <ul className="space-y-4 mb-10">
          <li className="flex items-center space-x-2">
            <FaHome />
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-2">
            <FaUser />
            <span>Profile</span>
          </li>
          <li className="flex items-center space-x-2">
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
      <div className="w-[90%] p-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <div className="mb-4"></div>
        </div>
        <hr />
        <div className="mb-8 mt-5">
          <PropertyList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
