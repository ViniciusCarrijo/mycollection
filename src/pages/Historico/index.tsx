import React from "react";
import { ScrollView } from "react-native";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { useHistoricoStore } from "../../store/Historico";
import { Box, Container, ItemContainer, Text, Title } from "./styles";

export const Historico: React.FC = () => {
  const historico = useHistoricoStore((state) => state.historico);

  return (
    <Background>
      <Header title={"Histórico"} />
      <ScrollView>
        <Container>
          <Box marginBottom={10}>
            <Title>TITULO</Title>
            <Title maxWidth={80} align={"right"}>
              VALOR
            </Title>
          </Box>
          {historico.map((item, index) => (
            <ItemContainer key={`item-${item.jogoId}`}>
              <Text>{item.titulo}</Text>
              <Text maxWidth={80} align={"right"}>
                R${item.valor.toFixed(2).toString().replace(".", ",")}
              </Text>
            </ItemContainer>
          ))}
        </Container>
      </ScrollView>
    </Background>
  );
};
