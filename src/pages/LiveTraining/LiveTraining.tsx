import { Divider, Grid, ThemeProvider, Typography } from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import { Title } from "components/TItle";
import React, { useContext } from "react";
import { ThemeContext } from "themes/context";

import projectsTheme from "themes/projectsTheme";
import { getMainTheme } from "utils/utils";

export function LiveTraining() {
  const { theme } = useContext(ThemeContext);
  return (
    <Grid border="double thick black">
      <Grid border=".25rem white solid">
        <ThemeProvider theme={projectsTheme}>
          <Menu backgroundColor="black"></Menu>
          <Grid
            container
            direction="column"
            margin="0 auto"
            paddingBottom="2rem"
            sx={{ background: getMainTheme(theme) }}
          >
            <Title title="LIVE TRAINING" />
            <Divider sx={{ backgroundColor: "white", borderBottomWidth: 4 }} />
            <Typography
              variant="h5"
              color="black"
              width="80%"
              margin="2rem auto 0 auto"
              padding="0rem 1rem 0 1rem"
              borderRadius="10px"
              sx={{ backgroundColor: "white" }}
            >
              <p>
                The purpose of Training with Dylan is to help you become job
                ready by seeing what it's like to work in a production codebase.
                During these training sessions, we will be covering a wide
                breadth of topics that are necessary to become a successful{" "}
                <b>
                  <u>full stack developer</u>
                </b>{" "}
                . You will join me on the job where I will show you how to
                become an effective developer in the real world.{" "}
              </p>
              <p>
                We will{" "}
                <b>
                  <u>work on the backend</u>
                </b>{" "}
                learning how to leverage an MVC framework where we will be
                extending APIs and writing out business logic,
                navigating/interacting with a database, as well as interfacing
                with AWS and other third party applications and libraries.{" "}
              </p>
              <p>
                We will also{" "}
                <b>
                  <u>work on the frontend</u>
                </b>{" "}
                making network calls to those backend apis and operating on the
                responses dynamically displaying information/document
                structure/styling.
              </p>
              <p>
                {" "}
                A necessary prerequisite to joining the live sessions is a{" "}
                <b>
                  <u>basic understanding of programming</u>
                </b>{" "}
                in any language of your choice. We will typically be working in
                Java, JavaScript, or Python so any of those would be a plus.
              </p>
              <p>
                {" "}
                If you are ready to learn..{" "}
                <a
                  className="training-email"
                  href="mailto:contact.dylanbeckwith@gamil.com"
                >
                  REACH OUT TODAY!
                </a>
              </p>
            </Typography>
          </Grid>
          <Footer />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
