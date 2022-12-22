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

export function Menu({ backgroundColor }) {
  const { width } = useWindowDimensions();
  const smallerSize = 550;
  return (
    <Grid
      sx={{
        backgroundColor: { backgroundColor },
        padding: "0rem 0rem 1rem 1rem",
      }}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Grid direction="row" display="inline-block" width="auto" spacing={0}>
          <Fab
            variant="extended"
            href="/"
            sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
            size={width > smallerSize ? "large" : "small"}
          >
            <HomeOutlined
              sx={{ mr: 1 }}
              fontSize={width > smallerSize ? "large" : "small"}
            />
            <Typography variant="h6">HOME</Typography>
          </Fab>
          <Fab
            variant="extended"
            href="/resume"
            sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
            size={width > smallerSize ? "large" : "small"}
          >
            <ArticleOutlined
              sx={{ mr: 1 }}
              fontSize={width > smallerSize ? "large" : "small"}
            />
            <Typography variant="h6">RESUME</Typography>
          </Fab>
          <PopupState variant="popover" popupId="projects-popup">
            {(popupState) => (
              <>
                <Fab
                  variant="extended"
                  sx={{ margin: "1rem 0.5rem 0rem 0rem" }}
                  size={width > smallerSize ? "large" : "small"}
                  {...bindTrigger(popupState)}
                >
                  <CrisisAlertOutlined
                    sx={{ mr: 1 }}
                    fontSize={width > smallerSize ? "large" : "small"}
                  />
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
        </Grid>
        <Grid
          direction="row"
          sx={{
            justifyContent: "flex-end",
          }}
          display="inline-block"
          width="auto"
        >
          <Fab
            variant="extended"
            href="/admin"
            sx={{ margin: "1rem 1rem 0rem 0rem" }}
            size={width > smallerSize ? "large" : "small"}
          >
            <AdminPanelSettingsOutlined
              sx={{ mr: 1 }}
              fontSize={width > smallerSize ? "large" : "small"}
            />
            <Typography variant="h6">ADMIN</Typography>
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  );
}
