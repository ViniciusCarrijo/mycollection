import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { api } from "../../api";
import { Background } from "../../components/Background";
import { DefaultButton } from "../../components/DefaultButton";
import { Header } from "../../components/Header";
import { ToastLayout } from "../../components/ToastLayout";
import {
  DetalhesScreenRouteProp,
  TabNavScreenNavigationProp,
} from "../../routes/PrivateNavigation";
import { HomeScreenTabNavigationProps } from "../../routes/TabsNavigation";
import { useCarrinhoStore } from "../../store/Carrinho";
import { useHistoricoStore } from "../../store/Historico";
import { Box, Container, Image, Text, Title } from "./styles";

interface ItensProps {
  id: number;
  img: string;
  name: string;
  description: string;
  value: number;
  type: string;
}

export const Detalhes: React.FC = () => {
  const [data, setData] = useState<ItensProps | undefined>();
  const toast = useToast();
  const route = useRoute<DetalhesScreenRouteProp>();
  const navigation = useNavigation<
    TabNavScreenNavigationProp & HomeScreenTabNavigationProps
  >();
  const historico = useHistoricoStore((state) => state.historico);

  const addItem = useCarrinhoStore((state) => state.addItem);
  const addCart = () => {
    if (data) {
      addItem({
        jogoId: data.id,
        titulo: data.name,
        valor: data.value,
      });
    }
  };

  const isMine = useMemo(
    () =>
      data ? historico.map((item) => item.jogoId).includes(data.id) : false,
    [historico, data]
  );

  const addAndGoToCart = () => {
    addCart();
    navigation.goBack();
    navigation.navigate("Cart");
  };

  const getData = async () => {
    try {
      const response = await api.get<ItensProps>(`games/${route.params.id}`);
      if (!!response.data) setData(response.data);
    } catch (error: any) {
      toast.show({
        placement: "top-right",
        render: ({ id }) => {
          return ToastLayout.error({
            id,
            description: error.message,
            close: toast.close,
          });
        },
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Background>
      <Header title={data?.name} />
      <ScrollView>
        {data?.img && <Image source={{ uri: data?.img }} />}
        <Container>
          <Box>
            <Title>TIPO</Title>
            <Text>{data?.type}</Text>
          </Box>
          <Box>
            <Title>DESCRIÇÃO</Title>
            <Text>{data?.description}</Text>
          </Box>
          <Box marginBottom={20}>
            <Title>VALOR</Title>
            <Text>
              R$ {data?.value.toFixed(2).toString().replace(".", ",")}
            </Text>
          </Box>
          {data && (
            <>
              {!isMine && (
                <>
                  <DefaultButton
                    title={"ADICIONAR AO CARRINHO"}
                    onPress={addCart}
                  />
                  <DefaultButton title={"COMPRAR"} onPress={addAndGoToCart} />
                </>
              )}
            </>
          )}
        </Container>
      </ScrollView>
    </Background>
  );
};
