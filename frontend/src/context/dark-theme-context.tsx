import React, { createContext, useContext, useState } from 'react';

const DarkThemeContext = createContext({
  isDarkTheme: true as boolean,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setIsDarkTheme: (isDarkTheme: boolean) => {},
});

export function useDarkTheme() {
  return useContext(DarkThemeContext);
}

const DarkThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  console.log('isDarkTheme', isDarkTheme);

  return <DarkThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>{children}</DarkThemeContext.Provider>;
};

export default DarkThemeProvider;
