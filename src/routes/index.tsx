import React from "react";
import { useAuth } from "../hooks/Auth.hooks";
import { OpenNavigation } from "./OpenNavigation";
import { PrivateNavigation } from "./PrivateNavigation";

export const Routes: React.FC = () => {
  const { user } = useAuth();
  return !!user ? <PrivateNavigation /> : <OpenNavigation />;
};
