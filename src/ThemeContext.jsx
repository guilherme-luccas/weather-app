import { createContext, useState } from "react";

export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [themeLight, setThemeLight] = useState(true);

  function ChangeTheme(theme) {
    setThemeLight(!theme);
  }
  return (
    <ThemeContext.Provider value={{ themeLight, ChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
