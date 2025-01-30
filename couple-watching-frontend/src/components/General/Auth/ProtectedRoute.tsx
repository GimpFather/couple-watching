import React from "react";
import { useAuthContext } from "../../../context/AuthProvider";
import { Navigate, Outlet } from "react-router";
import Loading from "../Loading";

interface ProtectedRouteProps {
   redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo = "/auth" }) => {
   const { user, loading } = useAuthContext();

   if (loading) {
      return <Loading isLoading={loading} />;
   }

   if (!user) {
      return <Navigate to={redirectTo} replace />;
   }

   return <Outlet />;
};

export default ProtectedRoute;
