import { createTheme } from "@mui/material";

const projectsTheme = createTheme();

projectsTheme.typography.h1 = {
  fontSize: "2.2rem",
  fontWeight: "normal",
  "@media (min-width:750px)": {
    fontSize: "3.5rem",
  },
  "@media (min-width:900px)": {
    fontSize: "5rem",
  },
};

projectsTheme.typography.h3 = {
  fontSize: "1.5rem",
  fontWeight: "normal",
  "@media (min-width:900px)": {
    fontSize: "3.5rem",
  },
};

projectsTheme.typography.h4 = {
  fontSize: "0.8rem",
  fontWeight: "normal",

  "@media (min-width:900px)": {
    fontSize: "1.5rem",
  },
};

projectsTheme.typography.h6 = {
  fontSize: "0.5rem",
  "@media (min-width:750px)": {
    fontSize: "0.8rem",
  },
  "@media (min-width:900px)": {
    fontSize: "1rem",
  },
};

export default projectsTheme;
