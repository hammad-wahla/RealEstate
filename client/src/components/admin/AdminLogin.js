import React, { useState } from "react";
import { adminLogin } from "../../utils/adminData";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill both fields");
      return;
    }
    try {
      await adminLogin(username, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600 w-full"
          >
            Login
          </button>
        </form>
        <div className="text-right mt-5">
          <button
            className="bg-black text-white px-4 text-sm py-2 rounded-md hover:bg-gray-600"
            onClick={() => {
              navigate("/admin/register");
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
