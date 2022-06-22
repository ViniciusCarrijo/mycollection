import color from "color";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { useMyTheme } from "../hooks/Theme.hooks";

export const ConfigThemeProvider: React.FC = ({ children }) => {
  const { theme } = useMyTheme();
  return (
    <ThemeProvider theme={theme}>
      <>
        <StatusBar
          style="light"
          translucent={false}
          backgroundColor={color(theme.colors.background).darken(0.5).hex()}
        />
        {children}
      </>
    </ThemeProvider>
  );
};
