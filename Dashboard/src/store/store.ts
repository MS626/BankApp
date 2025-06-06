
import { create } from "zustand";

interface Movement {
  date: string;
  desc: string;
  amount: number;
  total: string;
  icons: string[];
}

interface MovementsState {
  movements: Movement[];
}

const useMovementsStore = create<MovementsState>(() => ({
  movements: [
    {
      date: "03/05/2021",
      desc: "Pagamento de Serviços - 501456774 - 23025",
      amount: -1316.65,
      total: "130.000,00 EUR",
      icons: [],
    },
    {
      date: "03/05/2021",
      desc: "DEV Compra BMW",
      amount: 1316.65,
      total: "130.000,00 EUR",
      icons: [],
    },
    {
      date: "03/05/2021",
      desc: "TRF CRED SEPA + 0098726374 de ISEP, LDA",
      amount: 1316.65,
      total: "130.000,00 EUR",
      icons: [],
    },
    {
      date: "03/05/2021",
      desc: "Pagamento de Serviços - 501456774 - 23025",
      amount: -1316.65,
      total: "130.000,00 EUR",
      icons: ["doc"],
    },
    {
      date: "03/05/2021",
      desc: "DEV Compra Polestar",
      amount: -1316.65,
      total: "130.000,00 EUR",
      icons: ["doc", "check", "chat"],
    },
  ],
}));

export default useMovementsStore;
