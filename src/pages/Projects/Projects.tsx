import {
  Button,
  Divider,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import useWindowDimensions from "hooks/useWindowDimensions";
import trouble from "images/trouble.jpeg";
import website from "images/personal-website.jpeg";
import projectsTheme from "themes/projectsTheme";
import React from "react";
import { authenticationCheck } from "utils/utils";
import { WysiwygEditor } from "components/WysiwygEditor";

const isAuthenticated = authenticationCheck();

export function Projects() {
  const { width } = useWindowDimensions();
  const smallerDeviceWidth = 1000;
  const isSmaller = width < smallerDeviceWidth;
  return (
    <Grid border="thick double black">
      <Grid sx={{ height: "vh100" }} border="white solid .25rem">
        <ThemeProvider theme={projectsTheme}>
          <Menu backgroundColor="black"></Menu>
          <Grid
            container
            direction="column"
            margin="0 auto"
            paddingBottom="2rem"
            borderBottom=".25rem white solid"
            sx={{ backgroundColor: "black" }}
          >
            <Typography variant="h1" textAlign="center" color="white">
              PERSONAL PROJECTS
            </Typography>
            <Divider sx={{ backgroundColor: "white", borderBottomWidth: 4 }} />
            <Grid container>
              <Grid width="5%"></Grid>
              <Grid
                container
                sx={{
                  backgroundColor: "white",
                  padding: "1rem",
                  margin: "1rem 0",
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
                  {!isAuthenticated ? (
                    <Typography
                      variant={isSmaller ? "h3" : "h4"}
                      textAlign="center"
                    >
                      <b>PERSONAL WEBSITE</b>
                    </Typography>
                  ) : (
                    <TextField
                      fullWidth={true}
                      // value={post.author}
                      // onChange={(e) => handleTextChange(e, "author")}
                      label="Project Title"
                      sx={{ margin: "1rem 0rem" }}
                    ></TextField>
                  )}
                  <Grid
                    padding={isSmaller ? "1rem 0rem" : ".5rem 0rem"}
                    margin="0 auto"
                  >
                    <img
                      src={!isAuthenticated ? website : null}
                      alt="Personal Website"
                      className={
                        isSmaller ? "projectImgSmallDevice" : "projectImg"
                      }
                    ></img>
                  </Grid>
                  <Typography
                    variant={isSmaller ? "h3" : "h6"}
                    textAlign="center"
                  ></Typography>
                </Grid>
                {!isAuthenticated ? (
                  <Typography
                    variant={isSmaller ? null : "h5"}
                    width={isSmaller ? "100%" : "75%"}
                    paddingLeft={isSmaller ? "0rem" : "2rem"}
                    textAlign={isSmaller ? "center" : "left"}
                  >
                    This is the website that you are currently on! It was
                    developed in December of 2022 and then put online in January
                    of 2023. The{" "}
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
                    TypeORM, as well as GraphQL to serve up data to the
                    frontend. It is hosted on an EC2 server which I administer.
                    The{" "}
                    <a
                      href="https://github.com/OTTTO/personal-website-serverless"
                      target="_blank"
                      rel="noreferrer"
                    >
                      serverless api
                    </a>{" "}
                    which handles blogging exists entirely in the cloud on AWS
                    infrastructure.{" "}
                    <a
                      href="/blog/post/12db148b-d53d-4a10-81e6-b8f49f4b0c67"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      This post
                    </a>{" "}
                    explains what I learned during the website's creation.
                  </Typography>
                ) : (
                  <Grid
                    width={isSmaller ? "100%" : "75%"}
                    paddingLeft={isSmaller ? null : "1rem"}
                  >
                    <WysiwygEditor />
                  </Grid>
                )}
              </Grid>
              <Grid width="5%"></Grid>
            </Grid>

            <Grid width="95%" margin="0 auto">
              <Divider
                sx={{ backgroundColor: "white", borderBottomWidth: 2 }}
              />
              <Divider
                sx={{ backgroundColor: "black", borderBottomWidth: 1 }}
              />
              <Divider
                sx={{ backgroundColor: "white", borderBottomWidth: 2 }}
              />
            </Grid>
            <Grid container>
              <Grid width="5%"></Grid>
              <Grid
                container
                sx={{
                  backgroundColor: "white",
                  padding: "1rem",
                  marginTop: "1rem",
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
                  <Button
                    href="/projects/trouble"
                    sx={{ padding: isSmaller ? "1rem 0rem" : ".5rem 0rem" }}
                  >
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
                  variant={isSmaller ? null : "h5"}
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
    </Grid>
  );
}
