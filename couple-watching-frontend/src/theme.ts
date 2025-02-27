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
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                     borderColor: palette.common?.black,
                     border: "2px solid",
                     borderRadius: "12px",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                     borderColor: palette.common?.black,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                     borderColor: palette.common?.black,
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
