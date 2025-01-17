import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { defaultTheme } from "./defaultTheme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import AppRouting from "./AppRouting.tsx";
import "./assets/styles.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <ThemeProvider theme={defaultTheme}>
               <CssBaseline>
                  <AppRouting />
               </CssBaseline>
            </ThemeProvider>
         </BrowserRouter>
      </QueryClientProvider>
   </StrictMode>
);
