import { createTheme, PaletteColor, PaletteMode, PaletteOptions } from "@mui/material";
import "@fontsource/ibm-plex-mono/100.css";
import "@fontsource/ibm-plex-mono/200.css";
import "@fontsource/ibm-plex-mono/300.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";

export const blueOrangePalette: PaletteOptions = {
   primary: {
      main: "#016DFE",
      dark: "#0E499A",
      light: "#0853C5",
      50: "#edf9ff",
      100: "#d6f0ff",
      200: "#b6e6ff",
      300: "#83d8ff",
      400: "#49c1ff",
      500: "#1fa0ff",
      600: "#0781ff",
      700: "#016dfe",
      800: "#0853c5",
      900: "#0e499a",
      950: "#0e2d5d",
   },
   secondary: {
      main: "#d55937",
      dark: "#A63428",
      light: "#C7452F",
      50: "#fcf5f0",
      100: "#f8e7dc",
      200: "#f1cbb7",
      300: "#e8a889",
      400: "#dd7c5a",
      500: "#d55937",
      600: "#c7452f",
      700: "#a63428",
      800: "#852d27",
      900: "#6b2723",
      950: "#3a1110",
   },
   accent: {
      main: "#e4e0db",
      light: "#dad4ce",
      dark: "#988477",
      50: "#f7f6f5",
      100: "#e4e0db",
      200: "#dad4ce",
      300: "#c2b9af",
      400: "#a99a8e",
      500: "#988477",
      600: "#8b756b",
      700: "#74625a",
      800: "#60514c",
      900: "#4f433f",
      950: "#292321",
   },
   background: {
      default: "#ED7C42",
      paper: "#FFFFFF",
   },
   common: {
      black: "#0c0c0c",
      white: "#FFFFFF",
      50: "#f4f3f2",
      100: "#e3e0de",
      200: "#c8c4c0",
      300: "#a8a19c",
      400: "#90857f",
      500: "#817771",
      600: "#6e6460",
      700: "#59514f",
      800: "#4e4645",
      900: "#453e3e",
      950: "#262222",
   },
   text: {
      primary: "#0C0C0C",
      secondary: "#FFFFFF",
   },
   success: {
      main: "#258752",
      light: "#237247",
      dark: "#205B3B",
      50: "#f2fbf6",
      100: "#e0f8ea",
      200: "#c3efd6",
      300: "#93e2b7",
      400: "#5dcb8f",
      500: "#37b06e",
      600: "#258752",
      700: "#237247",
      800: "#205b3b",
      900: "#1c4b33",
      950: "#0a291a",
   },
   warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
   },
   error: {
      main: "#c63d31",
      light: "#AC3429",
      dark: "#8F2E25",
   },
   danger: {
      main: "#c63d31",
      light: "#AC3429",
      dark: "#8F2E25",
      50: "#fdf4f3",
      100: "#fce6e4",
      200: "#fad2ce",
      300: "#f5b2ac",
      400: "#ed857c",
      500: "#e15e52",
      600: "#c63d31",
      700: "#ac3429",
      800: "#8f2e25",
      900: "#772c25",
      950: "#40130f",
   },
};

export const defaultPalette: PaletteOptions = {
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
   accent: {
      main: "#e4e0db",
      light: "#dad4ce",
      dark: "#988477",
      50: "#f7f6f5",
      100: "#e4e0db",
      200: "#dad4ce",
      300: "#c2b9af",
      400: "#a99a8e",
      500: "#988477",
      600: "#8b756b",
      700: "#74625a",
      800: "#60514c",
      900: "#4f433f",
      950: "#292321",
   },
};

