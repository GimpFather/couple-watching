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
}

declare module "@mui/material/styles" {
   interface Palette {
      accent: PaletteColor;
      danger: PaletteColor;
   }
   interface PaletteOptions {
      accent?: PaletteColorOptions;
      danger?: PaletteColorOptions;
   }
}
