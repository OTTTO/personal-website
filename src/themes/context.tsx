import { createContext, useState } from "react";
import { Themes } from "types/themes";

export const ThemeContext = createContext(undefined);
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(Themes.Ice);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
