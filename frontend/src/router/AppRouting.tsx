import { Route, Routes, useLocation } from "react-router";
import ProtectedRoute from "~/router/ProtectedRoute";
import ToolbarLayout from "~/components/Layout/Toolbar/ToolbarLayout";

import WelcomePage from "~/views/WelcomePage.view";
import AuthLoginPage from "~/views/AuthLoginPage.view";
import AuthRegisterPage from "~/views/AuthRegisterPage.view";
import HomePage from "~/views/HomePage.view";
import LibraryPage from "~/views/LibraryPage.view";
import SearchPage from "~/views/SearchPage.view";
import StatisticsPage from "~/views/StatisticsPage.view";
import CouplePage from "~/views/CouplePage.view";

const AppRouting = () => {
   const location = useLocation();

   return (
      <Routes location={location} key={location.pathname}>
         <Route path="/" element={<WelcomePage />} key="welcome" />
         <Route path="auth/login" element={<AuthLoginPage />} key="auth-login" />
         <Route path="auth/register" element={<AuthRegisterPage />} key="auth-register" />
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
   );
};

export default AppRouting;
