import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isAdminDashboard = location.pathname === "/admin/dashboard";

  return (
    <nav className="bg-white shadow-md p-4 z-50 sticky ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MyRealEstate
        </Link>
        <div>
          <Link
            to="/"
            className="mr-4 hover:text-gray-800 font-semibold transition duration-300"
          >
            Home
          </Link>
          <Link
            to="#"
            className="mr-4 hover:text-gray-800 font-semibold transition duration-300"
          >
            About
          </Link>
          <Link
            to="#"
            className="mr-4 hover:text-gray-800 font-semibold transition duration-300"
          >
            Contact
          </Link>
          {!isAdminDashboard && (
            <Link
              to="/admin/dashboard"
              className="mr-4 hover:bg-gray-600 bg-black font-semibold transition text-white p-2 rounded-md "
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
