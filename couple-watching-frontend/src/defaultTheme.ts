import { createTheme } from "@mui/material";
import '@fontsource/outfit';

export const defaultTheme = createTheme({
	palette: {
		primary: {
			main: "#1A5F24",
		},
		secondary: {
			main: "#348D5B",
		},
		background: {
			default: "#181413",
			paper: "#262626"
		},
		common: {
			black: "#050D06",
			white: "#F9F9F9",
		},
	},
	typography: {
		fontFamily: `'Outfit', sans-serif`,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
});
