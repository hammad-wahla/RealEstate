import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import PropertyList from "./components/properties/PropertyList";
import ProtectedRoute from "./components/protectedRoute/PrivateRoute";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <div className="relative">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={AdminDashboard} />}
          />
          <Route path="/" element={<PropertyList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
