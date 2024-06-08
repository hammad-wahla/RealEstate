import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAdminAuth } from "../../utils/adminData";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await checkAdminAuth();
      setIsAuthenticated(isAuthenticated);
      setLoading(false);
    };

    authenticate();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default ProtectedRoute;
