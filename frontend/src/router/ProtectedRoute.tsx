import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/context/auth/useAuth";

interface ProtectedRouteProps {
   redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo = "/" }) => {
   const { user } = useAuth();

   if (!user) {
      return <Navigate to={redirectTo} replace />;
   }

   return <Outlet />;
};

export default ProtectedRoute;
