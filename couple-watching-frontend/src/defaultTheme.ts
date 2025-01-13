import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
	palette: {
		primary: {
			main: "#A5D2A6",
		},
		secondary: {
			main: "#B7DDDD",
		},
		background: {
			default: "#EDEFF1",
			paper: "#C6BFB5",
		},
		common: {
			black: "#0E120E",
			white: "#EDEFF1",
		},
	},
	typography: {
		fontFamily: "Poppins",
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
});
