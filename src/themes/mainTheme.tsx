import { createTheme } from "@mui/material";

const mainTheme = createTheme();

mainTheme.typography.h1 = {
  fontSize: "2.2rem",
  fontWeight: "normal",
  "@media (min-width:735px)": {
    fontSize: "3.5rem",
  },
  "@media (min-width:1035px)": {
    fontSize: "5rem",
  },
};

mainTheme.typography.h3 = {
  fontSize: "1.5rem",
  fontWeight: "normal",
  "@media (min-width:735px)": {
    fontSize: "2.5rem",
  },
  "@media (min-width:1035px)": {
    fontSize: "3.5rem",
  },
};

mainTheme.typography.h4 = {
  fontSize: "0.8rem",
  fontWeight: "normal",
  "@media (min-width:735px)": {
    fontSize: "1rem",
  },
  "@media (min-width:1035px)": {
    fontSize: "1.5rem",
  },
};

mainTheme.typography.h6 = {
  fontSize: "0.5rem",
  "@media (min-width:735px)": {
    fontSize: "0.8rem",
  },
  "@media (min-width:1035px)": {
    fontSize: "1rem",
  },
};

export default mainTheme;
