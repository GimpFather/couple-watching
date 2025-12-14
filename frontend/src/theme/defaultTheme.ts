import { createTheme, type PaletteColor, type PaletteMode, type PaletteOptions } from "@mui/material";

export const getTheme = (mode: PaletteMode, palette: PaletteOptions) =>
   createTheme({
      palette: {
         mode,
         ...palette,
      },
      typography: {
         fontFamily: `'Bricolage Grotesque Variable', sans-serif`,
         fontWeightLight: 300,
         fontWeightRegular: 400,
         fontWeightMedium: 500,
         fontWeightBold: 700,
         headingExtraLarge: {
            fontFamily: `'Bricolage Grotesque Variable', sans-serif`,
            fontSize: "2rem",
            fontWeight: 600,
            lineHeight: 1.45,
            letterSpacing: "-0.96px",
         },
         headingLarge: {
            fontFamily: `'Bricolage Grotesque Variable', sans-serif`,
            fontSize: "1.5rem",
            fontWeight: 600,
            lineHeight: 1.45,
            letterSpacing: "-0.72px",
         },
         headingMedium: {
            fontFamily: `'Bricolage Grotesque Variable', sans-serif`,
            fontSize: "1.25rem",
            fontWeight: 600,
            lineHeight: 1.45,
            letterSpacing: "-0.60px",
         },
         headingSmall: {
            fontFamily: `'Bricolage Grotesque Variable', sans-serif`,
            fontSize: "1.125rem",
            fontWeight: 600,
            lineHeight: 1.45,
            letterSpacing: "-0.54px",
         },
         headingExtraSmall: {
            fontFamily: `'Bricolage Grotesque Variable', sans-serif`,
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
                  background: "#FFFFFF",
               },
            },
         },
      },
   });
