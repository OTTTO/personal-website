import {
  Button,
  Divider,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import useWindowDimensions from "hooks/useWindowDimensions";
import trouble from "images/trouble.jpeg";
import projectsTheme from "themes/projectsTheme";

export function Projects() {
  const { width } = useWindowDimensions();
  const smallerDeviceWidth = 900;
  const isSmaller = width < smallerDeviceWidth;
  return (
    <Grid sx={{ height: "vh100" }}>
      <ThemeProvider theme={projectsTheme}>
        <Menu backgroundColor="white"></Menu>
        <Grid container direction="column" width="90%" margin="0 auto">
          <Typography variant="h1" textAlign="center">
            PERSONAL PROJECTS
          </Typography>
          <Divider sx={{ backgroundColor: "grey", borderBottomWidth: 2 }} />
          <Grid container>
            <Grid width="5%"></Grid>
            <Grid
              container
              sx={{
                backgroundColor: "#dadde3",
                padding: "1rem",
                marginTop: "2rem",
                border: "solid black",
              }}
              width="90%"
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                container
                direction="column"
                width={isSmaller ? "80%" : "15%"}
              >
                <Typography
                  variant={isSmaller ? "h3" : "h4"}
                  textAlign="center"
                >
                  <b>GAME OF TROUBLE</b>
                </Typography>
                <Button href="/projects/trouble">
                  <img
                    src={trouble}
                    alt="Trouble Game"
                    className="projectImg"
                  ></img>
                </Button>
              </Grid>

              <Typography
                variant={isSmaller ? "h4" : "h5"}
                width={isSmaller ? "100%" : "75%"}
                paddingLeft={isSmaller ? "0rem" : "2rem"}
                textAlign={isSmaller ? "center" : "left"}
              >
                This board game was developed in 2020 for a course while
                studying computer science. It was orignally written in Java and
                was a terminal game, at the beginning of 2023 it was ported to
                React to allow users to play in the browser.{" "}
                <b>(Click image to play)</b>
              </Typography>
            </Grid>
            <Grid width="5%"></Grid>
          </Grid>
        </Grid>
        <Footer backgroundColor="white"></Footer>
      </ThemeProvider>
    </Grid>
  );
}
