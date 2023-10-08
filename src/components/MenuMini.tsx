import {
  Button,
  ThemeProvider,
  Menu,
  Typography,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Link } from "react-router-dom";
import muiMenuTheme from "themes/muiMenuTheme";

export function MenuMini({ isLarger }) {
  return (
    <PopupState variant="popover" popupId="main-popup">
      {(popupState) => (
        <>
          <Button
            sx={{
              margin: "1.2rem 1rem 0rem 0rem",
              border: "white solid ",
              // borderRadius: "0",
              "&:hover": {
                boxShadow: "0 0 5px white, inset 0 0 5px white;",
              },
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
            <Menu
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
                {...{ component: Link, to: "/blog?page=1" }}
                onClick={() => {
                  popupState.close();
                }}
              >
                <Typography variant="h6">BLOG</Typography>
              </MenuItem>
              <MenuItem
                sx={{ border: "black solid" }}
                {...{ component: Link, to: "/mentorship" }}
                onClick={() => {
                  popupState.close();
                }}
              >
                <Typography variant="h6">MENTORSHIP</Typography>
              </MenuItem>
            </Menu>
          </ThemeProvider>
        </>
      )}
    </PopupState>
  );
}
