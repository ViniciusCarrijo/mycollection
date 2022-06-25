import create from "zustand";
import { api } from "../api";

export interface ItemHistorico {
  jogoId: number;
  titulo: string;
  valor: number;
}

interface HistoricoStorePros {
  historico: ItemHistorico[];
  loadData(id: number, email: string): Promise<void>;
}

export const useHistoricoStore = create<HistoricoStorePros>((set) => ({
  historico: [],
  loadData: async (id, email) => {
    const response = await api.get("pedidos", {
      params: {
        userId: id,
        userEmail: email,
      },
    });

    let myHistory =
      response.data.map((item: { items: ItemHistorico[] }) => item.items) || [];
    if (myHistory.length > 0) {
      myHistory = myHistory.reduce(
        (primeiro: ItemHistorico[], segundo: ItemHistorico[]) => [
          ...primeiro,
          ...segundo,
        ]
      );
    }

    set((state) => ({ historico: myHistory as ItemHistorico[] }));
  },
}));
