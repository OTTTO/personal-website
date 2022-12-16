import { ThemeProvider, Typography } from "@mui/material";
import resumeTheme from "themes/resumeTheme";
import { Menu } from "components/Menu";
import { Box } from "@mui/system";

export function Home() {
  const intro = `I've been a professional software developer since 2016. I started learning
a couple of years before that by reading books and doing code challenges.
I pride myself on being self taught because to me the discipline of
software development is an iterative process of teaching one's self as you
build project after project. Being in consulting, it is not very often
that I face the same technology stack that I have worked with previously so
I am grateful that I have cultivated the ability to learn on the fly. I
enjoy helping others get started in their programming careers as well as
pairing with fellow developers both inside and outside of work. If you'd
like to contact me for any reason you can reach me at
contact.dylan.beckwith@gmail.com`;
  return (
    <ThemeProvider theme={resumeTheme}>
      <Menu backgroundColor="black" />
      <Box sx={{ backgroundColor: "black" }}>
        <Typography variant="h5" color="white">
          {intro}
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
