import React from "react";
import { Controller } from "react-hook-form";
import { Background } from "../../components/Background";
import { DefaultButton } from "../../components/DefaultButton";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import {
  CadastroControllerProvider,
  useCadastroController,
} from "./controller";
import { Container } from "./styles";

export const CadastroLayout: React.FC = () => {
  const { load, control, sendForm, errors } = useCadastroController();

  return (
    <Background>
      <Header title={"Cadastro"} />
      <Container>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="E-MAIL"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
              keyboardType={"email-address"}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="SENHA"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="CONFIRMAR SENHA"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.passwordConfirm?.message}
            />
          )}
          name="passwordConfirm"
        />
        <DefaultButton title={"CADASTRAR"} loading={load} onPress={sendForm} />
      </Container>
    </Background>
  );
};

export const Cadastro: React.FC = () => {
  return (
    <CadastroControllerProvider>
      <CadastroLayout />
    </CadastroControllerProvider>
  );
};
