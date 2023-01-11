import { createTheme } from "@mui/material";

const muiMenuTheme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        list: { padding: 0 },
      },
    },
  },
});

export default muiMenuTheme;
