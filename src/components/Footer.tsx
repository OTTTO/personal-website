import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "themes/context";
import { getFooterTheme } from "utils/utils";

export function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <Grid
      sx={{
        background: getFooterTheme(theme),
        padding: "0rem 0rem 1rem 1rem",
      }}
      borderTop="3px solid white"
    >
      <Grid item>
        <Typography
          color="white"
          padding="1rem 1rem 0rem 0rem"
          textAlign="right"
        >
          © Dylan Beckwith {new Date().getFullYear()}
        </Typography>
      </Grid>
    </Grid>
  );
}
