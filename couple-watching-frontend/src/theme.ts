import { createTheme, PaletteColor, PaletteMode, PaletteOptions } from "@mui/material";
import "@fontsource/outfit";

export const blueOrangePalette = {
   primary: {
      main: "#007BFF",
      light: "#66B2FF",
      dark: "#0056B3",
   },
   secondary: {
      main: "#FF7F00",
      light: "#FFB347",
      dark: "#CC6600",
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

export const defaultPalette = {
   primary: {
      main: "#38A169",
      light: "#68D391",
      dark: "#2F855A",
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

export const getTheme = (mode: PaletteMode, palette: PaletteOptions) =>
   createTheme({
      palette: {
         mode,
         ...palette,
      },
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
                     borderColor: palette.common?.white,
                     border: "2px solid",
                     borderRadius: "16px",
                  },
               },
            },
         },
         MuiFormLabel: {
            styleOverrides: {
               root: {
                  color: palette.common?.white,
               },
            },
         },
         MuiInputAdornment: {
            styleOverrides: {
               root: {
                  color: palette.common?.white,
               },
            },
         },
         MuiTextField: {
            defaultProps: {
               autoComplete: "off",
            },
         },
         MuiDialog: {
            styleOverrides: {
               paper: {
                  borderRadius: "16px",
               },
            },
         },
         MuiButton: {
            styleOverrides: {
               root: {
                  borderRadius: "16px",
                  textTransform: "none",
                  fontSize: "1rem",
               },
            },
            variants: [
               {
                  props: { variant: "outlined" },
                  style: {
                     color: (palette.primary as PaletteColor).main,
                     border: `2px solid ${(palette.primary as PaletteColor).main}`,
                  },
               },
               {
                  props: { variant: "text" },
                  style: {
                     ":hover": {
                        backgroundColor: "unset",
                     },
                  },
               },
               {
                  props: { variant: "contained", color: "primary" },
                  style: {
                     ":hover": {
                        backgroundColor: (palette.primary as PaletteColor).dark,
                     },
                  },
               },
            ],
         },
      },
   });
