import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import ProtectedRoute from "~/router/ProtectedRoute";
import ToolbarLayout from "~/components/Layout/Toolbar/ToolbarLayout";
import WelcomePage from "~/views/Auth/WelcomePage.view";
import AuthLoginPage from "~/views/Auth/AuthLoginPage.view";
import AuthRegisterPage from "~/views/Auth/AuthRegisterPage.view";
import HomePage from "~/views/HomePage.view";
import LibraryPage from "~/views/LibraryPage.view";
import SearchPage from "~/views/SearchPage.view";
import StatisticsPage from "~/views/StatisticsPage.view";
import CouplePage from "~/views/CouplePage.view";
import AuthConfirmEmailPage from "~/views/Auth/AuthConfirmEmail.view";
import AuthSuccessPage from "~/views/Auth/AuthSuccess.view";

const AppRouting = () => {
   const location = useLocation();

   return (
      <AnimatePresence mode="wait" initial={false}>
         <Routes location={location} key={location.pathname}>
            <Route path="/" element={<WelcomePage />} key="welcome" />
            <Route path="auth/login" element={<AuthLoginPage />} key="auth-login" />
            <Route path="auth/register" element={<AuthRegisterPage />} key="auth-register" />
            <Route path="auth/confirm-email" element={<AuthConfirmEmailPage />} key="auth-confirm-email" />
            <Route path="auth/success" element={<AuthSuccessPage />} key="auth-success" />
            <Route element={<ProtectedRoute />}>
               <Route element={<ToolbarLayout />}>
                  <Route path="home" element={<HomePage />} key="home" />
                  <Route path="library" element={<LibraryPage />} key="library" />
                  <Route path="search" element={<SearchPage />} key="search" />
                  <Route path="statistics" element={<StatisticsPage />} key="statistics" />
                  <Route path="couple" element={<CouplePage />} key="couple" />
               </Route>
            </Route>
         </Routes>
      </AnimatePresence>
   );
};

export default AppRouting;
