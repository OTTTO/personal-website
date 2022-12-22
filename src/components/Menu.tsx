import {
  AdminPanelSettingsOutlined,
  ArticleOutlined,
  CrisisAlertOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import {
  Box,
  Fab,
  Stack,
  Typography,
  Menu as MuiMenu,
  MenuItem,
} from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export function Menu({ backgroundColor }) {
  return (
    <Box
      sx={{
        backgroundColor: { backgroundColor },
        padding: "0rem 0rem 1rem 1rem",
      }}
    >
      <Stack direction="row">
        <Stack direction="row">
          <Fab
            variant="extended"
            href="/"
            sx={{ margin: "1rem 1rem 0rem 0rem" }}
          >
            <HomeOutlined sx={{ mr: 1 }} />
            <Typography variant="h6">HOME</Typography>
          </Fab>
          <Fab
            variant="extended"
            href="/resume"
            sx={{ margin: "1rem 1rem 0rem 0rem" }}
          >
            <ArticleOutlined sx={{ mr: 1 }} />
            <Typography variant="h6">RESUME</Typography>
          </Fab>
          <PopupState variant="popover" popupId="projects-popup">
            {(popupState) => (
              <>
                <Fab
                  variant="extended"
                  sx={{ margin: "1rem 1rem 0rem 0rem" }}
                  {...bindTrigger(popupState)}
                >
                  <CrisisAlertOutlined sx={{ mr: 1 }} />
                  <Typography variant="h6">PROJECTS</Typography>
                </Fab>
                <MuiMenu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => {
                      popupState.close();
                      window.location.replace("/trouble");
                    }}
                  >
                    <Typography variant="h6">TROUBLE</Typography>
                  </MenuItem>
                </MuiMenu>
              </>
            )}
          </PopupState>
        </Stack>
        <Stack
          direction="row"
          sx={{
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Fab
            variant="extended"
            href="/admin"
            sx={{ margin: "1rem 1rem 0rem 0rem" }}
          >
            <AdminPanelSettingsOutlined sx={{ mr: 1 }} />
            <Typography variant="h6">ADMIN</Typography>
          </Fab>
        </Stack>
      </Stack>
    </Box>
  );
}
