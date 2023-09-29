import { ThemeProvider, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "themes/context";
import projectsTheme from "themes/projectsTheme";
import { getTitleTheme } from "utils/utils";

export function Title({ title }) {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={projectsTheme}>
      <Typography
        variant="h1"
        textAlign="center"
        color="transparent"
        sx={{
          background: getTitleTheme(theme),
          WebkitBackgroundClip: "text",
        }}
      >
        {title}
      </Typography>
    </ThemeProvider>
  );
}
