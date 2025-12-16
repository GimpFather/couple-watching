import { Route, Routes } from "react-router";
import ProtectedRoute from "~/router/ProtectedRoute";
import AuthPage from "~/views/AuthPage.view";
import DashboardPage from "~/views/DashboardPage.view";
import WelcomePage from "~/views/WelcomePage.view";

const AppRouting = () => {
   return (
      <Routes>
         <Route path="/" element={<WelcomePage />} />
         <Route path="auth" element={<AuthPage />} />
         <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
         </Route>
      </Routes>
   );
};

export default AppRouting;
