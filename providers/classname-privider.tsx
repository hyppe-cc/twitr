import { createContext, ReactNode, useContext } from 'react';

const ClassNameProviderCtx = createContext<{ className?: string }>({});

export const useClassName = () => {
  return useContext(ClassNameProviderCtx);
};

export default function ClassNameProvider({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ClassNameProviderCtx.Provider value={{ className }}>{children}</ClassNameProviderCtx.Provider>
  );
}
