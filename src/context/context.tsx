import React, { createContext, useContext, useState } from "react";

type GlobalContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const initialGlobalState: GlobalContextType = {
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
};

export const GlobalContext =
  createContext<GlobalContextType>(initialGlobalState);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: any) => {
  const [loading, setLoading] = useState<boolean>(initialGlobalState.loading);
  const [error, setError] = useState<string | null>(initialGlobalState.error);

  return (
    <GlobalContext.Provider value={{ loading, setLoading, error, setError }}>
      {children}
    </GlobalContext.Provider>
  );
};
