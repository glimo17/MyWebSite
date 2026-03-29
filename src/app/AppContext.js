import { createContext, useContext, useMemo } from 'react';
import dataEn from '../data/portfolioData.json';
import dataEs from '../data/portfolioData.es.json';
import { useLang } from './LangContext';

const portfolioByLang = { en: dataEn, es: dataEs };

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { lang } = useLang();
  const portfolio = portfolioByLang[lang] ?? dataEn;

  const value = useMemo(
    () => ({ portfolio }),
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