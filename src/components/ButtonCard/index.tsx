import React, { memo, useMemo } from "react";
import {
  LayoutAnimation,
  NativeModules,
  TouchableWithoutFeedback,
} from "react-native";
import { useHistoricoStore } from "../../store/Historico";
import { DefaultButton } from "../DefaultButton";
import {
  Container,
  ContainerButton,
  ContainerCard,
  ImageCard,
  ItemTitle,
  ItemTitleBold,
  Label,
} from "./styles";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

interface ItensProps {
  id: number;
  img: string;
  name: string;
  description: string;
  value: number;
  type: string;
}
interface ButtonCardProps {
  item: ItensProps;
  addCart: (item: ItensProps) => void;
  goDetail: (id: number) => void;
  setActive: (id?: number) => void;
  activeId?: number;
}

export const ButtonCard: React.FC<ButtonCardProps> = memo<ButtonCardProps>(
  ({ item, goDetail, addCart, activeId, setActive }) => {
    const historico = useHistoricoStore((state) => state.historico);

    const changeActive = () => {
      LayoutAnimation.linear();
      if (activeId === item.id) setActive();
      else setActive(item.id);
    };

    const isMine = useMemo(
      () => historico.map((item) => item.jogoId).includes(item.id),
      [historico]
    );

    return (
      <Container>
        <ContainerButton onPress={changeActive}>
          <ImageCard<any> source={{ uri: item.img }}>
            {!!isMine && <Label>ADIQUIRIDO</Label>}
            {activeId === item.id && (
              <TouchableWithoutFeedback onPress={changeActive}>
                <ContainerCard>
                  <ItemTitle ellipsizeMode={"clip"} numberOfLines={2}>
                    {item.name}
                  </ItemTitle>
                  <ItemTitleBold>
                    R$ {item.value.toFixed(2).toString().replace(".", ",")}
                  </ItemTitleBold>
                  <DefaultButton
                    title={"DETALHES"}
                    onPress={() => goDetail(item.id)}
                  />
                  {!isMine && (
                    <DefaultButton
                      title={"ADD CART"}
                      onPress={() => addCart(item as any)}
                    />
                  )}
                </ContainerCard>
              </TouchableWithoutFeedback>
            )}
          </ImageCard>
        </ContainerButton>
      </Container>
    );
  }
);
