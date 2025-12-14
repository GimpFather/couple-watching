import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthPage from "./views/AuthPage.view.tsx";
import DashboardPage from "./views/DashboardPage.view.tsx";
import AuthProvider from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <BrowserRouter>
         <AuthProvider>
            <Routes>
               <Route path="/" element={<AuthPage />} />
               <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
         </AuthProvider>
      </BrowserRouter>
   </StrictMode>
);
