import React, { createContext, useContext, useState } from 'react';

export const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      'useNavigation must be used within a NavigationProvider'
    );
  }
  return context;
};

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentContent, setCurrentContent] = useState({});

  const value = {
    currentPage,
    setCurrentPage,
    currentContent,
    setCurrentContent,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
