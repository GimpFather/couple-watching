import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { defaultTheme } from "./defaultTheme.ts";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={defaultTheme}>
				<CssBaseline>
					<App />
				</CssBaseline>
			</ThemeProvider>
		</QueryClientProvider>
	</StrictMode>
);
