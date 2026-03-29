import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import dataEn from '../data/portfolioData.json';
import dataEs from '../data/portfolioData.es.json';
import { useLang } from './LangContext';

const portfolioByLang = { en: dataEn, es: dataEs };

const EDITS_KEY = 'portfolio.edits';

function loadStoredEdits() {
  try {
    const raw = window.localStorage.getItem(EDITS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { lang } = useLang();
  const [edits, setEdits] = useState(loadStoredEdits);

  const portfolio = useMemo(() => {
    const base = portfolioByLang[lang] ?? dataEn;
    return edits[lang] ? { ...base, ...edits[lang] } : base;
  }, [lang, edits]);

  const updatePortfolio = useCallback((targetLang, newData) => {
    setEdits(prev => {
      const next = { ...prev, [targetLang]: newData };
      try {
        window.localStorage.setItem(EDITS_KEY, JSON.stringify(next));
      } catch { /* storage unavailable */ }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ portfolio, updatePortfolio }),
    [portfolio, updatePortfolio]
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