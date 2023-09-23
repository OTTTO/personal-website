import React from "react";
import "App.css";
import AppRoutes from "router/router";
import { ThemeContextProvider } from "themes/context";

function App() {
  return (
    <ThemeContextProvider>
      <AppRoutes />
    </ThemeContextProvider>
  );
}

export default App;
