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
import website from "images/personal-website.jpeg";
import projectsTheme from "themes/projectsTheme";

export function Projects() {
  const { width } = useWindowDimensions();
  const smallerDeviceWidth = 1000;
  const isSmaller = width < smallerDeviceWidth;
  return (
    <Grid sx={{ height: "vh100" }} border="black solid .5rem">
      <ThemeProvider theme={projectsTheme}>
        <Menu backgroundColor="black" borderSides></Menu>
        <Grid
          container
          direction="column"
          margin="0 auto"
          paddingBottom="2rem"
          borderBottom=".25rem white solid"
          borderLeft=".5rem white solid"
          borderRight=".5rem white solid"
          sx={{ backgroundColor: "black" }}
        >
          <Typography variant="h1" textAlign="center" color="white">
            PERSONAL PROJECTS
          </Typography>
          <Divider sx={{ backgroundColor: "white", borderBottomWidth: 2 }} />
          <Grid container>
            <Grid width="5%"></Grid>
            <Grid
              container
              sx={{
                backgroundColor: "white",
                padding: "1rem",
                marginTop: "2rem",
                border: "thick double black",
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
                  <b>PERSONAL WEBSITE</b>
                </Typography>
                <Button href="/">
                  <img
                    src={website}
                    alt="Personal Website"
                    className={
                      isSmaller ? "projectImgSmallDevice" : "projectImg"
                    }
                  ></img>
                </Button>
                <Typography
                  variant={isSmaller ? "h3" : "h6"}
                  textAlign="center"
                ></Typography>
              </Grid>

              <Typography
                variant={isSmaller ? "h4" : "h5"}
                width={isSmaller ? "100%" : "75%"}
                paddingLeft={isSmaller ? "0rem" : "2rem"}
                textAlign={isSmaller ? "center" : "left"}
              >
                This is the website that you are currently on! It was developed
                in December of 2022 and then put online in January of 2023. The{" "}
                <a
                  href="https://github.com/OTTTO/personal-website"
                  target="_blank"
                  rel="noreferrer"
                >
                  frontend
                </a>{" "}
                is built in React and deployed on an S3 bucket served by
                Cloudfront. The{" "}
                <a
                  href="https://github.com/OTTTO/personal-website-backend"
                  target="_blank"
                  rel="noreferrer"
                >
                  backend
                </a>{" "}
                is built with Typescript; it uses NestJS and Postgres with
                TypeORM, as well as GraphQL to serve up data to the frontend. It
                is hosted on an EC2 server which I administer.
              </Typography>
            </Grid>
            <Grid width="5%"></Grid>
          </Grid>
          <br></br>
          <br></br>
          <Divider sx={{ backgroundColor: "white", borderBottomWidth: 2 }} />
          <Grid container>
            <Grid width="5%"></Grid>
            <Grid
              container
              sx={{
                backgroundColor: "white",
                padding: "1rem",
                marginTop: "2rem",
                border: "thick double black",
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
                    className={
                      isSmaller ? "projectImgSmallDevice" : "projectImg"
                    }
                  ></img>
                </Button>
                <Typography
                  variant={isSmaller ? "h3" : "h6"}
                  textAlign="center"
                >
                  <b>Click to play!</b>
                </Typography>
              </Grid>

              <Typography
                variant={isSmaller ? "h4" : "h5"}
                width={isSmaller ? "100%" : "75%"}
                paddingLeft={isSmaller ? "0rem" : "2rem"}
                textAlign={isSmaller ? "center" : "left"}
              >
                This board game was developed in 2020 for an Object Oriented
                Programming course while studying computer science. It was
                orignally written in{" "}
                <a
                  href="https://github.com/OTTTO/GameOfTrouble"
                  target="_blank"
                  rel="noreferrer"
                >
                  Java{" "}
                </a>{" "}
                and was a{" "}
                <a
                  href="https://replit.com/@DylanBeckwith/Trouble#Main.java"
                  target="_blank"
                  rel="noreferrer"
                >
                  terminal game
                </a>{" "}
                <b>(just click ▷Run)</b>. At the end of 2022 it was ported to{" "}
                <a
                  href="https://github.com/OTTTO/personal-website/blob/main/src/pages/Projects/Trouble.tsx"
                  target="_blank"
                  rel="noreferrer"
                >
                  React
                </a>{" "}
                to allow users to play in the browser.{" "}
              </Typography>
            </Grid>
            <Grid width="5%"></Grid>
          </Grid>
        </Grid>
        <Footer backgroundColor="black"></Footer>
      </ThemeProvider>
    </Grid>
  );
}
