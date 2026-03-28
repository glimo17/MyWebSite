import { createContext, useContext, useMemo, useState } from 'react';
import portfolioData from '../data/portfolioData.json';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [portfolio, setPortfolio] = useState(portfolioData);

  const value = useMemo(
    () => ({
      portfolio,
      setPortfolio,
    }),
    [portfolio]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
}