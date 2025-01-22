import { createTheme } from "@mui/material";
import "@fontsource/outfit";

const palette = {
   primary: {
      main: "#38A169",
   },
   secondary: {
      main: "#E53E3E",
   },
   background: {
      default: "#181413",
      paper: "#262626",
   },
   common: {
      black: "#050D06",
      white: "#F9F9F9",
   },
   text: {
      primary: "#F9F9F9",
      secondary: "#050D06",
   },
};

export const defaultTheme = createTheme({
   palette,
   typography: {
      fontFamily: `'Outfit', sans-serif`,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
   },
   components: {
      MuiOutlinedInput: {
         styleOverrides: {
            root: {
               "& fieldset": {
                  borderColor: palette.common.white,
                  borderRadius: 16,
               },
            },
         },
      },
      MuiFormLabel: {
         styleOverrides: {
            root: {
               color: palette.common.white,
            },
         },
      },
   },
});
