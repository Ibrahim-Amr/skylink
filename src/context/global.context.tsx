import { createContext, ReactNode, useState } from 'react';

interface ContextValues {
  sideNav: boolean;
  setSideNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextValues | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [sideNav, setSideNav] = useState<boolean>(false);

  const contextValues: ContextValues = {
    sideNav,
    setSideNav,
  };

  return (
    <GlobalContext.Provider value={contextValues}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
