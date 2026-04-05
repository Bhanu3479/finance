import { createContext, useState } from "react";
import { transactionsData } from "../data/mockData";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(transactionsData);

  return (
    <AppContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </AppContext.Provider>
  );
}