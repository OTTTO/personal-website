import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { Fab, ThemeProvider, Typography, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { authenticationCheck, testAuthenticationCheck } from "utils/utils";

export function MenuLoginButton({ isLarger }) {
  const isAuthenticated = authenticationCheck();
  const isTestAuthenticated = testAuthenticationCheck();

  const buttonTheme = createTheme({
    palette: {
      info: {
        main: "#C6AB62",
      },
      error: {
        main: "#FF0000",
      },
    },
    typography: {
      h4: {
        fontSize: "1.5rem",
      },
    },
  });
  return (
    <ThemeProvider theme={buttonTheme}>
      <Fab
        variant="extended"
        {...{
          component: Link,
          to: !isAuthenticated && !isTestAuthenticated ? "/admin" : "/",
        }}
        sx={{ margin: "1rem 1rem 0rem 0rem", border: "solid 1px white" }}
        size={isLarger ? "large" : "medium"}
        color={!isAuthenticated && !isTestAuthenticated ? "info" : "warning"}
        onClick={() => {
          if (isAuthenticated || isTestAuthenticated) {
            localStorage.removeItem("token");
            localStorage.removeItem("testToken");
            localStorage.removeItem("edit");
            window.location.reload();
          }
        }}
      >
        <AdminPanelSettingsOutlined
          sx={{ mr: 1 }}
          fontSize={isLarger ? "large" : "medium"}
        />
        <Typography variant="h4">
          {!isAuthenticated && !isTestAuthenticated ? "LOGIN" : "LOGOUT"}
        </Typography>
      </Fab>
    </ThemeProvider>
  );
}
