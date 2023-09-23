import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "themes/context";
import { Themes } from "types/themes";

export function Footer({ error = undefined }) {
  const { theme } = useContext(ThemeContext);
  return (
    <Grid
      sx={{
        background: error
          ? "white"
          : theme === Themes.Fire
          ? "linear-gradient(90deg, red, black)"
          : "linear-gradient(90deg, black, cyan)",
        padding: "0rem 0rem 1rem 1rem",
      }}
      borderTop="3px solid white"
    >
      <Grid item>
        <Typography
          color={theme === Themes.Fire ? "white" : "black"}
          padding="1rem 1rem 0rem 0rem"
          textAlign="right"
        >
          © Dylan Beckwith 2022
        </Typography>
      </Grid>
    </Grid>
  );
}
