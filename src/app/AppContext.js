import { createContext, useContext, useMemo, useState } from 'react';
import portfolioData from '../data/portfolioData.json';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [portfolio, setPortfolio] = useState(portfolioData);

  const filteredFeedItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return portfolio.feedItems;
    }

    return portfolio.feedItems.filter((item) => {
      const haystack = [item.title, item.body, item.tag]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [portfolio.feedItems, searchQuery]);

  const value = useMemo(
    () => ({
      portfolio,
      setPortfolio,
      searchQuery,
      setSearchQuery,
      filteredFeedItems,
    }),
    [filteredFeedItems, portfolio, searchQuery]
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