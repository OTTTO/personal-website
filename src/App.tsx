import React from "react";
import "App.css";
import AppRoutes from "router/router";
import { ThemeContextProvider } from "context/theme";
import { LanguageContextProvider } from "context/language";

function App() {
  return (
    <ThemeContextProvider>
      <LanguageContextProvider>
        <AppRoutes />
      </LanguageContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
