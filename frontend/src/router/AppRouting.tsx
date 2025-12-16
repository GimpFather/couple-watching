import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router";
import ProtectedRoute from "~/router/ProtectedRoute";
import AuthLoginPage from "~/views/AuthLoginPage.view";
import AuthRegisterPage from "~/views/AuthRegisterPage.view";
import DashboardPage from "~/views/DashboardPage.view";
import WelcomePage from "~/views/WelcomePage.view";

const AppRouting = () => {
   const location = useLocation();

   return (
      <AnimatePresence mode="popLayout">
         <Routes location={location} key={location.pathname}>
            <Route path="/" element={<WelcomePage />} key="welcome" />
            <Route path="auth/login" element={<AuthLoginPage />} key="auth-login" />
            <Route path="auth/register" element={<AuthRegisterPage />} key="auth-register" />
            <Route element={<ProtectedRoute />}>
               <Route path="dashboard" element={<DashboardPage />} key="dashboard" />
            </Route>
         </Routes>
      </AnimatePresence>
   );
};

export default AppRouting;
