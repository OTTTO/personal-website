import { ThemeProvider } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { Footer } from "components/Footer";
import { Menu } from "components/Menu";
import { Title } from "components/TItle";
import { TitleDivider } from "components/TitleDivider";
import { useContext } from "react";
import { ThemeContext } from "themes/context";
import projectsTheme from "themes/projectsTheme";
import { getMainTheme } from "utils/utils";

export function Index() {
  const { theme } = useContext(ThemeContext);
  return (
    <Grid border="double thick black">
      <Grid border=".25rem white solid">
        <ThemeProvider theme={projectsTheme}>
          <Menu backgroundColor="black" />
          <Grid
            container
            direction="column"
            margin="0 auto"
            paddingBottom="2rem"
            sx={{ background: getMainTheme(theme) }}
          >
            <Title title="DATA STRUCTURES" />
            <TitleDivider />
            <Grid>
              <Typography
                sx={{
                  backgroundColor: "white",
                  margin: "2rem auto 0",
                  padding: ".5rem 1rem",
                  width: "80%",
                  border: "3px solid black",
                }}
              >
                <p>
                  If you have ever written any code, you have most likely
                  already worked with a number of data structures. Arrays and
                  strings are probably the two most commonly used data
                  structures in day to day development, followed by Hashmaps
                  (dictionaries in Python and objects in JS).
                </p>
                <p>
                  {" "}
                  Data structures hold data and can be manipulated in certain
                  ways to retrieve that data. The means by which we store and
                  get the data out of a data structure is what allows us to
                  leverage them throughout our code to write algorithms for
                  specific problems.{" "}
                </p>
                <p>
                  It is to be remembered that data structures are really just
                  abstract data types, meaning that they are interfaces that
                  conform to a certain contract. What matters is that we can
                  interact with them in a predictable manner regardless of the
                  underlying implementation.{" "}
                </p>
                <p>
                  There are a handful of less well known data structures that
                  can be useful in certain circumstances which you can learn
                  about below.
                </p>
                <h2 style={{ marginBottom: 0 }}>SEQUENTIAL</h2>
                <ul style={{ marginTop: 0 }}>
                  <li>Stack</li>
                  <li>Queue</li>
                  <li>Linked List</li>
                </ul>
                <h2 style={{ marginBottom: 0 }}>ASSOCIATIVE</h2>
                <ul style={{ marginTop: 0 }}>
                  <li>Hashmap</li>
                </ul>
                <h2 style={{ marginBottom: 0 }}>TREES</h2>
                <ul style={{ marginTop: 0 }}>
                  <li>Binary Search Tree (BST)</li>
                  <li>AVL (Self Balancing BST)</li>
                  <li>Heap</li>
                </ul>
                <h2 style={{ marginBottom: 0 }}>GRAPHS</h2>
                <ul style={{ marginTop: 0 }}>
                  <li>Breadth First Search</li>
                  <li>Depth First Search</li>
                </ul>
              </Typography>
            </Grid>
          </Grid>
          <Footer />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
