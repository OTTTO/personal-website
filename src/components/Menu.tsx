import {
  AdminPanelSettingsOutlined,
  ArticleOutlined,
  CrisisAlertOutlined,
  HomeOutlined,
  ReceiptOutlined,
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
} from "@mui/material";
import useWindowDimensions from "hooks/useWindowDimensions";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import muiMenuTheme from "themes/muiMenuTheme";
import { authenticationCheck, testAuthenticationCheck } from "utils/utils";

const isAuthenticated = authenticationCheck();
const isTestAuthenticated = testAuthenticationCheck();

export function Menu({
  backgroundColor,
  borderSides = false,
  bottomBorder = true,
}) {
  const { width } = useWindowDimensions();
  const smallerSize = 785;
  const isLarger = width > smallerSize;

  return (
    <Grid
      sx={{
        backgroundColor,
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
                        onClick={() => {
                          popupState.close();
                          window.location.href = "/";
                        }}
                      >
                        <Typography variant="h6">HOME</Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ border: "black solid" }}
                        onClick={() => {
                          popupState.close();
                          window.location.href = "/resume";
                        }}
                      >
                        <Typography variant="h6">RESUME</Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ border: "black solid" }}
                        onClick={() => {
                          popupState.close();
                          window.location.href = "/projects";
                        }}
                      >
                        <Typography variant="h6">PROJECTS</Typography>
                      </MenuItem>
                      <MenuItem
                        sx={{ border: "black solid" }}
                        onClick={() => {
                          popupState.close();
                          window.location.href = "/blog";
                        }}
                      >
                        <Typography variant="h6">BLOG</Typography>
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
                href="/"
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
                href="/resume"
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
                href="/projects"
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
                href="/blog"
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
          <Fab
            variant="extended"
            sx={{ margin: "1rem 1rem 0rem 0rem" }}
            size={isLarger ? "large" : "medium"}
            color={
              !isAuthenticated && !isTestAuthenticated ? "info" : "warning"
            }
            onClick={() => {
              if (!isAuthenticated && !isTestAuthenticated) {
                window.location.href = "/admin";
              } else {
                localStorage.removeItem("token");
                localStorage.removeItem("testToken");
                window.location.href = "/";
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
        </Grid>
      </Grid>
    </Grid>
  );
}
