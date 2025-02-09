import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { defaultTheme } from "./defaultTheme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import AppRouting from "./AppRouting.tsx";
import "./assets/styles.css";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IntlProvider } from "react-intl";
import en_EN from "./constants/en_EN.json";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { AuthProvider } from "./context/AuthProvider.tsx";

if ("serviceWorker" in navigator) {
   navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker Registered"))
      .catch((err) => console.error("Service Worker Registration Failed:", err));
}

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
   weekStart: 1,
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <ThemeProvider theme={defaultTheme}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <IntlProvider messages={en_EN} locale="en">
                     <AuthProvider>
                        <CssBaseline>
                           <ToastContainer
                              position="top-center"
                              autoClose={5000}
                              hideProgressBar={false}
                              closeOnClick
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="light"
                           />
                           <AppRouting />
                        </CssBaseline>
                     </AuthProvider>
                  </IntlProvider>
               </LocalizationProvider>
            </ThemeProvider>
         </BrowserRouter>
      </QueryClientProvider>
   </StrictMode>
);
