import { createContext, ReactNode, useContext, useState } from 'react';

type contextType = {
  offsetY: number;
  setOffsetY: (index: number) => void;
  headerHeight: number;
  setHeaderHeight: (height: number) => void;
};

const TabsContext = createContext<contextType>({} as contextType);

export const useTabs = () => {
  return useContext(TabsContext);
};

export default function TabsProvider({ children }: { children: ReactNode }) {
  const [offsetY, setOffsetY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <TabsContext.Provider value={{ offsetY, setOffsetY, headerHeight, setHeaderHeight }}>
      {children}
    </TabsContext.Provider>
  );
}
