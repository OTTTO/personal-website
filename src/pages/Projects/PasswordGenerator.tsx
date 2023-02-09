import { Grid, ThemeProvider, Typography } from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import mainTheme from "themes/mainTheme";

export function PasswordGenerator() {
  return (
    <Grid container direction="column" border="double thick black">
      <ThemeProvider theme={mainTheme}>
        <Menu backgroundColor="black" borderSides></Menu>
      </ThemeProvider>
      <Grid
        padding="1rem 0rem"
        width="99%"
        margin="0 auto .25rem auto"
        bgcolor="black"
      >
        <Typography color="white" textAlign="center" variant="h4">
          RANDOM PASSWORD GENERATOR
        </Typography>
      </Grid>
      <Footer backgroundColor="black"></Footer>
    </Grid>
  );
}
