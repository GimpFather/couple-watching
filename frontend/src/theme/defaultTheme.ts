import { createTheme, type PaletteMode, type PaletteOptions } from "@mui/material/styles";

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
            fontWeight: 700,
            lineHeight: "120%",
            letterSpacing: "-0.2%",
         },
         headingLarge: {
            fontFamily: `'Bricolage Grotesque Variable', sans-serif`,
            fontSize: "1.5rem",
            fontWeight: 700,
            lineHeight: "120%",
            letterSpacing: "-0.2%",
         },
         headingMedium: {
            fontFamily: `'Bricolage Grotesque Variable', sans-serif`,
            fontSize: "1.25rem",
            fontWeight: 700,
            lineHeight: "145%",
            letterSpacing: "-0.2%",
         },
         headingSmall: {
            fontFamily: `'Bricolage Grotesque Variable', sans-serif`,
            fontSize: "1.125rem",
            fontWeight: 700,
            lineHeight: "120%",
            letterSpacing: "-0.2%",
         },
         headingExtraSmall: {
            fontFamily: `'Bricolage Grotesque Variable', sans-serif`,
            fontSize: "0.875rem",
            fontWeight: 700,
            lineHeight: "120%",
            letterSpacing: "-0.2%",
         },
         bodyExtraLarge: {
            fontFamily: `'DM Sans Variable', sans-serif`,
            fontSize: "1.125rem",
            fontWeight: 400,
            lineHeight: "175%",
            letterSpacing: "-1%",
         },
         bodyLarge: {
            fontFamily: `'DM Sans Variable', sans-serif`,
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: "175%",
            letterSpacing: "-1%",
         },
         bodyMedium: {
            fontFamily: `'DM Sans Variable', sans-serif`,
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: "175%",
            letterSpacing: "-1%",
         },
         bodySmall: {
            fontFamily: `'DM Sans Variable', sans-serif`,
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: "175%",
            letterSpacing: "-1%",
         },
         bodyExtraSmall: {
            fontFamily: `'DM Sans Variable', sans-serif`,
            fontSize: "0.563rem",
            fontWeight: 400,
            lineHeight: "175%",
            letterSpacing: "-1%",
         },
         emphasizedBodyExtraLarge: {
            fontFamily: `'DM Sans Variable', sans-serif`,
            fontSize: "1.125rem",
            fontWeight: 500,
            lineHeight: "175%",
            letterSpacing: "-1%",
         },
         emphasizedBodyLarge: {
            fontFamily: `'DM Sans Variable', sans-serif`,
            fontSize: "1rem",
            fontWeight: 500,
            lineHeight: "175%",
            letterSpacing: "-1%",
         },
         emphasizedBodyMedium: {
            fontFamily: `'DM Sans Variable', sans-serif`,
            fontSize: "0.875rem",
            fontWeight: 500,
            lineHeight: "175%",
            letterSpacing: "-1%",
         },
         emphasizedBodySmall: {
            fontFamily: `'DM Sans Variable', sans-serif`,
            fontSize: "0.75rem",
            fontWeight: 500,
            lineHeight: "175%",
            letterSpacing: "-1%",
         },
         emphasizedBodyExtraSmall: {
            fontFamily: `'DM Sans Variable', sans-serif`,
            fontSize: "0.563rem",
            fontWeight: 500,
            lineHeight: "175%",
            letterSpacing: "-1%",
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
