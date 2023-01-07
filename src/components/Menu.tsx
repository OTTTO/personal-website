import {
  AdminPanelSettingsOutlined,
  ArticleOutlined,
  CrisisAlertOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import {
  Fab,
  Typography,
  Menu as MuiMenu,
  MenuItem,
  Grid,
} from "@mui/material";
import useWindowDimensions from "hooks/useWindowDimensions";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { authenticationCheck } from "utils/utils";

const isAuthenticated = authenticationCheck();

export function Menu({
  backgroundColor,
  borderSides = false,
  bottomBorder = true,
}) {
  const { width } = useWindowDimensions();
  const smallerSize = 550;
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
            ? "solid white .5rem"
            : "solid black .5rem"
          : null,
        borderRight: borderSides
          ? backgroundColor === "black"
            ? "solid white .5rem"
            : "solid black .5rem"
          : null,
        borderTop: borderSides
          ? backgroundColor === "black"
            ? "solid white .5rem"
            : "solid black .5rem"
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
            <Typography variant="h6">HOME</Typography>
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
            <Typography variant="h6">RESUME</Typography>
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
            <Typography variant="h6">PROJECTS</Typography>
          </Fab>
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
          <PopupState variant="popover" popupId="admin-popup">
            {(popupState) => (
              <>
                <Fab
                  variant="extended"
                  sx={{ margin: "1rem 1rem 0rem 0rem" }}
                  size={isLarger ? "large" : "small"}
                  color={!isAuthenticated ? "info" : "warning"}
                  {...bindTrigger(popupState)}
                >
                  {isLarger ? (
                    <AdminPanelSettingsOutlined
                      sx={{ mr: 1 }}
                      fontSize={isLarger ? "large" : "small"}
                    />
                  ) : null}
                  <Typography variant="h6">ADMIN</Typography>
                </Fab>
                <MuiMenu {...bindMenu(popupState)}>
                  {!isAuthenticated ? (
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        window.location.replace("/admin");
                      }}
                    >
                      <Typography variant="h6">LOGIN</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        localStorage.removeItem("token");
                        localStorage.removeItem("testToken");
                        window.location.reload();
                      }}
                    >
                      <Typography variant="h6">LOGOUT</Typography>
                    </MenuItem>
                  )}
                </MuiMenu>
              </>
            )}
          </PopupState>
        </Grid>
      </Grid>
    </Grid>
  );
}
