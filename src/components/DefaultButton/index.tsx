import React from "react";
import { TouchableOpacityProps } from "react-native";
import { useMyTheme } from "../../hooks/Theme.hooks";
import { Button, ButtonTitle, LoadingIndicator } from "./styles";

interface DefaultButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}
export const DefaultButton: React.FC<DefaultButtonProps> = ({
  title,
  loading = false,
  ...props
}) => {
  const { theme } = useMyTheme();
  return (
    <Button {...(props as any)}>
      {loading && (
        <LoadingIndicator color={theme.colors.background} size={"small"} />
      )}
      <ButtonTitle>{title}</ButtonTitle>
    </Button>
  );
};
