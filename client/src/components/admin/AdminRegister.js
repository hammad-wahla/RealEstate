import React, { useState } from "react";
import { registerAdmin } from "../../utils/adminData";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerAdmin(username, password);
      navigate("/admin/login");
    } catch (err) {
      setRegistrationError("Please fill both fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-bold">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          {registrationError && (
            <p className="text-red-500 text-center mb-4">{registrationError}</p>
          )}
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600 w-full"
          >
            Register
          </button>
        </form>
        <div className="text-right mt-5">
          <button
            className="bg-black text-white px-4 text-sm py-2 rounded-md hover:bg-gray-600"
            onClick={() => {
              navigate("/admin/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
