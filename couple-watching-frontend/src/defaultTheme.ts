import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
	palette: {
		primary: {
			main: "#010101",
		},
		secondary: {
			main: "#D9D9D9",
			light: "#999999",
		},
		background: {
			default: "#F3F5F7",
		},
		common: {
			black: "#010101",
			white: "#FFFFFF",
		},
	},
	typography: {
		fontFamily: "outfit",
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
});
