import { createContext, useContext } from "react";

export const CounterContext = createContext({
  reactCount: 0,
  electronCount: 0,
  isLoading: true,
});
export const useCounter = () => useContext(CounterContext);
