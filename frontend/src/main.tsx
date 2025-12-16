import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/dm-sans/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { Toaster } from "sonner";

import { getTheme } from "~/theme/defaultTheme";
import { palette } from "~/theme/palette";

import AuthProvider from "~/context/auth/AuthContext";
import AppRouting from "~/router/AppRouting";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <BrowserRouter>
         <ThemeProvider theme={getTheme("light", palette)}>
            <AuthProvider>
               <CssBaseline />
               <Toaster position="top-right" />
               <AppRouting />
            </AuthProvider>
         </ThemeProvider>
      </BrowserRouter>
   </StrictMode>
);
