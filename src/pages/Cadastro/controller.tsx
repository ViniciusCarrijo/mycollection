import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import React, { createContext, useContext, useState } from "react";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { api } from "../../api";
import { ToastLayout } from "../../components/ToastLayout";
import { CadastroScreenNavigationProp } from "../../routes/OpenNavigation";
import { cadastroValidator } from "./cadastro.validator";

type CadastroData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

interface CadastroControllerProps {
  load: boolean;
  control: Control<CadastroData>;
  sendForm(data: any): Promise<void>;
  errors: FieldErrors<CadastroData>;
}
const CadastroControllerContext = createContext<CadastroControllerProps>(
  {} as any
);

export const CadastroControllerProvider: React.FC = ({ children }) => {
  const [load, setLoad] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroData>({
    resolver: yupResolver(cadastroValidator),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const navigation = useNavigation<CadastroScreenNavigationProp>();
  const toast = useToast();

  const sendForm = handleSubmit(async (data: CadastroData) => {
    setLoad(true);
    const { email, password } = data;

    try {
      const response = await api.post("users", {
        email,
        password,
      });
      setLoad(false);
      navigation.goBack();
      toast.show({
        placement: "top-right",
        render: ({ id }) => {
          return ToastLayout.success({
            id,
            description: "usuário cadastrado com sucesso",
            close: toast.close,
          });
        },
      });
    } catch (e: any) {
      setLoad(false);
      toast.show({
        placement: "top-right",
        render: ({ id }) => {
          return ToastLayout.error({
            id,
            description: e.message,
            close: toast.close,
          });
        },
      });
    }
  });
  return (
    <CadastroControllerContext.Provider
      value={{ control, load, errors, sendForm }}
    >
      {children}
    </CadastroControllerContext.Provider>
  );
};

export const useCadastroController: () => CadastroControllerProps = () => {
  return useContext<CadastroControllerProps>(CadastroControllerContext);
};