export const getTheme = (mode: PaletteMode, palette: PaletteOptions, backgroundGradient: string) =>
   createTheme({
      palette: {
         mode,
         ...palette,
      },
      typography: {
         fontFamily: `'DM Sans', sans-serif`,
         fontWeightLight: 300,
         fontWeightRegular: 400,
         fontWeightMedium: 500,
         fontWeightBold: 700,
         headingExtraLarge: {
            fontFamily: `'IBM Plex Mono', monospace`,
            fontSize: "2rem",
            fontWeight: 600,
            lineHeight: 1.45,
            letterSpacing: "-0.96px",
         },
         headingLarge: {
            fontFamily: `'IBM Plex Mono', monospace`,
            fontSize: "1.5rem",
            fontWeight: 600,
            lineHeight: 1.45,
            letterSpacing: "-0.72px",
         },
         headingMedium: {
            fontFamily: `'IBM Plex Mono', monospace`,
            fontSize: "1.25rem",
            fontWeight: 600,
            lineHeight: 1.45,
            letterSpacing: "-0.60px",
         },
         headingSmall: {
            fontFamily: `'IBM Plex Mono', monospace`,
            fontSize: "1.125rem",
            fontWeight: 600,
            lineHeight: 1.45,
            letterSpacing: "-0.54px",
         },
         headingExtraSmall: {
            fontFamily: `'IBM Plex Mono', monospace`,
            fontSize: "0.875rem",
            fontWeight: 600,
            lineHeight: 1.45,
            letterSpacing: "-0.42px",
         },
         bodyExtraLarge: {
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: "1.125rem",
            fontWeight: 400,
            lineHeight: 1.75,
            letterSpacing: "-0.18px",
         },
         bodyLarge: {
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1.75,
            letterSpacing: "-0.16px",
         },
         bodyMedium: {
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: 1.75,
            letterSpacing: "-0.14px",
         },
         bodySmall: {
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: 1.75,
            letterSpacing: "-0.12px",
         },
         bodyExtraSmall: {
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: "0.563rem",
            fontWeight: 400,
            lineHeight: 1.75,
            letterSpacing: "-0.09px",
         },
         emphasizedBodyExtraLarge: {
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: "1.125rem",
            fontWeight: 500,
            lineHeight: 1.45,
            letterSpacing: "-0.18px",
         },
         emphasizedBodyLarge: {
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: 1.45,
            letterSpacing: "-0.16px",
         },
         emphasizedBodyMedium: {
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: "0.875rem",
            fontWeight: 500,
            lineHeight: 1.45,
            letterSpacing: "-0.14px",
         },
         emphasizedBodySmall: {
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: "0.75rem",
            fontWeight: 500,
            lineHeight: 1.45,
            letterSpacing: "-0.12px",
         },
         emphasizedBodyExtraSmall: {
            fontFamily: `'DM Sans', sans-serif`,
            fontSize: "0.563rem",
            fontWeight: 500,
            lineHeight: 1.45,
            letterSpacing: "-0.09px",
         },
      },
      components: {
         MuiCssBaseline: {
            styleOverrides: {
               body: {
                  background: backgroundGradient,
               },
            },
         },
         MuiOutlinedInput: {
            styleOverrides: {
               root: {
                  borderRadius: "12px",
                  backgroundColor: palette.common?.[50],
                  "&.Mui-focused": {
                     backgroundColor: palette.common?.white,
                     "& fieldset": {
                        borderColor: palette.common?.black,
                     },
                  },
                  "&.Mui-focused fieldset": {
                     borderColor: palette.common?.black,
                  },
                  "& fieldset": {
                     borderColor: palette.common?.black,
                     border: "2px solid",
                     borderRadius: "12px",
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
                  boxShadow: "none",
                  textTransform: "none",
                  WebkitTapHighlightColor: "transparent",
                  "&:hover": {
                     backgroundColor: "transparent",
                     boxShadow: "none",
                  },
                  "&:active": {
                     boxShadow: "none",
                  },
               },
            },
            variants: [
               {
                  props: { variant: "outlined" },
                  style: {
                     color: (palette.primary as PaletteColor).main,
                     border: `2px solid ${(palette.primary as PaletteColor).main}`,
                     "&:hover": {
                        backgroundColor: "transparent",
                        border: `2px solid ${(palette.primary as PaletteColor).main}`,
                     },
                     "&:active": {
                        boxShadow: "none",
                     },
                  },
               },
               {
                  props: { variant: "text" },
                  style: {
                     "&:hover": {
                        backgroundColor: "transparent",
                     },
                     "&:active": {
                        boxShadow: "none",
                     },
                  },
               },
               {
                  props: { variant: "contained", color: "primary" },
                  style: {
                     "&:hover": {
                        backgroundColor: (palette.primary as PaletteColor).main,
                        boxShadow: "none",
                     },
                     "&:active": {
                        boxShadow: "none",
                     },
                  },
               },
            ],
         },
      },
   });
