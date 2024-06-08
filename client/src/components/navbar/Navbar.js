import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const isAdminDashboard = location.pathname === "/admin/dashboard";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex lg:flex-row md:flex-row sm:flex-row flex-col lg:justify-between justify-around items-center">
        <Link
          to="/"
          className="text-2xl mb-2 sm:mb-0 md:mb-0 lg:mb-0 font-bold"
        >
          MyRealEstate
        </Link>

        <div className="flex justify-center items-center">
          <Link
            to="/"
            className=" mr-4 hover:text-gray-800 font-semibold transition text-sm lg:text-lg duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="#"
            className=" mr-4 hover:text-gray-800 font-semibold transition text-sm lg:text-lg duration-300"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="#"
            className=" mr-4 hover:text-gray-800 font-semibold transition text-sm lg:text-lg duration-300"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          {!isAdminDashboard && (
            <Link
              to="/admin/dashboard"
              className=" mr-4 hover:bg-gray-600 bg-black font-semibold transition text-white p-2 text-sm lg:text-lg rounded-md"
              onClick={toggleMenu}
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
