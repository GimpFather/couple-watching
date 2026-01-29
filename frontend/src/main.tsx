import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/dm-sans/index.css";
import "~/styles/global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { Toaster } from "sonner";

import { initSounds } from "~/hooks/useSound";
import { SOUNDS } from "~/hooks/sounds.config";

import { getTheme } from "~/theme/defaultTheme";
import { palette } from "~/theme/palette";

import AuthProvider from "~/context/auth/AuthContext";
import AppRouting from "~/router/AppRouting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

initSounds(Object.values(SOUNDS));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <BrowserRouter>
         <ThemeProvider theme={getTheme("light", palette)}>
            <QueryClientProvider client={queryClient}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <AuthProvider>
                     <CssBaseline />
                     <Toaster position="top-center" />
                     <AppRouting />
                  </AuthProvider>
               </LocalizationProvider>
            </QueryClientProvider>
         </ThemeProvider>
      </BrowserRouter>
   </StrictMode>
);
