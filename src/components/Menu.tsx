import {
  AdminPanelSettingsOutlined,
  ArticleOutlined,
  CrisisAlertOutlined,
  HomeOutlined,
  ReceiptOutlined,
  BeenhereOutlined,
  PeopleOutlined,
} from "@mui/icons-material";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  Fab,
  Typography,
  Menu as MuiMenu,
  MenuItem,
  Grid,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import useWindowDimensions from "hooks/useWindowDimensions";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "themes/context";
import muiMenuTheme from "themes/muiMenuTheme";
import {
  authenticationCheck,
  testAuthenticationCheck,
  getHeaderTheme,
  getThemeEmoji,
  setThemeEmoji,
} from "utils/utils";

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

export function Menu({
  backgroundColor,
  borderSides = false,
  bottomBorder = true,
}) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const smallerSize = 1435;
  const isLarger = width > smallerSize;

  return (
    <Grid
      sx={{
        backgroundColor,
        background: getHeaderTheme(theme),
        padding: "0rem 0rem 1rem 1rem",
        borderBottom: bottomBorder
          ? backgroundColor === "black"
            ? "solid white .25rem"
            : "solid black .25rem"
          : null,
        borderLeft: borderSides
          ? backgroundColor === "black"
            ? "solid white .25rem"
            : "solid black .25rem"
          : null,
        borderRight: borderSides
          ? backgroundColor === "black"
            ? "solid white .25rem"
            : "solid black .25rem"
          : null,
        borderTop: borderSides
          ? backgroundColor === "black"
            ? "solid white .25rem"
            : "solid black .25rem"
          : null,
      }}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Grid
          container
          direction="row"
          display="inline-block"
          width="auto"
          spacing={0}
        >
          {!isLarger ? (
            <PopupState variant="popover" popupId="main-popup">
              {(popupState) => (
                <>
                  <Button
                    sx={{
                      margin: "1.2rem 1rem 0rem 0rem",
                      border: "white solid ",
                    }}
                    size="medium"
                    {...bindTrigger(popupState)}
                  >
                    <MenuIcon
                      sx={{ mr: 1 }}
                      fontSize={isLarger ? "large" : "small"}
                      style={{ color: "white" }}
                    />
                  </Button>
                  <ThemeProvider theme={muiMenuTheme}>
                    <MuiMenu
                      {...bindMenu(popupState)}
                      className=".MuiMenu-list"
                      sx={{
                        list: {
                          padding: 0,
                        },
                      }}
                    >
                      <MenuItem
                        sx={{ border: "black solid" }}
                        {...{ component: Link, to: "/" }}
                        onClick={() => {
                          popupState.close();
                        }}
                      >
                        <Typography variant="h6">HOME</Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ border: "black solid" }}
                        {...{ component: Link, to: "/resume" }}
                        onClick={() => {
                          popupState.close();
                        }}
                      >
                        <Typography variant="h6">RESUME</Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ border: "black solid" }}
                        {...{ component: Link, to: "/projects" }}
                        onClick={() => {
                          popupState.close();
                        }}
                      >
                        <Typography variant="h6">PROJECTS</Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ border: "black solid" }}
                        {...{ component: Link, to: "/recognition" }}
                        onClick={() => {
                          popupState.close();
                        }}
                      >
                        <Typography variant="h6">RECOGNITION</Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ border: "black solid" }}
                        {...{ component: Link, to: "/blog" }}
                        onClick={() => {
                          popupState.close();
                        }}
                      >
                        <Typography variant="h6">BLOG</Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ border: "black solid" }}
                        {...{ component: Link, to: "/live-training" }}
                        onClick={() => {
                          popupState.close();
                        }}
                      >
                        <Typography variant="h6">TRAINING</Typography>
                      </MenuItem>
                    </MuiMenu>
                  </ThemeProvider>
                </>
              )}
            </PopupState>
          ) : (
            <>
              <Fab
                variant="extended"
                {...{ component: Link, to: "/" }}
                sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
                size={isLarger ? "large" : "small"}
              >
                {isLarger ? (
                  <HomeOutlined
                    sx={{ mr: 1 }}
                    fontSize={isLarger ? "large" : "small"}
                  />
                ) : null}
                <Typography variant="h4">HOME</Typography>
              </Fab>
              <Fab
                variant="extended"
                {...{ component: Link, to: "/resume" }}
                sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
                size={isLarger ? "large" : "small"}
              >
                {isLarger ? (
                  <ArticleOutlined
                    sx={{ mr: 1 }}
                    fontSize={isLarger ? "large" : "small"}
                  />
                ) : null}
                <Typography variant="h4">RESUME</Typography>
              </Fab>
              <Fab
                variant="extended"
                {...{ component: Link, to: "/projects" }}
                sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
                size={isLarger ? "large" : "small"}
              >
                {isLarger ? (
                  <CrisisAlertOutlined
                    sx={{ mr: 1 }}
                    fontSize={isLarger ? "large" : "small"}
                  />
                ) : null}
                <Typography variant="h4">PROJECTS</Typography>
              </Fab>
              <Fab
                variant="extended"
                {...{ component: Link, to: "/recognition" }}
                sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
                size={isLarger ? "large" : "small"}
              >
                {isLarger ? (
                  <PeopleOutlined
                    sx={{ mr: 1 }}
                    fontSize={isLarger ? "large" : "small"}
                  />
                ) : null}
                <Typography variant="h4">RECOGNITION</Typography>
              </Fab>
              <Fab
                variant="extended"
                {...{ component: Link, to: "/blog" }}
                sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
                size={isLarger ? "large" : "small"}
              >
                {isLarger ? (
                  <ReceiptOutlined
                    sx={{ mr: 1 }}
                    fontSize={isLarger ? "large" : "small"}
                  />
                ) : null}
                <Typography variant="h4">BLOG</Typography>
              </Fab>
              <Fab
                variant="extended"
                {...{ component: Link, to: "/live-training" }}
                sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
                size={isLarger ? "large" : "small"}
              >
                {isLarger ? (
                  <BeenhereOutlined
                    sx={{ mr: 1 }}
                    fontSize={isLarger ? "large" : "small"}
                  />
                ) : null}
                <Typography variant="h4">TRAINING</Typography>
              </Fab>
            </>
          )}
        </Grid>
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "flex-end",
          }}
          display="inline-block"
          width="auto"
        >
          <Button
            size="small"
            sx={{
              fontSize: "2rem",
              padding: 0,
              height: "2rem",
              marginTop: "1rem",
            }}
            onClick={() => {
              setThemeEmoji(theme, setTheme);
            }}
          >
            {getThemeEmoji(theme)}
          </Button>
          <ThemeProvider theme={buttonTheme}>
            <Fab
              variant="extended"
              {...{
                component: Link,
                to: !isAuthenticated && !isTestAuthenticated ? "/admin" : "/",
              }}
              sx={{ margin: "1rem 1rem 0rem 0rem", border: "solid 1px white" }}
              size={isLarger ? "large" : "medium"}
              color={
                !isAuthenticated && !isTestAuthenticated ? "info" : "warning"
              }
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
        </Grid>
      </Grid>
    </Grid>
  );
}
