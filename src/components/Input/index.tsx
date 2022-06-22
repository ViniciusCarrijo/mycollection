import { FontAwesome5 } from "@expo/vector-icons";
import color from "color";
import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { BACKGROUND_COLOR } from "../../styles/colors";
import { ErrorText, InputContainer, InputElement } from "./styles";

const PLACEHOLDER_COLOR = color(BACKGROUND_COLOR).lighten(0).hex();

interface InputProps extends TextInputProps {
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  secureTextEntry = false,
  error,
  ...rest
}) => {
  const [secure, setSecure] = useState<boolean>(secureTextEntry);
  const changeSecure = () => setSecure((sec) => !sec);
  return (
    <>
      <InputContainer error={!!error}>
        <InputElement
          {...(rest as any)}
          secureTextEntry={secure}
          placeholderTextColor={PLACEHOLDER_COLOR}
        />
        {secureTextEntry && (
          <FontAwesome5
            name={`eye${secure ? "-slash" : ""}`}
            size={26}
            color={PLACEHOLDER_COLOR}
            onPress={changeSecure}
          />
        )}
      </InputContainer>
      {!!error && <ErrorText>{error}</ErrorText>}
    </>
  );
};
