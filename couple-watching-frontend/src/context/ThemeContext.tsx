/* eslint-disable react-refresh/only-export-components */
import { PaletteMode, PaletteOptions, Theme } from "@mui/material";
import { createContext, useContext, ReactNode } from "react";
import { blueOrangePalette, getTheme } from "../theme";
import React from "react";

interface ThemeContextInterface {
   mode: PaletteMode;
   userPalatte: PaletteOptions;
   setMode: (mode: PaletteMode) => void;
   setUserPalette: (palette: PaletteOptions) => void;
}

interface ThemeProviderWrapperProps {
   children: (theme: Theme) => ReactNode;
}

const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);

export const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
   const [mode, setMode] = React.useState<PaletteMode>("light");
   const [userPalatte, setUserPalette] = React.useState<PaletteOptions>(blueOrangePalette);

   const theme = React.useMemo(() => getTheme(mode, userPalatte), [mode, userPalatte]);

   return (
      <ThemeContext.Provider value={{ mode, setMode, userPalatte, setUserPalette }}>
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
