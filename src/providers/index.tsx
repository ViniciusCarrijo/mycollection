import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { AuthProvider } from "../hooks/Auth.hooks";
import { MyThemeProvider } from "../hooks/Theme.hooks";
import { ConfigThemeProvider } from "./ConfigThemeProvider";
export const Providers: React.FC = ({ children }) => {
  return (
    <MyThemeProvider>
      <ConfigThemeProvider>
        <AuthProvider>
          <NativeBaseProvider>
            <NavigationContainer>{children}</NavigationContainer>
          </NativeBaseProvider>
        </AuthProvider>
      </ConfigThemeProvider>
    </MyThemeProvider>
  );
};
