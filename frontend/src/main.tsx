import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/dm-sans/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { Toaster } from "sonner";

import { getTheme } from "~/theme/defaultTheme";
import { palette } from "~/theme/palette";

import AuthPage from "~/views/AuthPage.view.tsx";
import DashboardPage from "~/views/DashboardPage.view.tsx";
import AuthProvider from "~/context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <BrowserRouter>
         <ThemeProvider theme={getTheme("light", palette)}>
            <AuthProvider>
               <CssBaseline />
               <Toaster position="top-right" />
               <Routes>
                  <Route path="/" element={<AuthPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
               </Routes>
            </AuthProvider>
         </ThemeProvider>
      </BrowserRouter>
   </StrictMode>
);
