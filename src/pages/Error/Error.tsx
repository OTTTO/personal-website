import { Grid, ThemeProvider, Typography } from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import robot from "images/broken-robot.jpeg";
import mainTheme from "themes/mainTheme";

export function ErrorPage() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Menu backgroundColor="white"></Menu>
      <Grid
        container
        direction="column"
        sx={{ display: "block", margin: "20% auto" }}
      >
        <Typography
          variant="h2"
          textAlign="center"
          fontWeight="bold"
          sx={{ textDecoration: "underline" }}
        >
          SORRY
        </Typography>
        <img
          src={robot}
          alt="broken robot"
          className="brokenRobot"
          width="50%"
        ></img>
        <Typography variant="h5" textAlign="center" fontWeight="bold">
          Something went terribly wrong
        </Typography>
      </Grid>
      <Footer backgroundColor="white"></Footer>
    </ThemeProvider>
  );
}
