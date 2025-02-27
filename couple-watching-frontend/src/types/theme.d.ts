import type { PaletteColor, PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material" {
   interface Color {
      950: string;
   }
   interface ColorPartial {
      950?: string;
   }
   interface CommonColors {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
   }

   type CustomColorOptions = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "accent" | "danger";
}

declare module "@mui/material/styles" {
   type CustomColorOptions = "primary" | "secondary" | "error" | "warning" | "info" | "success" | "accent" | "danger";

   interface Palette {
      accent: Palette["primary"];
      danger: PaletteColor;
   }
   interface PaletteOptions {
      accent: PaletteOptions["primary"];
      danger?: PaletteColorOptions;
   }
   interface TypographyVariants {
      headingExtraLarge: React.CSSProperties;
      headingLarge: React.CSSProperties;
      headingMedium: React.CSSProperties;
      headingSmall: React.CSSProperties;
      headingExtraSmall: React.CSSProperties;
      bodyExtraLarge: React.CSSProperties;
      bodyLarge: React.CSSProperties;
      bodyMedium: React.CSSProperties;
      bodySmall: React.CSSProperties;
      bodyExtraSmall: React.CSSProperties;
      emphasizedBodyExtraLarge: React.CSSProperties;
      emphasizedBodyLarge: React.CSSProperties;
      emphasizedBodyMedium: React.CSSProperties;
      emphasizedBodySmall: React.CSSProperties;
      emphasizedBodyExtraSmall: React.CSSProperties;
   }

   interface TypographyVariantsOptions {
      headingExtraLarge?: React.CSSProperties;
      headingLarge?: React.CSSProperties;
      headingMedium?: React.CSSProperties;
      headingSmall?: React.CSSProperties;
      headingExtraSmall?: React.CSSProperties;
      bodyExtraLarge?: React.CSSProperties;
      bodyLarge?: React.CSSProperties;
      bodyMedium?: React.CSSProperties;
      bodySmall?: React.CSSProperties;
      bodyExtraSmall?: React.CSSProperties;
      emphasizedBodyExtraLarge?: React.CSSProperties;
      emphasizedBodyLarge?: React.CSSProperties;
      emphasizedBodyMedium?: React.CSSProperties;
      emphasizedBodySmall?: React.CSSProperties;
      emphasizedBodyExtraSmall?: React.CSSProperties;
   }
}

declare module "@mui/material/Typography" {
   interface TypographyPropsVariantOverrides {
      headingExtraLarge: true;
      headingLarge: true;
      headingMedium: true;
      headingSmall: true;
      headingExtraSmall: true;
      bodyExtraLarge: true;
      bodyLarge: true;
      bodyMedium: true;
      bodySmall: true;
      bodyExtraSmall: true;
      emphasizedBodyExtraLarge: true;
      emphasizedBodyLarge: true;
      emphasizedBodyMedium: true;
      emphasizedBodySmall: true;
      emphasizedBodyExtraSmall: true;
   }
}

declare module "@mui/material/Button" {
   interface ButtonPropsColorOverrides {
      accent: true;
      danger: true;
   }
}

declare module "@mui/material/IconButton" {
   interface IconButtonPropsColorOverrides {
      accent: true;
      danger: true;
   }
}
