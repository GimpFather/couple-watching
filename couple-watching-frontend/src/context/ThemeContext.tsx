/* eslint-disable react-refresh/only-export-components */
import { PaletteMode, PaletteOptions, Theme } from "@mui/material";
import { createContext, useContext, ReactNode } from "react";
import { getTheme } from "../theme";
import React from "react";
import { blueOrangePalette } from "../constants/PALETTS";

interface ThemeContextInterface {
   mode: PaletteMode;
   userPalatte: PaletteOptions;
   backgroundGradient: string;
   setMode: (mode: PaletteMode) => void;
   setUserPalette: (palette: PaletteOptions) => void;
   setBackgroundGradient: (gradient: string) => void;
}

interface ThemeProviderWrapperProps {
   children: (theme: Theme) => ReactNode;
}

const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);

export const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
   const [mode, setMode] = React.useState<PaletteMode>("light");
   const [userPalatte, setUserPalette] = React.useState<PaletteOptions>(blueOrangePalette);
   const [backgroundGradient, setBackgroundGradient] = React.useState<string>(blueOrangePalette.background!.default!);
   const theme = React.useMemo(
      () => getTheme(mode, userPalatte, backgroundGradient),
      [mode, userPalatte, backgroundGradient]
   );

   return (
      <ThemeContext.Provider
         value={{ mode, setMode, userPalatte, setUserPalette, backgroundGradient, setBackgroundGradient }}
      >
         {children(theme)}
      </ThemeContext.Provider>
   );
};

export const useThemeContext = () => {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error("useThemeContext must be used within a ThemeProviderWrapper");
   }
   return context;
};
