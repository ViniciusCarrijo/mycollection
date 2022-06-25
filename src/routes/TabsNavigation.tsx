import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationProp,
} from "@react-navigation/material-bottom-tabs";
import color from "color";
import React from "react";
import { View } from "react-native";
import { Carrinho } from "../pages/Carrinho";
import { Listagem } from "../pages/Listagem";
import { Perfil } from "../pages/Perfil";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import { useMyTheme } from "../hooks/Theme.hooks";
import { Historico } from "../pages/Historico";
import { useCarrinhoStore } from "../store/Carrinho";

export type TabsNavigationParamList = {
  Home: undefined;
  Cart: undefined;
  Perfil: undefined;
  Historico: undefined;
};

export type HomeScreenTabNavigationProps = MaterialBottomTabNavigationProp<
  TabsNavigationParamList,
  "Home"
>;
export type CartScreenTabNavigationProps = MaterialBottomTabNavigationProp<
  TabsNavigationParamList,
  "Cart"
>;
export type PerfilScreenTabNavigationProps = MaterialBottomTabNavigationProp<
  TabsNavigationParamList,
  "Perfil"
>;
export type HistoricoScreenTabNavigationProps = MaterialBottomTabNavigationProp<
  TabsNavigationParamList,
  "Historico"
>;

const Tab = createMaterialBottomTabNavigator();

export const TabsNavigation: React.FC = () => {
  const { theme } = useMyTheme();
  const carrinho = useCarrinhoStore((state) => state.carrinho);
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      barStyle={{ backgroundColor: theme.colors.secondary }}
      activeColor={color(theme.colors.primary).darken(0.15).hex()}
      inactiveColor={theme.colors.background}
    >
      <Tab.Screen
        name="Home"
        component={Listagem}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Carrinho}
        options={{
          tabBarLabel: "Carrinho",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <MaterialCommunityIcons name="cart" color={color} size={26} />
              {carrinho.length > 0 && (
                <Badge
                  size={18}
                  style={{ position: "absolute", right: -8, top: -2 }}
                >
                  {carrinho.length}
                </Badge>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Historico"
        component={Historico}
        options={{
          tabBarLabel: "Histórico",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
