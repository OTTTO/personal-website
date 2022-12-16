import { ThemeProvider, Typography } from "@mui/material";
import { Menu } from "components/Menu";
import { Box, Stack } from "@mui/system";
import mainTheme from "themes/mainTheme";
import angel from "images/angel.jpeg";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Footer } from "components/Footer";

export function Home() {
  const intro = `I've been a professional software developer since 2016. I started learning
    a couple of years before that by reading books and doing code challenges.
    Although I did eventually end up getting a bachelors in CS, 
    I pride myself on being self taught because to me the discipline of
    software development is an iterative process of teaching one's self as you
    build project after project. Being in consulting, it is not very often
    that I face the exact same technology stack that I have worked with previously so
    I am grateful that I have cultivated the ability to learn on the fly. I
    enjoy helping others get started in their programming careers as well as
    pairing with fellow developers both inside and outside of work. If you'd
    like to contact me for any reason you can reach me at contact.dylan.beckwith@gmail.com`;

  const websiteInfo = `This website was built from the ground up with NodeJS, GraphQL, Postgres, and React. 
    It currently serves as a personal resume and portfolio, 
    but it is also a CMS behind the scenes which I use to administer changes to the frontend`;
  const { height, width } = useWindowDimensions();

  const backgroundColor = "black";
  return (
    <ThemeProvider theme={mainTheme}>
      <Menu backgroundColor={backgroundColor}></Menu>
      <Box sx={{ backgroundColor: "black", height: "100vh" }}>
        {width < 675 && (
          <Box margin="0 auto" sx={{ padding: "2rem 0rem 0rem 2rem" }}>
            <img src={angel} alt="Angel's Landing" width="80%"></img>
          </Box>
        )}
        <Stack direction="row" sx={{ padding: "2rem 0rem 0rem 2rem" }}>
          {width > 675 && (
            <img
              src={angel}
              alt="Angel's Landing"
              width="40%"
              height="80%"
            ></img>
          )}
          <Stack
            direction="column"
            width={width > 675 ? "90%" : "55%"}
            padding="0rem 0rem 0rem 1rem"
          >
            <Typography variant="h5" color="white">
              {intro}
            </Typography>
            <br></br>
            <br></br>
            <Typography variant="h5" color="white">
              {websiteInfo}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Footer backgroundColor={backgroundColor}></Footer>
    </ThemeProvider>
  );
}
